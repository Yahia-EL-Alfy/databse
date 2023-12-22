FROM golang:latest

WORKDIR /app
COPY . .

# Define build-time environment variables
ARG DB_HOST=yayadb
ARG DB_PORT=5432
ARG DB_USER=postgres
ARG DB_PASSWORD=yahia2002
ARG DB_NAME=toolsproject
ARG PORT=8080
ARG ALLOWED_ORIGINS=http://localhost:80

# Set build-time environment variables as runtime environment variables
ENV DB_HOST=$DB_HOST
ENV DB_PORT=$DB_PORT
ENV DB_USER=$DB_USER
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_NAME=$DB_NAME
ENV PORT=$PORT
ENV ALLOWED_ORIGINS=$ALLOWED_ORIGINS

RUN go mod download
RUN go build -o main .

CMD ["./main"]
