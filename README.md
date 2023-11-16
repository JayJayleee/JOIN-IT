<div style="text-align:center">
    <img src="https://i.imgur.com/6ghmdYN.png" width="400px" />
</div>

---

<p style="text-align:center">
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

- [포팅메뉴얼](Exec/porting_manual.md)

---

#### 프로젝트 사용 방법 및 화면 구성

- 치료사가 치료 및 처방 생성 (목, 운동과 코칭)   
![Imgur](https://i.imgur.com/q2uqG0t.gif)

- 환자가 치료코드 입력   
![Imgur](https://i.imgur.com/pfUHGFm.gif)

- 화상운동진행(환자)   
![Imgur](https://i.imgur.com/RCEAHi8.gif)

- 실시간코칭(환자)   
![Imgur](https://i.imgur.com/2sCL7w4.gif)

- 치료사 실시간 코칭 진행   
![Imgur](https://i.imgur.com/1mlOWNy.gif)

- 치료사 실시간 코칭 진행2   
![Imgur](https://i.imgur.com/HOtQYyW.gif)

- 완료처방조회(운동)   
![Imgur](https://i.imgur.com/jVi6K10.gif)

- 환자 대시보드   
![Imgur](https://i.imgur.com/kvnoVaA.gif)


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
