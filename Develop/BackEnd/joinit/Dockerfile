FROM openjdk:17
ARG JAR_FILE=joinit-0.0.1-SNAPSHOT.jar
COPY gradlew .
COPY gradlew gradle
COPY build.gradle .
COPY src src
RUN chmod =x ./gradlew
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
