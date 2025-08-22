# Giai đoạn 1: Build ứng dụng
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

# Copy các file Maven wrapper
COPY backend/mvnw .
COPY backend/.mvn .mvn

# Copy file pom.xml và tải dependencies (tận dụng cache)
COPY backend/pom.xml .
RUN ./mvnw dependency:go-offline

# Copy toàn bộ mã nguồn <-- BƯỚC QUAN TRỌNG ĐÃ ĐƯỢC THÊM VÀO
COPY backend/src ./src

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