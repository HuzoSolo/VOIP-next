# VOIP Uygulaması Veritabanı Docker Kurulumu

Bu repo, VOIP uygulaması için PostgreSQL ve Redis veritabanlarını Docker ile çalıştırmak için gerekli dosyaları içerir. Socket.IO ile gerçek zamanlı iletişim için optimize edilmiş bir veritabanı yapısı sunmaktadır.

## İçerik

- PostgreSQL veritabanı (mesajlaşma, kullanıcı ve arkadaşlık verileri için)
- Redis (oturum yönetimi için)
- pgAdmin (veritabanı yönetimi için web arayüzü)

## Gereksinimler

- Docker
- Docker Compose

## Kurulum

1. Repo'yu klonlayın:

```bash
git clone <repo-url>
cd <repo-directory>
```

2. Docker Compose ile servisleri başlatın:

```bash
docker-compose up -d
```

Bu komut, PostgreSQL, Redis ve pgAdmin servislerini başlatacaktır.

## Servis Bilgileri

### PostgreSQL

- **Port**: 5432
- **Kullanıcı adı**: voipuser
- **Şifre**: voippassword
- **Veritabanı adı**: voipdb

### Redis

- **Port**: 6379
- **Şifre**: voipredispassword

### pgAdmin

- **Port**: 5050
- **URL**: http://localhost:5050
- **E-posta**: admin@example.com
- **Şifre**: admin

## Veritabanı Şeması

Veritabanı şeması, Socket.IO ile gerçek zamanlı mesajlaşma için optimize edilmiştir:

- **users**: Kullanıcı bilgileri ve Socket.IO bağlantı ID'leri
- **friendships**: Arkadaşlık ilişkileri
- **chat_groups**: Sohbet grupları ve Socket.IO oda ID'leri
- **group_members**: Grup üyelikleri
- **messages**: JSON formatında mesaj içerikleri
- **message_read_status**: Mesaj okunma durumları
- **user_socket_connections**: Kullanıcı Socket.IO bağlantı bilgileri

## Örnek Veriler

Veritabanı, test ve geliştirme için örnek verilerle birlikte gelir. Bu veriler:

- 8 örnek kullanıcı
- Çeşitli arkadaşlık ilişkileri
- Hem ikili hem de grup sohbetleri
- JSON formatında mesajlar (metin, resim, ses, video, konum)
- Okunmuş ve okunmamış mesaj durumları
- Socket bağlantı örnekleri

## pgAdmin ile Veritabanına Bağlanma

1. Tarayıcınızda http://localhost:5050 adresine gidin
2. E-posta: admin@example.com, Şifre: admin ile giriş yapın
3. Sağ tıklayıp "Create" > "Server..." seçeneğini seçin
4. Genel sekmesinde bir isim girin (örn. "VOIP Database")
5. Bağlantı sekmesinde aşağıdaki bilgileri girin:
   - Host: postgres
   - Port: 5432
   - Maintenance database: voipdb
   - Username: voipuser
   - Password: voippassword
6. "Save" düğmesine tıklayın

## Socket.IO ile Kullanım

Veritabanı, Socket.IO ile gerçek zamanlı mesajlaşma için özel olarak tasarlanmıştır:

1. **Kullanıcı Bağlantısı**:
   ```javascript
   // Kullanıcı bağlandığında
   socket.on('connect', async () => {
     await pool.query('SELECT update_user_socket($1, $2)', [userId, socket.id]);
   });
   
   // Kullanıcı bağlantısı kesildiğinde
   socket.on('disconnect', async () => {
     await pool.query('SELECT disconnect_user_socket($1)', [socket.id]);
   });
   ```

2. **Mesaj Gönderme**:
   ```javascript
   // JSON formatında mesaj gönderme
   socket.on('send_message', async (data) => {
     const { groupId, content, messageType = 'text', metadata = {} } = data;
     
     const result = await pool.query(
       'INSERT INTO messages (group_id, sender_id, content, message_type, metadata) VALUES ($1, $2, $3, $4, $5) RETURNING *',
       [groupId, userId, JSON.stringify(content), messageType, JSON.stringify(metadata)]
     );
     
     // Mesajı odadaki diğer kullanıcılara ilet
     socket.to(roomId).emit('new_message', result.rows[0]);
   });
   ```

3. **Mesaj Okundu İşaretleme**:
   ```javascript
   socket.on('mark_as_read', async (messageId) => {
     await pool.query(
       'INSERT INTO message_read_status (message_id, user_id, is_read, read_at) VALUES ($1, $2, TRUE, NOW()) ON CONFLICT (message_id, user_id) DO UPDATE SET is_read = TRUE, read_at = NOW()',
       [messageId, userId]
     );
     
     // Mesajın okunduğunu gönderene bildir
     const message = await pool.query('SELECT * FROM messages WHERE message_id = $1', [messageId]);
     const sender = await pool.query('SELECT socket_id FROM users WHERE user_id = $1', [message.rows[0].sender_id]);
     
     if (sender.rows[0].socket_id) {
       io.to(sender.rows[0].socket_id).emit('message_read', { messageId, userId });
     }
   });
   ```

## Servisleri Durdurma

```bash
docker-compose down
```

## Verileri Sıfırlama

Tüm verileri sıfırlamak için:

```bash
docker-compose down -v
docker-compose up -d
```

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. 