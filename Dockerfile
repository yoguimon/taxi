# Usar una imagen base con JDK 17 y Maven
FROM maven:3.9.4-eclipse-temurin-17 AS build

# Establecer un directorio de trabajo
WORKDIR /app

# Copiar archivos de tu proyecto al directorio de trabajo
COPY . /app

# Ejecutar Maven para construir el proyecto
RUN mvn clean package

# Crear una nueva imagen basada en OpenJDK 17
FROM openjdk:17-slim

# Exponer el puerto que utilizará la aplicación
EXPOSE 8080

# Copiar el archivo JAR construido desde la etapa anterior
COPY --from=build /app/target/taxi-0.0.1-SNAPSHOT.war /app/taxi-0.0.1-SNAPSHOT.war

# Establecer el punto de entrada para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "/app/taxi-0.0.1-SNAPSHOT.war"]


