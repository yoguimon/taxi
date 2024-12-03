# Usa una imagen base de OpenJDK
FROM openjdk:17-jdk-slim

# Copia el archivo WAR del proyecto al contenedor
COPY target/taxi-0.0.1-SNAPSHOT.war /app.war

# Expón el puerto que usará tu aplicación
EXPOSE 8080

# Ejecuta el archivo WAR
ENTRYPOINT ["java", "-jar", "/app.war"]