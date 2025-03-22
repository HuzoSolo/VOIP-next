# Redis ile Kullanıcı Oturum Yönetimi

Bu belge, VOIP uygulaması için Redis kullanarak oturum yönetiminin nasıl uygulanacağını açıklamaktadır.

## Redis Nedir?

Redis (Remote Dictionary Server), açık kaynaklı, bellek içi (in-memory) bir veri yapısı deposudur. Anahtar-değer tabanlı bir NoSQL veritabanı olarak çalışır ve yüksek performanslı önbellek (cache) çözümleri için idealdir.

## Neden Redis ile Oturum Yönetimi?

1. **Hız**: Bellek içi çalışma prensibi sayesinde çok hızlı okuma/yazma performansı sunar.
2. **TTL (Time To Live)**: Otomatik süre dolma özelliği ile oturumların belirli bir süre sonra otomatik olarak silinmesini sağlar.
3. **Ölçeklenebilirlik**: Yüksek trafik altında bile iyi performans gösterir.
4. **Basitlik**: Kullanımı ve entegrasyonu kolaydır.
5. **Veri Yapıları**: Zengin veri yapıları (string, hash, list, set, sorted set) sunar.

## Oturum Yönetimi Yapısı

### Anahtar Yapısı

Redis'te oturum bilgileri için şu anahtar yapısı kullanılabilir:

```
session:{token}
```

Burada `{token}`, kullanıcıya atanan benzersiz bir oturum belirtecidir.

### Değer Yapısı

Oturum bilgileri JSON formatında saklanabilir:

```json
{
  "user_id": 123,
  "username": "user123",
  "email": "user@example.com",
  "roles": ["user"],
  "ip_address": "192.168.1.1",
  "device_info": "Chrome on Windows",
  "created_at": "2023-06-15T10:30:00Z"
}
```

### TTL (Süre Dolma)

Her oturum için bir süre dolma süresi (TTL) ayarlanabilir. Örneğin:

```
EXPIRE session:{token} 3600  # 1 saat
```

## Uygulama Örneği

### Oturum Oluşturma (Giriş)

```javascript
// Kullanıcı girişi başarılı olduğunda
function createSession(user) {
  // Benzersiz token oluştur
  const token = generateUniqueToken();
  
  // Oturum verisi
  const sessionData = {
    user_id: user.id,
    username: user.username,
    email: user.email,
    roles: user.roles,
    ip_address: request.ip,
    device_info: request.headers['user-agent'],
    created_at: new Date().toISOString()
  };
  
  // Redis'e kaydet
  redis.set(`session:${token}`, JSON.stringify(sessionData));
  
  // TTL ayarla (1 saat)
  redis.expire(`session:${token}`, 3600);
  
  return token;
}
```

### Oturum Doğrulama

```javascript
// Her istekte oturumu doğrula
async function validateSession(token) {
  // Redis'ten oturum bilgisini al
  const sessionData = await redis.get(`session:${token}`);
  
  if (!sessionData) {
    return null; // Oturum bulunamadı veya süresi dolmuş
  }
  
  // TTL'i yenile (oturum süresini uzat)
  redis.expire(`session:${token}`, 3600);
  
  return JSON.parse(sessionData);
}
```

### Oturum Sonlandırma (Çıkış)

```javascript
// Kullanıcı çıkış yaptığında
function endSession(token) {
  // Redis'ten oturumu sil
  redis.del(`session:${token}`);
}
```

### Tüm Kullanıcı Oturumlarını Sonlandırma

```javascript
// Kullanıcının tüm oturumlarını sonlandır (şifre değişikliği vb. durumlarda)
async function endAllUserSessions(userId) {
  // Kullanıcıya ait tüm oturumları bul
  const keys = await redis.keys('session:*');
  
  for (const key of keys) {
    const sessionData = JSON.parse(await redis.get(key));
    
    if (sessionData.user_id === userId) {
      await redis.del(key);
    }
  }
}
```

## Çoklu Cihaz Desteği

Kullanıcının birden fazla cihazda oturum açabilmesi için, her oturum benzersiz bir token ile saklanır. Böylece bir kullanıcı farklı cihazlarda aynı anda oturum açabilir.

## Güvenlik Önlemleri

1. **Token Güvenliği**: Oturum token'ları yeterince uzun ve tahmin edilemez olmalıdır.
2. **HTTPS**: Tüm iletişim HTTPS üzerinden yapılmalıdır.
3. **IP Kontrolü**: Oturum bilgisinde IP adresi saklanarak, farklı IP'lerden gelen istekler için ek doğrulama istenebilir.
4. **Otomatik Süre Dolma**: Tüm oturumlar için TTL ayarlanmalıdır.
5. **Kritik İşlemlerde Yeniden Doğrulama**: Şifre değiştirme gibi kritik işlemlerde kullanıcıdan şifresini tekrar girmesi istenebilir.

## Redis Kurulumu ve Bağlantı

### Kurulum

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install redis-server

# CentOS/RHEL
sudo yum install redis

# macOS
brew install redis

# Windows
# Redis Windows için resmi olarak desteklenmez, ancak Microsoft'un bir portu mevcuttur
```

### Bağlantı (Node.js Örneği)

```javascript
const redis = require('redis');
const { promisify } = require('util');

// Redis istemcisi oluştur
const client = redis.createClient({
  host: 'localhost',
  port: 6379,
  password: 'your_redis_password' // Varsa
});

// Promisify Redis komutları
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);
const expireAsync = promisify(client.expire).bind(client);
const keysAsync = promisify(client.keys).bind(client);

// Bağlantı hatalarını yakala
client.on('error', (err) => {
  console.error('Redis Error:', err);
});
```

## Sonuç

Redis ile oturum yönetimi, VOIP uygulamanız için hızlı, güvenilir ve ölçeklenebilir bir çözüm sunar. PostgreSQL'de oturum bilgilerini saklamak yerine Redis kullanmak, veritabanı yükünü azaltır ve daha iyi performans sağlar. 