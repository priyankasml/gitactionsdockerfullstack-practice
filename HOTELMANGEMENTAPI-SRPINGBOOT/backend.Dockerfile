# Stage 1: Build the Spring Boot JAR
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /app
COPY mvnw .
COPY .mvn/ .mvn
COPY pom.xml .
COPY src ./src

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# Stage 2: Run the JAR
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

# Wait-for-MySQL script
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

EXPOSE 2080
ENTRYPOINT ["/wait-for-it.sh", "mysqldb:3306", "--", "java", "-jar", "app.jar"]
