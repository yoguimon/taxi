# Usar una imagen base de OpenJDK
FROM openjdk:17-jdk-slim

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar el archivo pom.xml y el archivo de configuración de Maven Wrapper
COPY pom.xml mvnw ./
COPY .mvn .mvn

# Descargar dependencias sin empaquetar el proyecto
RUN ./mvnw dependency:go-offline

# Copiar el resto del proyecto
COPY . .

# Construir el proyecto
RUN ./mvnw clean package -DskipTests

# Exponer el puerto 8080
EXPOSE 8080

# Configurar el comando por defecto para ejecutar el jar
CMD ["java", "-jar", "target/taxi-0.0.1-SNAPSHOT.jar"]