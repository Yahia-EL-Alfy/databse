FROM postgres:latest

ENV POSTGRES_DB toolsproject
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD yahia2002

COPY init.sql /docker-entrypoint-initdb.d/
RUN chown -R 1009090000:1009090000 /var/lib/postgresql/data

# Expose the PostgreSQL port
EXPOSE 5432


