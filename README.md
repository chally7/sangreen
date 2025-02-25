# 🌱 SANGREEN


![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-663399?style=flat&logo=CSS&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=flat&logo=Sass&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white) <br>
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=Figma&logoColor=white)
![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=flat&logo=Swiper&logoColor=white)
![JSON](https://img.shields.io/badge/JSON-000000?style=flat&logo=JSON&logoColor=white)


## ✨ 소개
저희는 사이트 배포 후 관리가 필요한 기존 사이트를 선정하여,<br>
고객 확보를 위한 트렌디한 디자인과<br>
사용자를 고려한 편리한 기능을 중심으로 한 리뉴얼 프로젝트 입니다


## 📑 요약

### 1. 주제

* 홈페이지 리뉴얼 : 산그린펜션

### 2. 목표

* 고객 확보 향상을 위해, 사용자를 고려한 편리한 기능 제공

### 3. 핵심 기능

* 예약 시스템
* 객실 정보 제공
* 고객 편의 기능

### 4. 주요 기술 스택

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white) 
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white) 
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)


## 📆 기간 및 인원

  * 총 작업 기간 : 15일
    * 기초 데이터 수집 및 화면 설계 기간 : 5일
    * 개발 및 테스트 기간 : 10일
   
  * 팀원 : 4명
    

## 👩🏻‍🤝‍🧑🏻 팀원 소개

| 이름 | 직무 | 담당 페이지 | 해당 |
| :---:| :---: | :---: | :---: |
| 소연희 | 총괄 팀장 | index.html, header.html, footer.html | |
| 안지현 | 디자인 팀장 | reserv01.html, reserv02.html, reserv03.html | |
| 박형주 | 기획 팀장 | intro.html, room.html | |
| 이용욱 | 개발 팀장 | special.html, tour.html | |


## ⚙️ 주요 기능

### 1. 객실 정보 제공
* 객실별 사진, 설명, 편의시설, 최대 인원 표시

### 2. 예약 시스템
* FullCalendar 5.11.3 사용
  * 드래그 방식으로 연박 예약 지원 (날짜 선택 시 하이라이트 표시)
  * 예약 가능 여부 시각적 표시
  * 객실별 예약 내역 반영

### 3. 고객 편의 기능
* 카카오맵 API 지도를 사용하여 펜션의 정확한 위치 안내
* 예약 내역 조회 및 취소 기능


## 🗂️ 폴더 구조

```
📂SANGREEN
┣ 📂css
┃  ┗📂scss
┣ 📂img     # 각 페이지 내 이미지 폴더
┃  ┣ 📂intro   
┃  ┣ 📂reserv
┃  ┣ 📂room
┃  ┣ 📂special
┃  ┗ 📂tour
┣ 📂js
┗ README.md
```


## 💻 개발 환경

### 1. 시스템 환경 (System Environment)
 * OS → Windows
 * 개발 도구 → Visual Studio Code (VS Code)
 * 웹 브라우저 → Google Chrome (개발자 도구 활용)

### 2. 프론트엔드 (Frontend)
 * HTML5 → 웹 페이지의 구조 정의
 * CSS3 / Sass → 스타일링 및 디자인 적용
 * JavaScript (Vanilla JS) → 동적 기능 및 사용자 인터랙션

### 3. 라이브러리 (Libraries & Plugins)
 * FullCalendar → 캘린더 기능 구현
 * Swiper.js → 이미지 슬라이드 및 캐러셀 효과

### 4. 데이터 처리 (Data Handling & Storage)
 * LocalStorage → 브라우저 내 데이터 저장 및 관리
 * JSON → API 연동 및 데이터 구조화

### 5. 개발 및 빌드 도구 (Development & Build Tools)
 * 버전 관리 → Git & GitHub


## 💥 트러블 슈팅

### 1. 과거 날짜와 예약이 완료된 날짜 모두 드래그가 가능한 이슈 발생
  
  * 예약이 완료된 날짜
      
      ⇒ **해결방법**: fullcalendar의 datesSet : 모든 데이터의 날짜를 가져와 while문으로 입실 날짜, 퇴실의 전날까지의 날짜를 회색으로 표현
    
      ⇒ **해결방법**: fullcalendar의 selectAllow : backgroundColor가 #CCC 일때 클릭 불가

  * 과거 날짜
      
      ⇒ **해결방법**: fullcalendar의 selectAllow : if문으로 오늘 날짜보다 적을 때 클릭 불가 

### 2. newDate()로 변경 시, 표준시간대(UTC) 기준으로 설정되어 한국 날짜와 9시간 차이나는 이슈
 
 ⇒ **해결방법**: 현재 브라우저의 로컬 시간대 기준으로 정오(12:00) 시간을 설정해줄 수 있는 setHours(12, 0, 0, 0) 메서드를 사용

### 3. 이름, 전화번호가 동일한 예약정보가 2개 이상일 때, 하나의 예약정보만 보여지는 이슈 발생

 * 기존 코드에서는 객체의 index값을 반복하는 filter와 break로 하나의 값만 찾고 반복문에서 탈출
    
    ⇒ **해결방법**: forEach, push를 사용하여 객체의 index값을 반복하여 이름, 전화번호가 동일한 정보를 모두 let a = [] 변수에 담아둠

     또한 2개 이상의 예약 정보가 확인 될 때 createElement() 메서드를 사용하여 첫 번째 내역의 태그와 동일하게 태그를 생성

### 4. 예약 정보가 2개 이상 확인 될 때 원하는 예약을 삭제하지 못하는 이슈 발생

 ⇒ **해결방법**: 예약정보 마다 ```<input type="checkbox">```생성
 
   checked 된 예약정보에 대해 for~in문, filter을 사용하여 특정 조건(호실, 입실 날짜, 퇴실 날짜가 동일하지 않은 경우)으로 필터링
   
   필터링된 데이터를 다시 Local Storage에 저장


