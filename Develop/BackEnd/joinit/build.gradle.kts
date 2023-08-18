plugins {
	java
	id("org.springframework.boot") version "3.0.9"
	id("io.spring.dependency-management") version "1.1.2"
}

group = "com.asrai"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17


    configurations {
        compileOnly {
            extendsFrom(configurations.annotationProcessor.get())
        }
    }

    repositories {
        mavenCentral()
    }

    dependencies {
        implementation("org.springframework.boot:spring-boot-starter-data-jpa")
        implementation("org.springframework.boot:spring-boot-starter-mail") // mail
        implementation("org.springframework.boot:spring-boot-starter-oauth2-client") // oauth2
        implementation("org.springframework.boot:spring-boot-starter-security")
        implementation("org.springframework.boot:spring-boot-starter-web")
        implementation("org.springframework.boot:spring-boot-starter") //Scheduler 기능 사용

//        implementation("org.springframework.boot:spring-boot-starter-validation") // validation
        implementation("com.github.gavlyukovskiy:p6spy-spring-boot-starter:1.9.0") // p6spy - SQL Check

        // Querydsl
        implementation("com.querydsl:querydsl-jpa:5.0.0:jakarta")
        annotationProcessor("com.querydsl:querydsl-apt:${dependencyManagement.importedProperties["querydsl.version"]}:jakarta")
        annotationProcessor("jakarta.annotation:jakarta.annotation-api")
        annotationProcessor("jakarta.persistence:jakarta.persistence-api")

//        implementation ("org.springframework.cloud:spring-cloud-starter-aws:2.2.6.RELEASE") // AWS s3
        implementation("com.amazonaws:aws-java-sdk-s3:1.12.519")
        compileOnly("org.projectlombok:lombok")
        runtimeOnly("org.mariadb.jdbc:mariadb-java-client") // mariadb
        annotationProcessor("org.projectlombok:lombok") // lombok
        testImplementation("org.springframework.boot:spring-boot-starter-test")
        testImplementation("org.springframework.security:spring-security-test")

        implementation("io.openvidu:openvidu-java-client:2.28.0") //openvidu

		implementation("net.nurigo:sdk:4.3.0") // sms

        implementation("com.auth0:java-jwt:4.4.0") // jwt open source
        implementation("io.jsonwebtoken:jjwt-api:0.11.5") // https://mvnrepository.com/artifact/io.jsonwebtoken/jjwt-api
        runtimeOnly("io.jsonwebtoken:jjwt-impl:0.11.5") // https://mvnrepository.com/artifact/io.jsonwebtoken/jjwt-impl
        runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.11.5") // https://mvnrepository.com/artifact/io.jsonwebtoken/jjwt-jackson
    }

    tasks.withType<Test> {
        useJUnitPlatform()
    }
}
