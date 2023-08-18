<div style="text-align:center">
    <img src="https://i.imgur.com/6ghmdYN.png" width="400px" />
</div>

---

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=html,css,js,ts,react,figma" /><br>
    <img src="https://skillicons.dev/icons?i=java,spring,gradle,idea,mysql,aws" /><br>
    <img src="https://skillicons.dev/icons?i=gitlab,jenkins,linux,docker,nginx,vim" /><br>
  </a>
</p>

#### JOIN-IT Introduce
> SSAFY 9기 2학기 대전 2반 공통 프로젝트
> 개발기간: 2023.07.04 ~ 2023.08.18 (7주)

#### Deploy Address
> [www.join-it.site](https://www.join-it.site)

#### Team

|김영민👑|노수혁|신지원|송병훈|이은성|정규성|
|:---:|:---:|:---:|:---:|:---:|:---:|
|![Imgur](https://i.imgur.com/QCIniI5.png)|![Imgur](https://i.imgur.com/j4TTBz7.png)|![Imgur](https://i.imgur.com/o38ciBD.png)|![Imgur](https://i.imgur.com/ixdlIIc.png)|![Imgur](https://i.imgur.com/edfmHsy.png)|![Imgur](https://i.imgur.com/v3N8Oq3.png)|
|Front & RTC|Front|Front|Back & Infra|Back|Back & RTC|

#### 프로젝트 소개

사고로 몸이 다친 이후 재활 치료를 받을 때 시공간적 제약으로 재활 치료에 어려움을 격는 사람들을 위해 이 프로젝트를 진행하였습니다.
- 자가 진단 작성: 처방마다 자가진단을 실시하고 이를 통계 데이터로 제공합니다.
- 비대면 재활 코칭: 치료사는 WebRTC 기능을 통해 환자의 재활 운동을 코칭해줍니다. 
- 재활 영상 안내: 유튜브에 운동 트레이닝 영상을 업로드하여, 환자가 참고할 수 있는 운동 영상들을 제공합니다.

이 서비스를 통해 환자들은 재활치료를 효과적으로 진행할 수 있고, 병원에서는 환자의 데이터를 더 쉽게 관리할 수 있습니다.

---

#### 프로젝트 설치 및 실행 방법

> ### Front-end

![Front-end](https://i.imgur.com/1KobvJ1.png)

1. [Node](https://nodejs.org/ko) LTS버전 다운로드
2. [VSCode](https://code.visualstudio.com/) 다운로드
    - VSCode에서 Extension으로 작업을 도와주는 도구들을 다운받는다.
    - Prettier, JSON, file-icons, ES7 + React/Redux/React-Native snippets
3. React 프로젝트 만들기
    - 프로젝트를 만들 경로 안에서   
    `npx create-react-app [PROJECT_NAME]` 를 입력한다.
    - 프로젝트 개발에 필요한 모듈은   
    `npm install [모듈 이름]` 으로 설치한다. 전역 모듈로 설치하려면 install 뒤에 `-g` 를 붙인다.

- npm 9.6.7
- node 18.17.0
- react 
  - Dependencies
    - @ckeditor/ckeditor5-build-classic: ^38.1.1
    - @ckeditor/ckeditor5-react: ^6.1.0
    - @mui/x-date-pickers: ^6.10.1
    - @mui/x-date-pickers-pro: ^6.10.1
    - @reduxjs/toolkit: ^1.9.5
    - @testing-library/jest-dom: ^5.17.0
    - @testing-library/react: ^13.4.0
    - @testing-library/user-event: ^13.5.0
    - @types/aos: ^3.0.4
    - @types/jest: ^27.5.2
    - @types/node: ^16.18.39
    - @types/react: ^18.2.15
    - @types/react-dom: ^18.2.7
    - @types/react-slick: ^0.23.10
    - aos: ^2.3.4
    - axios: ^1.4.0
    - date-fns: ^2.30.0
    - http-proxy-middleware: ^2.0.6
    - react: ^18.2.0
    - react-datepicker: ^4.16.0
    - react-dom: ^18.2.0
    - react-redux: ^8.1.1
    - react-router-dom: ^6.14.2
    - react-scripts: 5.0.1
    - react-slick: ^0.29.0
    - slick-carousel: ^1.8.1
    - typescript: ^4.9.5
    - web-vitals: ^2.1.
- Tool: [VSCode](https://code.visualstudio.com/)

> ### Back-end

![Back-end](https://i.imgur.com/hWjgq2T.png)

1. openJDK 다운로드.
    - [openjdk 17.0.3](https://github.com/ojdkbuild/ojdkbuild) 에서 17버전 msi를 다운받는다.
    - msi는 환경변수를 자동으로 세팅해주기에, 다운받기만 하면 된다.
2. [IntelliJ](https://www.jetbrains.com/ko-kr/idea/download/?section=windows) 다운로드
    - 무료인 Community, 유료인 Ultimate 상관없다.
3. [start.spring.io](https://start.spring.io/) 에서 Spring 프로젝트 세팅을 한다.
    - Gradle - Kotlin: 다른 빌드 도구인 Ant나 Maven보다 성능이 좋고, Gradle - Kotlin은 Gradle - Groovy 보다 자동완성, 컴파일 오류 잡기, 리팩터링에 유리하다.
    - Spring Boot 3.0.9: 최신 버전을 사용해보기 위해 3.x 버전을 사용했다.
    - Java 17: 3.x를 사용하려면 17이상으로 사용해야 한다.
    - Jar: Spring Boot 안에 Tomcat을 내장하고 있어서, 코드만 패키징하는 Jar 형식을 선택했다.
    - Dependencies:
      - Spring Web
      - Spring Boot DevTools
      - Lombok
      - Spring Data JPA
      - MariaDB Driver
      - Java Mail Sender
    - Generate 클릭

![spring](https://i.imgur.com/9W5zOS3.png)
4. 프로젝트 압축을 풀고, build.gradle 을 클릭한다. 의존 라이브러리를 가져올 때까지 기다린다.
5. "File" -> "Settings"
  - "Plugins" 에서 Lombok Install 되어있는지 확인
  - "Editor" -> "File Encodings" -> Encoding 설정들 UTF-8로 변경 -> "Apply"
  - "Build, Execution, Deployment" -> "Build Tools" -> "Gradle" -> "Build and Run" 에서 Gradle로 되어있는 것 IntelliJ로 변경 -> "Apply"
  - "Build, Execution, Deployment" -> "Compiler" -> "Annotation Processors" -> "Enable annotation Processing" 체크 -> "Apply", "OK"
6. build.gradle.kts에 추가로 사용할 Dependency를 적용한다.
  ```build.gradle.kts
    // p6spy - SQL Check
    implementation("com.github.gavlyukovskiy:p6spy-spring-boot-starter:1.9.0") 

    // QueryDSL
    implementation("com.querydsl:querydsl-jpa:5.0.0:jakarta")
    annotationProcessor("com.querydsl:querydsl-apt:${dependencyManagement.importedProperties["querydsl.version"]}:jakarta")
    annotationProcessor("jakarta.annotation:jakarta.annotation-api")
    annotationProcessor("jakarta.persistence:jakarta.persistence-api")

    // AWS s3
    implementation("com.amazonaws:aws-java-sdk-s3:1.12.519")

    // Openvidu
    implementation("io.openvidu:openvidu-java-client:2.28.0") //openvidu

    // SMS
    implementation("net.nurigo:sdk:4.3.0")

    // JWT
    implementation("com.auth0:java-jwt:4.4.0")
    implementation("io.jsonwebtoken:jjwt-api:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.11.5")
  ```

7. application.yml 파일을 세팅한다.

```yml
spring: 
  datasource:
    
    # MariaDB Connection
    driver-class-name: org.mariadb.jdbc.Driver
    url: jdbc:mariadb://[DB_HOST]:[PORT_NUMBER]/[SCHEMA]?serverTimezone=UTC&useUniCode=yes&characterEncoding=UTF-8
    username: [USERNAME]
    password: [PASSWORD]

    # DB Connection Pool
    hikari:
      maximum-pool-size: 3

  # Multipart Size
  servlet:
    multipart:
      max-file-size: 200MB
      max-request-size: 200MB

  jpa:

    # Show JPA query
    show-sql: true 
    properties:
      hibernate:
        format_sql: true
      open-in-view: true
    
    # DDL Configure
    hibernate:
      ddl-auto: update

  # Mail Sender
  mail:
    host: smtp.gmail.com
    port: 587
    username: [GOOGLE_EMAIL]
    password: [GOOGLE_SECRET_KEY]
    properties:
      mail:
        smtp:
          auth: true
          timeout: 5000
          starttls:
            enable: true
            required: true
    transport:
      protocol: smtp
    debug: true
    default-encoding: UTF-8

# Spring Server Setting
server:
  port: 5000
  servlet:
    context-path: /api

# Logging
logging:
  level:
    web: debug


# AWS S3 Setting
cloud:
  aws:
    credentials:
      access-key: [ACCESS_KEY]
      secret-key: [SECRET_KEY]
    s3:
      bucket: [BUCKET_NAME]
      dir:
    region:
      static: ap-northeast-2
    stack:
      auto: false

# Openvidu setting
OPENVIDU_URL: [OPENVIDU_URL] # https 로 해야 한다.
OPENVIDU_SECRET: [OPENVIDU_SECRET]

# SMS Setting
SMS_API_KEY: [SMS_API_KEY]
SMS_API_SECRET_KEY:  [SMS_API_SECRET_KEY]
SMS_DOMAIN: https://api.coolsms.co.kr
CALLING_NUMBER: [PHONE_NUMBER]

# JWT Setting
jwt:
  secretKey: [JWT_SECRET_KEY] # 암호화 알고리즘으로 HS512를 사용할 것이기 때문에, 512비트(64바이트) 이상이 되어야 한다.
  access:
    expiration: 3600000 # 단위 ms, 60분
    header: Authorization # token 이 저장될 헤더 이름
  refresh:
    expiration: 1209600000 # 단위 ms, 2주
    header: Authorization-refresh # token 이 저장될 헤더 이름
```

- Tool: [IntelliJ Ultimate (2023.1.3)](https://www.jetbrains.com/ko-kr/idea/download/?section=windows)

> ### Infrastructure

![Infrastructure](https://i.imgur.com/1UKYMcT.png)

- AWS Lightsail Instance
  - Price: 40$ USD
  - RAM: 8 GB
  - vCPU: 2
  - SSD: 160 GB
  - OS: Ubuntu 20.04.6 LTS
- AWS EC2 Instance
  - Price: Free
  - RAM: 1 GiB
  - vCPU: 1
  - SSD: 30 GiB
  - OS: Ubuntu 20.04 LTS
- Jenkins: 2.401.3
- Webhook
- Docker: 24.0.5
- Docker-Compose: 1.25.0
- Nginx: 1.15.12
- certbot: latest
- Tool: Termius

> ### DataBase

![DataBase](https://i.imgur.com/Q2nzukO.png)

- AWS RDS
  - Price: Free tier
  - Engine: MariaDB 10.6.14
  - vCPU: 2
  - RAM: 1GB
  - Instance Class: db.t3.micro
  - Storage: 범용 SSD(gp2), 20GiB
  - Multi AZ: No
  - Inbound Rule
    - Before Release: Every IP Allow
    - After Release: Only Project Instance IP Allow
  - Parameter Group
    - char: utfmb4
    - time_zone: Asia/Seoul
    - collation: utf8mb4_general_ci
    - lower_case_table_names: 1
- Tool: AWS RDS, MySQL Workbench 8.0.32

- reference: [Blog](https://velog.io/@nefertiri/AWS-RDS%EB%A1%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EB%A7%8C%EB%93%A4%EA%B8%B0)
- [AWS RDS](https://aws.amazon.com/ko/rds/)에 DB를 만든다.
  1. RDS 인스턴스 생성

  ![RDS](https://i.imgur.com/mGw9Olc.png)

      1. AWS 사이트 상단에 있는 검색창에서 RDS를 검색한다.
      2. MariaDB를 선택한다.
      3. 프리 티어를 선택하고 DB 인스턴스 식별자와 마스터 사용자 정보를 등록한다. 마스터 사용자 정보로 데이터베이스에 접근한다.
      4. 스토리지 용량을 설정한다. 프리 티어에서는 20GiB까지 이용할 수 있다.
      5. 퍼블릭 액세스를 "예"로 선택한다. 추후 보안 그룹에서 지정된 IP만 접근하도록 설정한다.
      6. 보안 그룹을 새로 생성하고 이름을 입력해준다.
      7. 추가구성에서 초기 데이터베이스 이름을 설정하고, DB의 username, password, port_number를 정한다.
      8. 프리티어 조건을 확인하고 데이터베이스 생성을 선택한다.

  2. RDS 설정

  ![parameter](https://i.imgur.com/cTynsvZ.png)

      1. 왼쪽 메뉴에서 파라미터 그룹을 선택 후, 파라미터 그룹을 생성한다.
      2. 생성한 MariaDB와 같은 버전을 선택하고, 파라미터 그룹 이름을 입력하여 파라미터 그룹을 생성한다.
      3. 생성된 파라미터 그룹을 확인하고, 파라미터 편집을 선택한다.
      4. 파라미터 검색창에 time_zone을 검색한다. time_zone 파라미터의 값을 Asia/Seoul로 선택한다.
      5. 파라미터 검색창에 char을 검색한다. 아래 그림에 보이는 6개의 파라미터들의 값을 utf8mb4로 선택한다.
      6. 파라미터 검색창에 collation을 검색한다. collation_connection, collation_server 의 값을 utf8mb4_general_ci로 선택한다.
      7. 파라미터 검색창에 lower_case_table_names를 검색한다. 해당 파라미터의 값을 1로 설정한다. 해당 값이 1일 경우 테이블명의 대소문자를 구분하지 않는다.
      8. 파라미터 검색창에 max_connection을 검색한다. max_connections는 인스턴스 사양에 따라 자동으로 정해진다.
      9. 생성된 파라미터 그룹을 데이터베이스에 연결한다. 생성한 데이터베이스 인스턴스를 선택하고 수정을 선택한다.
      10. 추가 구성의 데이터베이스 옵션의 DB 파라미터 그룹을 방금 생성한 파라미터 그룹으로 변경한다.
      11. 수정 사항 적용 시간을 즉시 적용으로 선택하고, 데이터베이스 재부팅을 진행한다.

  3. 로컬 PC에서 RDS 접속

  ![inbound](https://i.imgur.com/PDOGNh6.png)

      1. 데이터베이스 세부 정보에서 VPC 보안 그룹을 선택한다.
      2. 데이터베이스의 보안 그룹을 선택하고 인바운드 규칙 편집을 선택한다.
      3. 팀원 모두가 각각 DB에 접근해야 한다면 "모든 TCP", 0.0.0.0/0 으로 설정한다.
      4. 추후 개발이 완성된 이후, 특정 IP에서만 DB에 접근한다면, 해당 IP만 허용한다.
      5. 로컬 PC에서 데이터베이스에 접근하기 위한 클라이언트 프로그램으로 MySQL Workbench를 사용한다. 해당 프로그램을 설치한다. [Download Link](https://dev.mysql.com/downloads/workbench/)
      6. 상단 메뉴의 Database -> Manage Connections -> New 를 선택하여 데이터 베이스 연결 정보를 입력한다. Hostname에는 RDS의 엔드포인트를 입력한다. 엔드포인트는 RDS 상세 정보 페이지에 있다. Username, Password에는 RDS 생성시 설정한 마스터 사용자 이름과 암호를 입력한다.
      7. 데이터베이스가 선택된 상태에서 현재의 설정을 확인한다. 일부 항목이 제대로 설정되어 있지 않으므로 직접 변경한다.
      
    ```sql
    # 문자 설정 확인
    SHOW VARIABLES LIKE 'c%';

    ALTER DATABASE [SCHEMA_NAME]
    CHARACTER SET = 'utf8mb4'
    COLLATE = 'utf8mb4_general_ci';

    # 시간 설정 확인 -> Asia/Seoul(+9:00) 이 맞나?
    SELECT @@time_zone, now();

    SET GLOBAL time_zone = '+9:00';
    SET time_zone = '+9:00';

    # 테이블 대소문자 구분 설정 확인 -> 1 이 맞나?
    SHOW VARIABLES LIKE 'lower_case_table_names';

    # lower_case_table_names를 수정하는 SQL은 찾아도 안 나온다.
    # RDS를 사용 중이기에 DB의 인바운드 규칙을 편집하여 EC2에서 접속 가능하도록 하여
    # CLI를 통해 "lower_case_table_names = 1" 를 DB 설정 파일에 추가하면 된다.
    # 아니면 RDS를 재부팅하면 이전에 설정했던 "lower_case_table_names = 1" 가 제대로 적용되기도 한다. 
    ```

![Imgur](https://i.imgur.com/ERuBABE.png)

---

<!-- #### 프로젝트 사용 방법 및 화면 구성 -->


#### 주요 기능

- 자가 진단 작성: 처방마다 자가진단을 실시하고 이를 통계 데이터로 제공합니다.
![Imgur](https://i.imgur.com/XGw4PXs.png)

- 비대면 재활 코칭: 치료사는 WebRTC 기능을 통해 환자의 재활 운동을 코칭해줍니다. 
![Imgur](https://i.imgur.com/9gz1I6z.png)

- 재활 영상 안내: 유튜브에 운동 트레이닝 영상을 업로드하여, 환자가 참고할 수 있는 운동 영상들을 제공합니다.
![Imgur](https://i.imgur.com/Lx1Jl88.png)

#### 아키텍쳐

![Infrastructure](https://i.imgur.com/uh4vH1D.png)

#### 참고 자료

- [AWS RDS](https://velog.io/@nefertiri/AWS-RDS%EB%A1%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EB%A7%8C%EB%93%A4%EA%B8%B0)
- [EC2에 Jenkins 설치](https://doing7.tistory.com/118)
- [도커 설치](https://erinh.tistory.com/entry/CICD-Spring-Jenkins-Nginx-EC2-Docker%EB%A1%9C-%EB%AC%B4%EC%A4%91%EB%8B%A8-%EB%B0%B0%ED%8F%AC-%EA%B5%AC%ED%98%84-1-EC2-%EC%84%9C%EB%B2%84-%EA%B8%B0%EB%B3%B8-%EC%84%A4%EC%A0%95-%EB%8F%84%EC%BB%A4-%EC%A0%A0%ED%82%A8%EC%8A%A4-Nginx-JDK-MySQL-Redis-%EC%84%A4%EC%B9%98)
- [도커 컴포즈 설치](https://soyoung-new-challenge.tistory.com/73#google_vignette)
- [AWS S3](https://devlog-wjdrbs96.tistory.com/323)
- [Docker-compose](https://velog.io/@oneook/Docker%EB%A1%9C-React-%EA%B0%9C%EB%B0%9C-%EB%B0%8F-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0)
- [SSL](https://velog.io/@zero-black/Docker-compose-certbot-nginx-%EB%A1%9C-SSL-%EC%9D%B8%EC%A6%9D%EC%84%9C-%EB%B0%9C%EA%B8%89%ED%95%98%EA%B8%B0)
- [SSL(영어)](https://pentacent.medium.com/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71)
- [Nginx](https://velog.io/@shin6949/Nginx-Reverse-Proxy-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0-feat.-Docker)