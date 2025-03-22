#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- VOIP Uygulaması Test Verileri
    -- Bu dosya, geliştirme ve test amaçlı örnek veriler içerir.

    -- Örnek kullanıcılar
    INSERT INTO users (username, email, password_hash, friend_code, display_name, profile_picture_url, bio, status)
    VALUES
        ('ahmet123', 'ahmet@example.com', '\$2a\$10\$XQxBtEwPBF1xPYpPDgIzB.O1CkHgbDGGzTKKZK.ZLBFLZa1xzXK2q', 'AHMT1234', 'Ahmet Yılmaz', 'https://randomuser.me/api/portraits/men/1.jpg', 'Yazılım geliştirici ve müzik tutkunu', 'online'),
        ('ayse456', 'ayse@example.com', '\$2a\$10\$XQxBtEwPBF1xPYpPDgIzB.O1CkHgbDGGzTKKZK.ZLBFLZa1xzXK2q', 'AYSE5678', 'Ayşe Demir', 'https://randomuser.me/api/portraits/women/1.jpg', 'Grafik tasarımcı ve fotoğrafçı', 'online'),
        ('mehmet789', 'mehmet@example.com', '\$2a\$10\$XQxBtEwPBF1xPYpPDgIzB.O1CkHgbDGGzTKKZK.ZLBFLZa1xzXK2q', 'MHMT9012', 'Mehmet Kaya', 'https://randomuser.me/api/portraits/men/2.jpg', 'Oyun geliştirici ve teknoloji meraklısı', 'offline'),
        ('zeynep321', 'zeynep@example.com', '\$2a\$10\$XQxBtEwPBF1xPYpPDgIzB.O1CkHgbDGGzTKKZK.ZLBFLZa1xzXK2q', 'ZEYP3456', 'Zeynep Şahin', 'https://randomuser.me/api/portraits/women/2.jpg', 'Kitap kurdu ve yazar', 'away'),
        ('can654', 'can@example.com', '\$2a\$10\$XQxBtEwPBF1xPYpPDgIzB.O1CkHgbDGGzTKKZK.ZLBFLZa1xzXK2q', 'CAN7890', 'Can Öztürk', 'https://randomuser.me/api/portraits/men/3.jpg', 'Spor tutkunu ve fitness eğitmeni', 'busy'),
        ('elif987', 'elif@example.com', '\$2a\$10\$XQxBtEwPBF1xPYpPDgIzB.O1CkHgbDGGzTKKZK.ZLBFLZa1xzXK2q', 'ELIF1234', 'Elif Yıldız', 'https://randomuser.me/api/portraits/women/3.jpg', 'Seyahat etmeyi seven bir gezgin', 'online'),
        ('emre123', 'emre@example.com', '\$2a\$10\$XQxBtEwPBF1xPYpPDgIzB.O1CkHgbDGGzTKKZK.ZLBFLZa1xzXK2q', 'EMRE5678', 'Emre Çelik', 'https://randomuser.me/api/portraits/men/4.jpg', 'Backend geliştirici ve açık kaynak katkıcısı', 'offline'),
        ('seda456', 'seda@example.com', '\$2a\$10\$XQxBtEwPBF1xPYpPDgIzB.O1CkHgbDGGzTKKZK.ZLBFLZa1xzXK2q', 'SEDA9012', 'Seda Arslan', 'https://randomuser.me/api/portraits/women/4.jpg', 'UX tasarımcısı ve sanatçı', 'online');

    -- Örnek arkadaşlık ilişkileri
    INSERT INTO friendships (user_id_1, user_id_2, status)
    VALUES
        (1, 2, 'accepted'),  -- Ahmet ve Ayşe arkadaş
        (1, 3, 'accepted'),  -- Ahmet ve Mehmet arkadaş
        (1, 4, 'pending'),   -- Ahmet, Zeynep'e istek gönderdi
        (2, 5, 'accepted'),  -- Ayşe ve Can arkadaş
        (2, 6, 'accepted'),  -- Ayşe ve Elif arkadaş
        (3, 6, 'pending'),   -- Mehmet, Elif'e istek gönderdi
        (4, 7, 'accepted'),  -- Zeynep ve Emre arkadaş
        (5, 8, 'accepted'),  -- Can ve Seda arkadaş
        (6, 7, 'blocked'),   -- Elif, Emre'yi engelledi
        (7, 8, 'pending');   -- Emre, Seda'ya istek gönderdi

    -- Örnek sohbet grupları
    INSERT INTO chat_groups (name, description, is_direct_message, socket_room_id)
    VALUES
        ('DM-1-2', NULL, TRUE, 'dm_1_2'),                                -- Ahmet ve Ayşe arasındaki özel sohbet
        ('DM-1-3', NULL, TRUE, 'dm_1_3'),                                -- Ahmet ve Mehmet arasındaki özel sohbet
        ('DM-2-5', NULL, TRUE, 'dm_2_5'),                                -- Ayşe ve Can arasındaki özel sohbet
        ('Yazılım Ekibi', 'Yazılım projesi hakkında konuşmalar', FALSE, 'group_yazilim'),  -- Grup sohbeti
        ('Arkadaşlar', 'Genel sohbet grubu', FALSE, 'group_arkadaslar'),           -- Grup sohbeti
        ('DM-4-7', NULL, TRUE, 'dm_4_7'),                                -- Zeynep ve Emre arasındaki özel sohbet
        ('DM-5-8', NULL, TRUE, 'dm_5_8'),                                -- Can ve Seda arasındaki özel sohbet
        ('Oyun Grubu', 'Oyun oynamak için buluşma grubu', FALSE, 'group_oyun');  -- Grup sohbeti

    -- Örnek grup üyelikleri
    INSERT INTO group_members (group_id, user_id)
    VALUES
        (1, 1),  -- Ahmet, DM-1-2'de
        (1, 2),  -- Ayşe, DM-1-2'de
        (2, 1),  -- Ahmet, DM-1-3'de
        (2, 3),  -- Mehmet, DM-1-3'de
        (3, 2),  -- Ayşe, DM-2-5'de
        (3, 5),  -- Can, DM-2-5'de
        (4, 1),  -- Ahmet, Yazılım Ekibi'nde
        (4, 2),  -- Ayşe, Yazılım Ekibi'nde
        (4, 3),  -- Mehmet, Yazılım Ekibi'nde
        (4, 7),  -- Emre, Yazılım Ekibi'nde
        (5, 1),  -- Ahmet, Arkadaşlar'da
        (5, 2),  -- Ayşe, Arkadaşlar'da
        (5, 4),  -- Zeynep, Arkadaşlar'da
        (5, 6),  -- Elif, Arkadaşlar'da
        (6, 4),  -- Zeynep, DM-4-7'de
        (6, 7),  -- Emre, DM-4-7'de
        (7, 5),  -- Can, DM-5-8'de
        (7, 8),  -- Seda, DM-5-8'de
        (8, 3),  -- Mehmet, Oyun Grubu'nda
        (8, 5),  -- Can, Oyun Grubu'nda
        (8, 7),  -- Emre, Oyun Grubu'nda
        (8, 8);  -- Seda, Oyun Grubu'nda

    -- Örnek mesajlar (JSON formatında)
    INSERT INTO messages (group_id, sender_id, content, message_type, is_delivered, sent_at, delivered_at)
    VALUES
        -- Ahmet ve Ayşe arasındaki konuşma
        (1, 1, '{"text": "Merhaba Ayşe, nasılsın?"}', 'text', TRUE, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days' + INTERVAL '1 minute'),
        (1, 2, '{"text": "İyiyim Ahmet, teşekkür ederim. Sen nasılsın?"}', 'text', TRUE, NOW() - INTERVAL '2 days' + INTERVAL '5 minutes', NOW() - INTERVAL '2 days' + INTERVAL '6 minutes'),
        (1, 1, '{"text": "Ben de iyiyim. Bugün akşam müsait misin?"}', 'text', TRUE, NOW() - INTERVAL '2 days' + INTERVAL '10 minutes', NOW() - INTERVAL '2 days' + INTERVAL '11 minutes'),
        (1, 2, '{"text": "Evet, müsaitim. Ne yapmayı düşünüyorsun?"}', 'text', TRUE, NOW() - INTERVAL '2 days' + INTERVAL '15 minutes', NOW() - INTERVAL '2 days' + INTERVAL '16 minutes'),
        (1, 1, '{"text": "Yeni açılan kafeye gidebiliriz."}', 'text', TRUE, NOW() - INTERVAL '2 days' + INTERVAL '20 minutes', NOW() - INTERVAL '2 days' + INTERVAL '21 minutes'),
        
        -- Ahmet ve Mehmet arasındaki konuşma
        (2, 1, '{"text": "Mehmet, proje için toplantı ne zaman?"}', 'text', TRUE, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day' + INTERVAL '1 minute'),
        (2, 3, '{"text": "Yarın saat 14:00\'te."}', 'text', TRUE, NOW() - INTERVAL '1 day' + INTERVAL '5 minutes', NOW() - INTERVAL '1 day' + INTERVAL '6 minutes'),
        (2, 1, '{"text": "Teşekkürler, orada olacağım."}', 'text', TRUE, NOW() - INTERVAL '1 day' + INTERVAL '10 minutes', NOW() - INTERVAL '1 day' + INTERVAL '11 minutes'),
        
        -- Yazılım Ekibi grup sohbeti
        (4, 1, '{"text": "Herkese merhaba, yeni sprint planını paylaşıyorum."}', 'text', TRUE, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days' + INTERVAL '1 minute'),
        (4, 3, '{"text": "Teşekkürler Ahmet, inceliyorum."}', 'text', TRUE, NOW() - INTERVAL '3 days' + INTERVAL '15 minutes', NOW() - INTERVAL '3 days' + INTERVAL '16 minutes'),
        (4, 2, '{"text": "Ben de bakıyorum, birkaç sorum olacak."}', 'text', TRUE, NOW() - INTERVAL '3 days' + INTERVAL '30 minutes', NOW() - INTERVAL '3 days' + INTERVAL '31 minutes'),
        (4, 7, '{"text": "Backend tarafındaki görevleri ben alabilirim."}', 'text', TRUE, NOW() - INTERVAL '3 days' + INTERVAL '45 minutes', NOW() - INTERVAL '3 days' + INTERVAL '46 minutes'),
        (4, 1, '{"text": "Harika Emre, görevleri atıyorum."}', 'text', TRUE, NOW() - INTERVAL '3 days' + INTERVAL '1 hour', NOW() - INTERVAL '3 days' + INTERVAL '1 hour' + INTERVAL '1 minute'),
        
        -- Arkadaşlar grup sohbeti
        (5, 2, '{"text": "Bu hafta sonu piknik yapalım mı?"}', 'text', TRUE, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days' + INTERVAL '1 minute'),
        (5, 4, '{"text": "Harika fikir! Ben varım."}', 'text', TRUE, NOW() - INTERVAL '5 days' + INTERVAL '10 minutes', NOW() - INTERVAL '5 days' + INTERVAL '11 minutes'),
        (5, 6, '{"text": "Ben de gelebilirim. Nerede yapmayı düşünüyorsunuz?"}', 'text', TRUE, NOW() - INTERVAL '5 days' + INTERVAL '20 minutes', NOW() - INTERVAL '5 days' + INTERVAL '21 minutes'),
        (5, 2, '{"text": "Belgrad Ormanı\'na gidebiliriz."}', 'text', TRUE, NOW() - INTERVAL '5 days' + INTERVAL '30 minutes', NOW() - INTERVAL '5 days' + INTERVAL '31 minutes'),
        (5, 1, '{"text": "Benim için de uygun. Saat kaçta buluşuyoruz?"}', 'text', TRUE, NOW() - INTERVAL '5 days' + INTERVAL '40 minutes', NOW() - INTERVAL '5 days' + INTERVAL '41 minutes'),
        (5, 2, '{"text": "Sabah 10:00\'da otopark girişinde buluşalım."}', 'text', TRUE, NOW() - INTERVAL '5 days' + INTERVAL '50 minutes', NOW() - INTERVAL '5 days' + INTERVAL '51 minutes'),
        
        -- Zeynep ve Emre arasındaki konuşma
        (6, 4, '{"text": "Emre, kitabı bitirdin mi?"}', 'text', TRUE, NOW() - INTERVAL '12 hours', NOW() - INTERVAL '12 hours' + INTERVAL '1 minute'),
        (6, 7, '{"text": "Evet, dün bitirdim. Çok etkileyiciydi."}', 'text', TRUE, NOW() - INTERVAL '12 hours' + INTERVAL '5 minutes', NOW() - INTERVAL '12 hours' + INTERVAL '6 minutes'),
        (6, 4, '{"text": "Harika! Ben de yeni başladım. Spoiler vermeden fikrini merak ediyorum."}', 'text', TRUE, NOW() - INTERVAL '12 hours' + INTERVAL '10 minutes', NOW() - INTERVAL '12 hours' + INTERVAL '11 minutes'),
        (6, 7, '{"text": "Kesinlikle tavsiye ederim. Son bölüm çok sürprizli."}', 'text', TRUE, NOW() - INTERVAL '12 hours' + INTERVAL '15 minutes', NOW() - INTERVAL '12 hours' + INTERVAL '16 minutes'),
        
        -- Can ve Seda arasındaki konuşma
        (7, 5, '{"text": "Seda, yarınki toplantı için sunum hazır mı?"}', 'text', TRUE, NOW() - INTERVAL '6 hours', NOW() - INTERVAL '6 hours' + INTERVAL '1 minute'),
        (7, 8, '{"text": "Evet, az önce bitirdim. Sana mail attım."}', 'text', TRUE, NOW() - INTERVAL '6 hours' + INTERVAL '5 minutes', NOW() - INTERVAL '6 hours' + INTERVAL '6 minutes'),
        (7, 5, '{"text": "Harika, hemen bakıyorum. Teşekkürler!"}', 'text', TRUE, NOW() - INTERVAL '6 hours' + INTERVAL '10 minutes', NOW() - INTERVAL '6 hours' + INTERVAL '11 minutes'),
        
        -- Oyun Grubu sohbeti
        (8, 3, '{"text": "Bu akşam saat 21:00\'de online oyun oynayalım mı?"}', 'text', TRUE, NOW() - INTERVAL '4 hours', NOW() - INTERVAL '4 hours' + INTERVAL '1 minute'),
        (8, 5, '{"text": "Ben varım!"}', 'text', TRUE, NOW() - INTERVAL '4 hours' + INTERVAL '5 minutes', NOW() - INTERVAL '4 hours' + INTERVAL '6 minutes'),
        (8, 7, '{"text": "Ben de katılabilirim."}', 'text', TRUE, NOW() - INTERVAL '4 hours' + INTERVAL '10 minutes', NOW() - INTERVAL '4 hours' + INTERVAL '11 minutes'),
        (8, 8, '{"text": "Maalesef bu akşam müsait değilim. Yarın olabilir mi?"}', 'text', TRUE, NOW() - INTERVAL '4 hours' + INTERVAL '15 minutes', NOW() - INTERVAL '4 hours' + INTERVAL '16 minutes'),
        (8, 3, '{"text": "Yarın da oynayabiliriz, sorun değil."}', 'text', TRUE, NOW() - INTERVAL '4 hours' + INTERVAL '20 minutes', NOW() - INTERVAL '4 hours' + INTERVAL '21 minutes'),
        
        -- Farklı mesaj tipleri örnekleri
        (1, 1, '{"text": "Sana bir fotoğraf gönderiyorum", "image_url": "https://example.com/photos/1.jpg"}', 'image', TRUE, NOW() - INTERVAL '1 day' + INTERVAL '30 minutes', NOW() - INTERVAL '1 day' + INTERVAL '31 minutes'),
        (1, 2, '{"text": "Çok güzel görünüyor!"}', 'text', TRUE, NOW() - INTERVAL '1 day' + INTERVAL '35 minutes', NOW() - INTERVAL '1 day' + INTERVAL '36 minutes'),
        (4, 7, '{"text": "Toplantı kaydını paylaşıyorum", "file_url": "https://example.com/files/meeting.mp3"}', 'audio', TRUE, NOW() - INTERVAL '2 days' + INTERVAL '2 hours', NOW() - INTERVAL '2 days' + INTERVAL '2 hours' + INTERVAL '1 minute'),
        (5, 2, '{"text": "Piknik yeri haritası", "location": {"latitude": 41.1, "longitude": 29.0}}', 'location', TRUE, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days' + INTERVAL '1 minute'),
        (8, 3, '{"text": "Oyun tanıtım videosu", "video_url": "https://example.com/videos/game.mp4"}', 'video', TRUE, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days' + INTERVAL '1 minute');

    -- Örnek mesaj okunma durumları
    INSERT INTO message_read_status (message_id, user_id, is_read, read_at)
    VALUES
        -- Ahmet ve Ayşe konuşması
        (1, 2, TRUE, NOW() - INTERVAL '2 days' + INTERVAL '2 minutes'),
        (2, 1, TRUE, NOW() - INTERVAL '2 days' + INTERVAL '6 minutes'),
        (3, 2, TRUE, NOW() - INTERVAL '2 days' + INTERVAL '11 minutes'),
        (4, 1, TRUE, NOW() - INTERVAL '2 days' + INTERVAL '16 minutes'),
        (5, 2, TRUE, NOW() - INTERVAL '2 days' + INTERVAL '21 minutes'),
        
        -- Ahmet ve Mehmet konuşması
        (6, 3, TRUE, NOW() - INTERVAL '1 day' + INTERVAL '2 minutes'),
        (7, 1, TRUE, NOW() - INTERVAL '1 day' + INTERVAL '6 minutes'),
        (8, 3, TRUE, NOW() - INTERVAL '1 day' + INTERVAL '11 minutes'),
        
        -- Yazılım Ekibi grup mesajları
        (9, 2, TRUE, NOW() - INTERVAL '3 days' + INTERVAL '5 minutes'),
        (9, 3, TRUE, NOW() - INTERVAL '3 days' + INTERVAL '10 minutes'),
        (9, 7, TRUE, NOW() - INTERVAL '3 days' + INTERVAL '12 minutes'),
        (10, 1, TRUE, NOW() - INTERVAL '3 days' + INTERVAL '16 minutes'),
        (10, 2, TRUE, NOW() - INTERVAL '3 days' + INTERVAL '17 minutes'),
        (10, 7, TRUE, NOW() - INTERVAL '3 days' + INTERVAL '20 minutes'),
        (11, 1, TRUE, NOW() - INTERVAL '3 days' + INTERVAL '31 minutes'),
        (11, 3, TRUE, NOW() - INTERVAL '3 days' + INTERVAL '32 minutes'),
        (11, 7, TRUE, NOW() - INTERVAL '3 days' + INTERVAL '35 minutes'),
        (12, 1, TRUE, NOW() - INTERVAL '3 days' + INTERVAL '46 minutes'),
        (12, 2, TRUE, NOW() - INTERVAL '3 days' + INTERVAL '47 minutes'),
        (12, 3, TRUE, NOW() - INTERVAL '3 days' + INTERVAL '48 minutes'),
        (13, 2, TRUE, NOW() - INTERVAL '3 days' + INTERVAL '1 hour' + INTERVAL '5 minutes'),
        (13, 3, TRUE, NOW() - INTERVAL '3 days' + INTERVAL '1 hour' + INTERVAL '10 minutes'),
        (13, 7, TRUE, NOW() - INTERVAL '3 days' + INTERVAL '1 hour' + INTERVAL '15 minutes'),
        
        -- Arkadaşlar grup mesajları (bazıları okunmamış)
        (14, 1, TRUE, NOW() - INTERVAL '5 days' + INTERVAL '5 minutes'),
        (14, 4, TRUE, NOW() - INTERVAL '5 days' + INTERVAL '7 minutes'),
        (14, 6, TRUE, NOW() - INTERVAL '5 days' + INTERVAL '8 minutes'),
        (15, 1, TRUE, NOW() - INTERVAL '5 days' + INTERVAL '12 minutes'),
        (15, 2, TRUE, NOW() - INTERVAL '5 days' + INTERVAL '13 minutes'),
        (15, 6, TRUE, NOW() - INTERVAL '5 days' + INTERVAL '15 minutes'),
        (16, 1, TRUE, NOW() - INTERVAL '5 days' + INTERVAL '22 minutes'),
        (16, 2, TRUE, NOW() - INTERVAL '5 days' + INTERVAL '23 minutes'),
        (16, 4, TRUE, NOW() - INTERVAL '5 days' + INTERVAL '25 minutes'),
        (17, 1, TRUE, NOW() - INTERVAL '5 days' + INTERVAL '32 minutes'),
        (17, 4, TRUE, NOW() - INTERVAL '5 days' + INTERVAL '33 minutes'),
        (17, 6, TRUE, NOW() - INTERVAL '5 days' + INTERVAL '35 minutes'),
        (18, 2, TRUE, NOW() - INTERVAL '5 days' + INTERVAL '42 minutes'),
        (18, 4, TRUE, NOW() - INTERVAL '5 days' + INTERVAL '43 minutes'),
        (18, 6, FALSE, NULL),
        (19, 1, TRUE, NOW() - INTERVAL '5 days' + INTERVAL '52 minutes'),
        (19, 4, TRUE, NOW() - INTERVAL '5 days' + INTERVAL '53 minutes'),
        (19, 6, FALSE, NULL),
        
        -- Zeynep ve Emre konuşması
        (20, 7, TRUE, NOW() - INTERVAL '12 hours' + INTERVAL '2 minutes'),
        (21, 4, TRUE, NOW() - INTERVAL '12 hours' + INTERVAL '6 minutes'),
        (22, 7, TRUE, NOW() - INTERVAL '12 hours' + INTERVAL '11 minutes'),
        (23, 4, TRUE, NOW() - INTERVAL '12 hours' + INTERVAL '16 minutes'),
        
        -- Can ve Seda konuşması
        (24, 8, TRUE, NOW() - INTERVAL '6 hours' + INTERVAL '2 minutes'),
        (25, 5, TRUE, NOW() - INTERVAL '6 hours' + INTERVAL '6 minutes'),
        (26, 8, TRUE, NOW() - INTERVAL '6 hours' + INTERVAL '11 minutes'),
        
        -- Oyun Grubu mesajları (bazıları okunmamış)
        (27, 5, TRUE, NOW() - INTERVAL '4 hours' + INTERVAL '2 minutes'),
        (27, 7, TRUE, NOW() - INTERVAL '4 hours' + INTERVAL '3 minutes'),
        (27, 8, TRUE, NOW() - INTERVAL '4 hours' + INTERVAL '4 minutes'),
        (28, 3, TRUE, NOW() - INTERVAL '4 hours' + INTERVAL '6 minutes'),
        (28, 7, TRUE, NOW() - INTERVAL '4 hours' + INTERVAL '7 minutes'),
        (28, 8, TRUE, NOW() - INTERVAL '4 hours' + INTERVAL '8 minutes'),
        (29, 3, TRUE, NOW() - INTERVAL '4 hours' + INTERVAL '11 minutes'),
        (29, 5, TRUE, NOW() - INTERVAL '4 hours' + INTERVAL '12 minutes'),
        (29, 8, TRUE, NOW() - INTERVAL '4 hours' + INTERVAL '13 minutes'),
        (30, 3, TRUE, NOW() - INTERVAL '4 hours' + INTERVAL '16 minutes'),
        (30, 5, TRUE, NOW() - INTERVAL '4 hours' + INTERVAL '17 minutes'),
        (30, 7, TRUE, NOW() - INTERVAL '4 hours' + INTERVAL '18 minutes'),
        (31, 5, TRUE, NOW() - INTERVAL '4 hours' + INTERVAL '21 minutes'),
        (31, 7, TRUE, NOW() - INTERVAL '4 hours' + INTERVAL '22 minutes'),
        (31, 8, FALSE, NULL);

    -- Örnek socket bağlantıları
    INSERT INTO user_socket_connections (user_id, socket_id, device_info, ip_address, is_active)
    VALUES
        (1, 'socket_ahmet_123', '{"device": "Chrome 90", "os": "Windows 10", "type": "desktop"}', '192.168.1.101', TRUE),
        (2, 'socket_ayse_456', '{"device": "Safari 14", "os": "macOS", "type": "desktop"}', '192.168.1.102', TRUE),
        (6, 'socket_elif_789', '{"device": "Chrome 91", "os": "Android 11", "type": "mobile"}', '192.168.1.103', TRUE),
        (8, 'socket_seda_012', '{"device": "Firefox 89", "os": "Ubuntu 20.04", "type": "desktop"}', '192.168.1.104', TRUE);
EOSQL 