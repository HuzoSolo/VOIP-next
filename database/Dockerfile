FROM postgres:14-alpine

# Veritabanı şema dosyalarını kopyala
COPY schema.sql /docker-entrypoint-initdb.d/
COPY dummy_data.sql /docker-entrypoint-initdb.d/

# Şema dosyalarını çalıştırılabilir yap
RUN chmod a+r /docker-entrypoint-initdb.d/*

# PostgreSQL yapılandırması
ENV POSTGRES_USER=voipuser
ENV POSTGRES_PASSWORD=voippassword
ENV POSTGRES_DB=voipdb

# PostgreSQL'in dinleyeceği port
EXPOSE 5432 