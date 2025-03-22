#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- VOIP Uygulaması Veritabanı Şeması

    -- Kullanıcılar Tablosu
    CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        friend_code VARCHAR(20) NOT NULL UNIQUE,  -- Benzersiz arkadaş ekleme kodu
        display_name VARCHAR(100),
        profile_picture_url VARCHAR(255),
        bio VARCHAR(255),
        status VARCHAR(20) DEFAULT 'offline',     -- online, offline, away, busy vb.
        socket_id VARCHAR(100),                   -- Socket.IO bağlantı ID'si
        last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Arkadaşlık İlişkileri Tablosu
    CREATE TABLE friendships (
        friendship_id SERIAL PRIMARY KEY,
        user_id_1 INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        user_id_2 INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        status VARCHAR(20) NOT NULL DEFAULT 'pending',  -- pending, accepted, blocked
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        CONSTRAINT unique_friendship UNIQUE(user_id_1, user_id_2),
        CONSTRAINT different_users CHECK (user_id_1 <> user_id_2)
    );

    -- Sohbet Grupları Tablosu (İlerideki grup mesajlaşması için)
    CREATE TABLE chat_groups (
        group_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        is_direct_message BOOLEAN DEFAULT FALSE,  -- İkili sohbet mi grup sohbeti mi?
        socket_room_id VARCHAR(100),              -- Socket.IO oda ID'si
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Grup Üyelikleri Tablosu
    CREATE TABLE group_members (
        group_member_id SERIAL PRIMARY KEY,
        group_id INTEGER NOT NULL REFERENCES chat_groups(group_id) ON DELETE CASCADE,
        user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        CONSTRAINT unique_group_member UNIQUE(group_id, user_id)
    );

    -- Mesajlar Tablosu (JSON formatında içerik)
    CREATE TABLE messages (
        message_id SERIAL PRIMARY KEY,
        group_id INTEGER NOT NULL REFERENCES chat_groups(group_id) ON DELETE CASCADE,
        sender_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        content JSONB NOT NULL,             -- JSON formatında mesaj içeriği
        message_type VARCHAR(50) NOT NULL DEFAULT 'text',  -- text, image, audio, video, file, system
        is_delivered BOOLEAN DEFAULT FALSE, -- Mesaj karşı tarafa iletildi mi?
        sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        delivered_at TIMESTAMP WITH TIME ZONE,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        metadata JSONB                      -- Ek bilgiler (dosya boyutu, süre, vb.)
    );

    -- Mesaj Okunma Durumu Tablosu
    CREATE TABLE message_read_status (
        status_id SERIAL PRIMARY KEY,
        message_id INTEGER NOT NULL REFERENCES messages(message_id) ON DELETE CASCADE,
        user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        is_read BOOLEAN DEFAULT FALSE,
        read_at TIMESTAMP WITH TIME ZONE,
        CONSTRAINT unique_message_read UNIQUE(message_id, user_id)
    );

    -- Kullanıcı Socket Bağlantıları Tablosu
    CREATE TABLE user_socket_connections (
        connection_id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        socket_id VARCHAR(100) NOT NULL,
        device_info JSONB,                  -- Cihaz bilgileri
        ip_address VARCHAR(45),
        connected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        is_active BOOLEAN DEFAULT TRUE,
        CONSTRAINT unique_socket_id UNIQUE(socket_id)
    );

    -- Arkadaş kodu oluşturma fonksiyonu
    CREATE OR REPLACE FUNCTION generate_friend_code() RETURNS VARCHAR(20) AS \$\$
    DECLARE
        new_code VARCHAR(20);
        code_exists BOOLEAN;
    BEGIN
        LOOP
            -- Rastgele 8 karakterlik alfanumerik kod oluştur
            new_code := UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
            
            -- Kodun benzersiz olup olmadığını kontrol et
            SELECT EXISTS(SELECT 1 FROM users WHERE friend_code = new_code) INTO code_exists;
            
            -- Benzersizse döngüden çık
            EXIT WHEN NOT code_exists;
        END LOOP;
        
        RETURN new_code;
    END;
    \$\$ LANGUAGE plpgsql;

    -- Kullanıcı oluşturulduğunda otomatik arkadaş kodu ataması için trigger
    CREATE OR REPLACE FUNCTION set_friend_code() RETURNS TRIGGER AS \$\$
    BEGIN
        IF NEW.friend_code IS NULL THEN
            NEW.friend_code := generate_friend_code();
        END IF;
        RETURN NEW;
    END;
    \$\$ LANGUAGE plpgsql;

    CREATE TRIGGER trigger_set_friend_code
    BEFORE INSERT ON users
    FOR EACH ROW
    EXECUTE FUNCTION set_friend_code();

    -- İkili sohbet oluşturma fonksiyonu
    CREATE OR REPLACE FUNCTION create_direct_message_group(user1_id INTEGER, user2_id INTEGER) RETURNS INTEGER AS \$\$
    DECLARE
        new_group_id INTEGER;
        room_id VARCHAR(100);
    BEGIN
        -- Socket.IO oda ID'si oluştur
        room_id := CONCAT('dm_', LEAST(user1_id, user2_id), '_', GREATEST(user1_id, user2_id));
        
        -- İkili sohbet grubu oluştur
        INSERT INTO chat_groups (name, is_direct_message, socket_room_id)
        VALUES (CONCAT('DM-', user1_id, '-', user2_id), TRUE, room_id)
        RETURNING group_id INTO new_group_id;
        
        -- Her iki kullanıcıyı da gruba ekle
        INSERT INTO group_members (group_id, user_id)
        VALUES (new_group_id, user1_id), (new_group_id, user2_id);
        
        RETURN new_group_id;
    END;
    \$\$ LANGUAGE plpgsql;

    -- Grup sohbeti oluşturma fonksiyonu
    CREATE OR REPLACE FUNCTION create_group_chat(group_name VARCHAR, creator_user_id INTEGER) RETURNS INTEGER AS \$\$
    DECLARE
        new_group_id INTEGER;
        room_id VARCHAR(100);
    BEGIN
        -- Socket.IO oda ID'si oluştur
        room_id := CONCAT('group_', MD5(RANDOM()::TEXT));
        
        -- Grup sohbeti oluştur
        INSERT INTO chat_groups (name, is_direct_message, socket_room_id)
        VALUES (group_name, FALSE, room_id)
        RETURNING group_id INTO new_group_id;
        
        -- Oluşturan kullanıcıyı gruba ekle
        INSERT INTO group_members (group_id, user_id)
        VALUES (new_group_id, creator_user_id);
        
        RETURN new_group_id;
    END;
    \$\$ LANGUAGE plpgsql;

    -- Socket.IO bağlantısı güncelleme fonksiyonu
    CREATE OR REPLACE FUNCTION update_user_socket(user_id_param INTEGER, socket_id_param VARCHAR) RETURNS VOID AS \$\$
    BEGIN
        -- Kullanıcının socket_id'sini güncelle
        UPDATE users SET socket_id = socket_id_param, status = 'online', last_seen = NOW() WHERE user_id = user_id_param;
        
        -- Socket bağlantı kaydı ekle
        INSERT INTO user_socket_connections (user_id, socket_id)
        VALUES (user_id_param, socket_id_param)
        ON CONFLICT (socket_id) 
        DO UPDATE SET last_activity = NOW(), is_active = TRUE;
    END;
    \$\$ LANGUAGE plpgsql;

    -- Socket.IO bağlantısı sonlandırma fonksiyonu
    CREATE OR REPLACE FUNCTION disconnect_user_socket(socket_id_param VARCHAR) RETURNS INTEGER AS \$\$
    DECLARE
        user_id_var INTEGER;
    BEGIN
        -- Kullanıcı ID'sini al
        SELECT user_id INTO user_id_var FROM users WHERE socket_id = socket_id_param;
        
        -- Kullanıcının socket_id'sini temizle
        UPDATE users SET socket_id = NULL, status = 'offline', last_seen = NOW() WHERE socket_id = socket_id_param;
        
        -- Socket bağlantı kaydını güncelle
        UPDATE user_socket_connections SET is_active = FALSE, last_activity = NOW() WHERE socket_id = socket_id_param;
        
        RETURN user_id_var;
    END;
    \$\$ LANGUAGE plpgsql;

    -- İndeksler
    CREATE INDEX idx_messages_group_id ON messages(group_id);
    CREATE INDEX idx_messages_sender_id ON messages(sender_id);
    CREATE INDEX idx_messages_sent_at ON messages(sent_at);
    CREATE INDEX idx_messages_content_gin ON messages USING GIN (content);
    CREATE INDEX idx_group_members_group_id ON group_members(group_id);
    CREATE INDEX idx_group_members_user_id ON group_members(user_id);
    CREATE INDEX idx_friendships_user_id_1 ON friendships(user_id_1);
    CREATE INDEX idx_friendships_user_id_2 ON friendships(user_id_2);
    CREATE INDEX idx_friendships_status ON friendships(status);
    CREATE INDEX idx_users_socket_id ON users(socket_id);
    CREATE INDEX idx_user_socket_connections_user_id ON user_socket_connections(user_id);
    CREATE INDEX idx_user_socket_connections_socket_id ON user_socket_connections(socket_id);
EOSQL 