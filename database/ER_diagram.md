# VOIP Uygulaması ER Diyagramı (Metin Tabanlı)

```
+----------------+       +-------------------+       +----------------+
|     USERS      |       |    FRIENDSHIPS    |       |  CHAT_GROUPS   |
+----------------+       +-------------------+       +----------------+
| PK user_id     |<----->| PK friendship_id |       | PK group_id    |
|    username    |       |    user_id_1     |       |    name        |
|    email       |       |    user_id_2     |       |    description |
|    password_hash|       |    status        |       |    is_direct_msg|
|    friend_code |       |    created_at    |       |    created_at  |
|    display_name|       |    updated_at    |       |    updated_at  |
|    profile_pic |       +-------------------+       +----------------+
|    status      |                                          ^
|    last_seen   |                                          |
|    created_at  |                                          |
|    updated_at  |                +-------------------+     |
+----------------+                | GROUP_MEMBERS     |     |
        ^                         +-------------------+     |
        |                         | PK group_member_id|     |
        |                         |    group_id       |-----+
        |                         |    user_id        |-----+
        |                         |    role           |
        |                         |    joined_at      |
        |                         +-------------------+
        |
        |                         +-------------------+
        |                         |     MESSAGES      |
        |                         +-------------------+
        |                         | PK message_id     |
        |                         |    group_id       |-----+
        +-------------------------|    sender_id      |
        |                         |    content        |
        |                         |    is_read        |
        |                         |    sent_at        |
        |                         |    updated_at     |
        |                         +-------------------+
        |                                  ^
        |                                  |
        |                         +-------------------+
        |                         | MESSAGE_READ_STATUS|
        |                         +-------------------+
        |                         | PK status_id      |
        |                         |    message_id     |-----+
        +-------------------------|    user_id        |
                                  |    is_read        |
                                  |    read_at        |
                                  +-------------------+
```

## İlişkiler

1. **Kullanıcı - Arkadaşlık**: Bir kullanıcı birden çok arkadaşlık ilişkisine sahip olabilir (1:N)
2. **Kullanıcı - Grup Üyeliği**: Bir kullanıcı birden çok gruba üye olabilir (1:N)
3. **Grup - Grup Üyeliği**: Bir grupta birden çok üye olabilir (1:N)
4. **Kullanıcı - Mesaj**: Bir kullanıcı birden çok mesaj gönderebilir (1:N)
5. **Grup - Mesaj**: Bir gruba birden çok mesaj gönderilebilir (1:N)
6. **Kullanıcı - Mesaj Okunma Durumu**: Bir kullanıcı için birden çok mesaj okunma durumu olabilir (1:N)
7. **Mesaj - Mesaj Okunma Durumu**: Bir mesaj için birden çok okunma durumu olabilir (1:N)

## Kardinaliteler

- Bir kullanıcı birden çok arkadaşa sahip olabilir (N:M ilişki, friendships tablosu ile)
- Bir kullanıcı birden çok gruba üye olabilir (N:M ilişki, group_members tablosu ile)
- Bir grup birden çok kullanıcıya sahip olabilir (N:M ilişki, group_members tablosu ile)
- Bir kullanıcı birden çok mesaj gönderebilir (1:N ilişki)
- Bir grup birden çok mesaj içerebilir (1:N ilişki)
- Bir mesaj birden çok kullanıcı tarafından okunabilir (N:M ilişki, message_read_status tablosu ile)

## Redis ile Oturum Yönetimi

Kullanıcı oturumları PostgreSQL yerine Redis'te saklanacaktır. Redis, anahtar-değer tabanlı bir NoSQL veritabanıdır ve oturum yönetimi için ideal özelliklere sahiptir:

- Hızlı okuma/yazma performansı
- Otomatik süre dolma (TTL) özelliği
- Bellek içi (in-memory) çalışma prensibi
- Yüksek ölçeklenebilirlik

Redis'te oturum bilgileri şu şekilde saklanabilir:
```
KEY: session:{token}
VALUE: {
  "user_id": 123,
  "username": "user123",
  "ip_address": "192.168.1.1",
  "device_info": "Chrome on Windows",
  "created_at": "2023-06-15T10:30:00Z"
}
TTL: 3600 (1 saat)
``` 