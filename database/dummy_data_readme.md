# VOIP Uygulaması Test Verileri

Bu belge, VOIP uygulaması için oluşturulan test verilerini açıklamaktadır. Bu veriler, geliştirme ve test aşamalarında kullanılmak üzere tasarlanmıştır.

## Test Verilerinin İçeriği

`dummy_data.sql` dosyası aşağıdaki test verilerini içerir:

1. **Kullanıcılar**: 8 adet örnek kullanıcı (farklı durumlarda: online, offline, away, busy)
2. **Arkadaşlık İlişkileri**: Farklı durumlarda (kabul edilmiş, beklemede, engellenmiş) arkadaşlık ilişkileri
3. **Sohbet Grupları**: Hem ikili sohbetler hem de grup sohbetleri
4. **Grup Üyelikleri**: Kullanıcıların gruplara üyelikleri ve rolleri
5. **Mesajlar**: Farklı gruplarda gönderilmiş örnek mesajlar
6. **Mesaj Okunma Durumları**: Okunmuş ve okunmamış mesaj durumları

## Kullanım

Test verilerini veritabanınıza eklemek için:

```bash
psql -U <kullanıcı_adı> -d <veritabanı_adı> -f dummy_data.sql
```

> **Not**: Önce `schema.sql` dosyasını çalıştırarak veritabanı şemasını oluşturduğunuzdan emin olun.

## Örnek Kullanıcılar

| Kullanıcı Adı | E-posta | Arkadaş Kodu | Durum |
|---------------|---------|--------------|-------|
| ahmet123 | ahmet@example.com | AHMT1234 | online |
| ayse456 | ayse@example.com | AYSE5678 | online |
| mehmet789 | mehmet@example.com | MHMT9012 | offline |
| zeynep321 | zeynep@example.com | ZEYP3456 | away |
| can654 | can@example.com | CAN7890 | busy |
| elif987 | elif@example.com | ELIF1234 | online |
| emre123 | emre@example.com | EMRE5678 | offline |
| seda456 | seda@example.com | SEDA9012 | online |

> **Not**: Tüm kullanıcıların şifreleri aynıdır ve hash değeri `$2a$10$XQxBtEwPBF1xPYpPDgIzB.O1CkHgbDGGzTKKZK.ZLBFLZa1xzXK2q` olarak ayarlanmıştır. Bu, "password123" şifresinin bcrypt ile hashlenmesiyle oluşturulmuştur.

## Örnek Sorgular

`dummy_data.sql` dosyasının sonunda, veritabanını sorgulamak için kullanabileceğiniz örnek sorgular bulunmaktadır:

1. Bir kullanıcının tüm arkadaşlarını listeleme
2. Bir kullanıcının tüm sohbet gruplarını listeleme
3. Bir sohbet grubundaki tüm mesajları listeleme
4. Bir kullanıcının okunmamış mesajlarını listeleme
5. İki kullanıcı arasındaki özel sohbeti bulma

Bu sorguları kullanmak için, yorum işaretlerini kaldırın ve gerekli parametreleri (örneğin kullanıcı ID'si) değiştirin.

## Test Senaryoları

Bu test verileriyle aşağıdaki senaryoları test edebilirsiniz:

1. **Kullanıcı Girişi**: Herhangi bir kullanıcı bilgisiyle giriş yapma
2. **Arkadaş Ekleme**: Arkadaş kodunu kullanarak arkadaş ekleme
3. **Arkadaşlık İsteklerini Yönetme**: Bekleyen istekleri kabul etme veya reddetme
4. **Mesajlaşma**: İkili sohbetlerde veya grup sohbetlerinde mesaj gönderme
5. **Mesaj Okunma Durumu**: Okunmamış mesajları görüntüleme ve okundu olarak işaretleme
6. **Grup Yönetimi**: Gruplara üye ekleme, çıkarma veya rol değiştirme

## Verileri Temizleme

Test verilerini temizlemek isterseniz, `dummy_data.sql` dosyasının başındaki yorum satırını kaldırarak TRUNCATE komutunu çalıştırabilirsiniz:

```sql
TRUNCATE users, friendships, chat_groups, group_members, messages, message_read_status CASCADE;
```

> **Uyarı**: Bu komut, tablolardaki tüm verileri silecektir. Sadece test ortamında kullanın. 