<div style="text-align:center">
    <img src="https://i.imgur.com/6ghmdYN.png" width="400px" />
</div>

<!-- #### Deploy Address
> [www.join-it.site](https://www.join-it.site) -->

### 프로젝트 소개

사고로 몸이 다친 이후 재활 치료를 받을 때 시공간적 제약으로 재활 치료에 어려움을 격는 사람들을 위한 서비스.   
환자들은 재활치료를 효과적으로 진행할 수 있고, 병원에서는 환자의 데이터를 더 쉽게 관리할 수 있음
- 자가 진단: 처방마다 자가진단을 실시하고 이를 통계 데이터로 제공
- 비대면 재활 코칭: 치료사는 WebRTC 기능을 통해 환자의 재활 운동을 코칭
- 재활 영상 안내: 유튜브에 운동 트레이닝 영상을 업로드하여, 환자가 참고할 수 있는 운동 영상들을 제공

SSAFY 9기 2학기 대전 2반 공통 프로젝트   
개발기간: 2023.07.04 ~ 2023.08.18 (7주)

---

### 프로젝트 설치 및 실행 방법

- [포팅메뉴얼](Exec/porting_manual.md)

---

### 주요 기능

#### 비대면 재활 코칭: 치료사는 WebRTC 기능을 통해 환자의 재활 운동을 코칭해줍니다.   
![Imgur](https://i.imgur.com/9gz1I6z.png)

#### 자가 진단: 처방마다 자가진단을 실시하고, 통계 데이터로 제공합니다.   
![Imgur](https://i.imgur.com/XGw4PXs.png)

#### 재활 영상 안내: 유튜브에 운동 트레이닝 영상을 업로드하여, 환자가 참고할 수 있는 운동 영상들을 제공합니다.   
![Imgur](https://i.imgur.com/Lx1Jl88.png)


### 프로젝트 사용 방법 및 화면 구성

#### 치료사가 환자에게 치료 및 처방을 생성해줍니다. (목, 운동과 코칭)   
![Imgur](https://i.imgur.com/q2uqG0t.gif)   
- 치료사는 운동, 코칭, 대면 세 유형 중에 하나를 선택합니다.
- 환자의 신상정보를 입력하고, 운동을 선택하여 강도와 횟수를 지정해줍니다.

#### 환자가 치료코드 입력하여 처방받은 치료를 시작합니다.   
![Imgur](https://i.imgur.com/pfUHGFm.gif)   

#### 화상운동진행(환자)   
![Imgur](https://i.imgur.com/RCEAHi8.gif)
- 가이드 선을 따라 초기 운동각도를 측정합니다.
- 그 후 영상을 시청하며 재활운동을 시작합니다.
- 우측 하단에는 운동에 대한 정보가 나옵니다.
- 운동을 마치고, 오늘 운동에 대한 설문을 진행합니다.

#### 실시간코칭(환자)   
![Imgur](https://i.imgur.com/2sCL7w4.gif)   
- 환자는 일정에 따라 치료사와 만나 재활 코칭을 받습니다.
- 메인화면에는 본인이 나오고, 우측 하단에는 치료사가 위치합니다.
- 우측 상단에는 지금 진행 중인 운동에 대한 영상이 나옵니다.
- 음성 및 채팅을 통해 소통을 진행합니다.

#### 실시간코칭(치료사)
![Imgur](https://i.imgur.com/1mlOWNy.gif)   
- 치료사는 우측의 정보들을 통해 환자의 정보를 확인할 수 있습니다.
- 치료사는 우측의 화면에서 진행할 운동을 변경할 수 있습니다.

#### 완료처방조회(운동)   
![Imgur](https://i.imgur.com/jVi6K10.gif)   
- 운동이나 코칭이 끝나고 난 후, 진행했던 운동 기록을 확인할 수 있습니다.

#### 환자 대시보드   
![Imgur](https://i.imgur.com/kvnoVaA.gif)   
- 환자는 본인의 일정, 통계, 기록을 확인할 수 있습니다.


#### 개발 과정 및 구조

![Infrastructure](https://i.imgur.com/uh4vH1D.png)

개발 과정:
1. 개발자가 작성한 코드가 Gitlab에 Merge되면 Webhook에 의해 Jenkins가 인식을 하고 자동배포를 시작합니다.
2. 소스코드로 Backend 이미지와 Frontend 이미지가 성공적으로 만들어지면, docker-compose로 이전의 도커 컨테이너와 이미지는 삭제하고 새로 컨테이너를 실행시킵니다.
3. 사용자가 사이트에 접속하면 Nginx는 Reverse Proxy를 통해 들어온 요청을 URI에 따라 FE, BE로 나눠줍니다.

구조:
- 하나의 AWS Lightsail에서 Docker를 활용하여 주요 프로그램을 실행시킵니다.
- 파일을 저장하기 위해 S3, DB를 관리하기 위해 RDS를 사용하였습니다.
- dockerhub에 이미지를 업로드하고, 다운로드하는 방식으로 도커 이미지를 관리하였습니다.


<p style="text-align:center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=html,css,js,ts,react,figma" /><br>
    <img src="https://skillicons.dev/icons?i=java,spring,gradle,idea,mysql,aws" /><br>
    <img src="https://skillicons.dev/icons?i=gitlab,jenkins,linux,docker,nginx,vim" /><br>
  </a>
</p>

- Frontend: npm 9.6.7, node 18.17.0, react 18.2.0, HTML5, CSS3, Typescript
- Backend: JDK 17, Spring Boot 3.0.9, MariaDB 10.6.14
- Infra: Ubuntu 20.04.6, Jenkins 2.401.3, Docker 24.0.5, Docker-Compose 1.25.0, Nginx 1.15.12
- Tools: Figma, VSCode, IntelliJ, Termius

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


#### Team

|김영민👑|노수혁|신지원|송병훈|이은성|정규성|
|:---:|:---:|:---:|:---:|:---:|:---:|
|![Imgur](https://i.imgur.com/QCIniI5.png)|![Imgur](https://i.imgur.com/j4TTBz7.png)|![Imgur](https://i.imgur.com/o38ciBD.png)|![Imgur](https://i.imgur.com/ixdlIIc.png)|![Imgur](https://i.imgur.com/edfmHsy.png)|![Imgur](https://i.imgur.com/v3N8Oq3.png)|
|Front & RTC|Front|Front|Back & Infra|Back|Back & RTC|
