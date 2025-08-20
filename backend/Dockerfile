# Sử dụng một ảnh nền chính thức có sẵn Maven và Java 21
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Đặt thư mục làm việc bên trong container
WORKDIR /app

# Copy các file cần thiết để build
COPY backend/mvnw .
COPY backend/.mvn .mvn
COPY backend/pom.xml .

# Chạy lệnh build
RUN ./mvnw package -DskipTests

# Giai đoạn 2: Tạo một ảnh nhỏ hơn để chạy ứng dụng
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

# Copy file JAR đã được build từ giai đoạn trước
COPY --from=build /app/target/SecondWear-0.0.1-SNAPSHOT.jar .

# Chỉ định cổng mà ứng dụng sẽ chạy
EXPOSE 8080

# Lệnh để khởi động ứng dụng
CMD ["java", "-jar", "SecondWear-0.0.1-SNAPSHOT.jar"]