-- VOIP Uygulaması Test Verileri
-- Bu dosya, geliştirme ve test amaçlı örnek veriler içerir.

-- Veritabanını temizleme (isteğe bağlı)
-- TRUNCATE users, friendships, chat_groups, group_members, messages, message_read_status CASCADE;

-- Örnek kullanıcılar
INSERT INTO users (username, email, password_hash, friend_code, display_name, profile_picture_url, status)
VALUES
    ('ahmet123', 'ahmet@example.com', '$2a$10$XQxBtEwPBF1xPYpPDgIzB.O1CkHgbDGGzTKKZK.ZLBFLZa1xzXK2q', 'AHMT1234', 'Ahmet Yılmaz', 'https://randomuser.me/api/portraits/men/1.jpg', 'online'),
    ('ayse456', 'ayse@example.com', '$2a$10$XQxBtEwPBF1xPYpPDgIzB.O1CkHgbDGGzTKKZK.ZLBFLZa1xzXK2q', 'AYSE5678', 'Ayşe Demir', 'https://randomuser.me/api/portraits/women/1.jpg', 'online'),
    ('mehmet789', 'mehmet@example.com', '$2a$10$XQxBtEwPBF1xPYpPDgIzB.O1CkHgbDGGzTKKZK.ZLBFLZa1xzXK2q', 'MHMT9012', 'Mehmet Kaya', 'https://randomuser.me/api/portraits/men/2.jpg', 'offline'),
    ('zeynep321', 'zeynep@example.com', '$2a$10$XQxBtEwPBF1xPYpPDgIzB.O1CkHgbDGGzTKKZK.ZLBFLZa1xzXK2q', 'ZEYP3456', 'Zeynep Şahin', 'https://randomuser.me/api/portraits/women/2.jpg', 'away'),
    ('can654', 'can@example.com', '$2a$10$XQxBtEwPBF1xPYpPDgIzB.O1CkHgbDGGzTKKZK.ZLBFLZa1xzXK2q', 'CAN7890', 'Can Öztürk', 'https://randomuser.me/api/portraits/men/3.jpg', 'busy'),
    ('elif987', 'elif@example.com', '$2a$10$XQxBtEwPBF1xPYpPDgIzB.O1CkHgbDGGzTKKZK.ZLBFLZa1xzXK2q', 'ELIF1234', 'Elif Yıldız', 'https://randomuser.me/api/portraits/women/3.jpg', 'online'),
    ('emre123', 'emre@example.com', '$2a$10$XQxBtEwPBF1xPYpPDgIzB.O1CkHgbDGGzTKKZK.ZLBFLZa1xzXK2q', 'EMRE5678', 'Emre Çelik', 'https://randomuser.me/api/portraits/men/4.jpg', 'offline'),
    ('seda456', 'seda@example.com', '$2a$10$XQxBtEwPBF1xPYpPDgIzB.O1CkHgbDGGzTKKZK.ZLBFLZa1xzXK2q', 'SEDA9012', 'Seda Arslan', 'https://randomuser.me/api/portraits/women/4.jpg', 'online');

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
INSERT INTO chat_groups (name, description, is_direct_message)
VALUES
    ('DM-1-2', NULL, TRUE),                                -- Ahmet ve Ayşe arasındaki özel sohbet
    ('DM-1-3', NULL, TRUE),                                -- Ahmet ve Mehmet arasındaki özel sohbet
    ('DM-2-5', NULL, TRUE),                                -- Ayşe ve Can arasındaki özel sohbet
    ('Yazılım Ekibi', 'Yazılım projesi hakkında konuşmalar', FALSE),  -- Grup sohbeti
    ('Arkadaşlar', 'Genel sohbet grubu', FALSE),           -- Grup sohbeti
    ('DM-4-7', NULL, TRUE),                                -- Zeynep ve Emre arasındaki özel sohbet
    ('DM-5-8', NULL, TRUE),                                -- Can ve Seda arasındaki özel sohbet
    ('Oyun Grubu', 'Oyun oynamak için buluşma grubu', FALSE);  -- Grup sohbeti

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

-- Örnek mesajlar
INSERT INTO messages (group_id, sender_id, content, sent_at)
VALUES
    -- Ahmet ve Ayşe arasındaki konuşma
    (1, 1, 'Merhaba Ayşe, nasılsın?', NOW() - INTERVAL '2 days'),
    (1, 2, 'İyiyim Ahmet, teşekkür ederim. Sen nasılsın?', NOW() - INTERVAL '2 days' + INTERVAL '5 minutes'),
    (1, 1, 'Ben de iyiyim. Bugün akşam müsait misin?', NOW() - INTERVAL '2 days' + INTERVAL '10 minutes'),
    (1, 2, 'Evet, müsaitim. Ne yapmayı düşünüyorsun?', NOW() - INTERVAL '2 days' + INTERVAL '15 minutes'),
    (1, 1, 'Yeni açılan kafeye gidebiliriz.', NOW() - INTERVAL '2 days' + INTERVAL '20 minutes'),
    
    -- Ahmet ve Mehmet arasındaki konuşma
    (2, 1, 'Mehmet, proje için toplantı ne zaman?', NOW() - INTERVAL '1 day'),
    (2, 3, 'Yarın saat 14:00\'te.', NOW() - INTERVAL '1 day' + INTERVAL '5 minutes'),
    (2, 1, 'Teşekkürler, orada olacağım.', NOW() - INTERVAL '1 day' + INTERVAL '10 minutes'),
    
    -- Yazılım Ekibi grup sohbeti
    (4, 1, 'Herkese merhaba, yeni sprint planını paylaşıyorum.', NOW() - INTERVAL '3 days'),
    (4, 3, 'Teşekkürler Ahmet, inceliyorum.', NOW() - INTERVAL '3 days' + INTERVAL '15 minutes'),
    (4, 2, 'Ben de bakıyorum, birkaç sorum olacak.', NOW() - INTERVAL '3 days' + INTERVAL '30 minutes'),
    (4, 7, 'Backend tarafındaki görevleri ben alabilirim.', NOW() - INTERVAL '3 days' + INTERVAL '45 minutes'),
    (4, 1, 'Harika Emre, görevleri atıyorum.', NOW() - INTERVAL '3 days' + INTERVAL '1 hour'),
    
    -- Arkadaşlar grup sohbeti
    (5, 2, 'Bu hafta sonu piknik yapalım mı?', NOW() - INTERVAL '5 days'),
    (5, 4, 'Harika fikir! Ben varım.', NOW() - INTERVAL '5 days' + INTERVAL '10 minutes'),
    (5, 6, 'Ben de gelebilirim. Nerede yapmayı düşünüyorsunuz?', NOW() - INTERVAL '5 days' + INTERVAL '20 minutes'),
    (5, 2, 'Belgrad Ormanı\'na gidebiliriz.', NOW() - INTERVAL '5 days' + INTERVAL '30 minutes'),
    (5, 1, 'Benim için de uygun. Saat kaçta buluşuyoruz?', NOW() - INTERVAL '5 days' + INTERVAL '40 minutes'),
    (5, 2, 'Sabah 10:00\'da otopark girişinde buluşalım.', NOW() - INTERVAL '5 days' + INTERVAL '50 minutes'),
    
    -- Zeynep ve Emre arasındaki konuşma
    (6, 4, 'Emre, kitabı bitirdin mi?', NOW() - INTERVAL '12 hours'),
    (6, 7, 'Evet, dün bitirdim. Çok etkileyiciydi.', NOW() - INTERVAL '12 hours' + INTERVAL '5 minutes'),
    (6, 4, 'Harika! Ben de yeni başladım. Spoiler vermeden fikrini merak ediyorum.', NOW() - INTERVAL '12 hours' + INTERVAL '10 minutes'),
    (6, 7, 'Kesinlikle tavsiye ederim. Son bölüm çok sürprizli.', NOW() - INTERVAL '12 hours' + INTERVAL '15 minutes'),
    
    -- Can ve Seda arasındaki konuşma
    (7, 5, 'Seda, yarınki toplantı için sunum hazır mı?', NOW() - INTERVAL '6 hours'),
    (7, 8, 'Evet, az önce bitirdim. Sana mail attım.', NOW() - INTERVAL '6 hours' + INTERVAL '5 minutes'),
    (7, 5, 'Harika, hemen bakıyorum. Teşekkürler!', NOW() - INTERVAL '6 hours' + INTERVAL '10 minutes'),
    
    -- Oyun Grubu sohbeti
    (8, 3, 'Bu akşam saat 21:00\'de online oyun oynayalım mı?', NOW() - INTERVAL '4 hours'),
    (8, 5, 'Ben varım!', NOW() - INTERVAL '4 hours' + INTERVAL '5 minutes'),
    (8, 7, 'Ben de katılabilirim.', NOW() - INTERVAL '4 hours' + INTERVAL '10 minutes'),
    (8, 8, 'Maalesef bu akşam müsait değilim. Yarın olabilir mi?', NOW() - INTERVAL '4 hours' + INTERVAL '15 minutes'),
    (8, 3, 'Yarın da oynayabiliriz, sorun değil.', NOW() - INTERVAL '4 hours' + INTERVAL '20 minutes');

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

-- Örnek sorgular:

-- 1. Bir kullanıcının tüm arkadaşlarını listele
-- SELECT u.username, u.display_name, u.status
-- FROM users u
-- JOIN friendships f ON (u.user_id = f.user_id_2 AND f.user_id_1 = 1 AND f.status = 'accepted')
--    OR (u.user_id = f.user_id_1 AND f.user_id_2 = 1 AND f.status = 'accepted');

-- 2. Bir kullanıcının tüm sohbet gruplarını listele
-- SELECT g.group_id, g.name, g.is_direct_message
-- FROM chat_groups g
-- JOIN group_members gm ON g.group_id = gm.group_id
-- WHERE gm.user_id = 1;

-- 3. Bir sohbet grubundaki tüm mesajları listele
-- SELECT m.message_id, u.display_name as sender, m.content, m.sent_at
-- FROM messages m
-- JOIN users u ON m.sender_id = u.user_id
-- WHERE m.group_id = 5
-- ORDER BY m.sent_at;

-- 4. Bir kullanıcının okunmamış mesajlarını listele
-- SELECT m.message_id, u.display_name as sender, g.name as group_name, m.content, m.sent_at
-- FROM messages m
-- JOIN users u ON m.sender_id = u.user_id
-- JOIN chat_groups g ON m.group_id = g.group_id
-- LEFT JOIN message_read_status mrs ON m.message_id = mrs.message_id AND mrs.user_id = 6
-- JOIN group_members gm ON g.group_id = gm.group_id AND gm.user_id = 6
-- WHERE (mrs.is_read IS NULL OR mrs.is_read = FALSE) AND m.sender_id != 6
-- ORDER BY m.sent_at DESC;

-- 5. İki kullanıcı arasındaki özel sohbeti bul
-- SELECT g.group_id
-- FROM chat_groups g
-- JOIN group_members gm1 ON g.group_id = gm1.group_id AND gm1.user_id = 1
-- JOIN group_members gm2 ON g.group_id = gm2.group_id AND gm2.user_id = 2
-- WHERE g.is_direct_message = TRUE
-- GROUP BY g.group_id
-- HAVING COUNT(DISTINCT gm1.user_id, gm2.user_id) = 2; 