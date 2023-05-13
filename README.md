# 🎬 Movie Diary

그림일기 형식의 영화 감상문 웹 서비스 (2022.07-2022.08)
<br><br>

## 구현 및 배포기술

- React로 구현한 프로젝트이며 기본적인 기능 개발 이후 서비스 향상을 위한 리팩토링 실시.
  <br>(React, Typescript, HTML, CSS(styled-components, SCSS), localstorage, html2canvas, WebGl)
- gh-pages로 배포.

## 디렉토리 구조 (src/)

1. component
   <br> Cover.jsx, Header.jsx, DiaryItem.jsx, DiaryList.jsx, MovieTheater.jsx, Edit.jsx, Show.jsx

2. db
   <br> data.json

3. pages
   <br> Main.jsx, ShowDiary.jsx, WriteDiary.jsx, EditDiary.jsx

## 프로젝트 실행 (상세설명)

- Cover 화면 실행<br>
  <image src="https://user-images.githubusercontent.com/106156087/232793800-6042f556-23fd-44a0-a404-a92ca87c5277.png" width="600">

- Main page <br>
  <image src="https://user-images.githubusercontent.com/106156087/232797374-f21eea2d-39d1-49eb-9a74-4de4b44abf3c.png" width="600">

- 일기 작성 button <br>

  - 5가지 컨셉, 이미지, 좌석선택, 영화관 위치 등 입력 가능, 140자 감상문 작성
    <image src="https://user-images.githubusercontent.com/106156087/232794169-497b62ed-a6a4-40a7-b185-42f179828786.png" width="600">

- 작성된 일기 선택 (수정, 삭제, 이미지 저장 button) <br>
  <image src="https://user-images.githubusercontent.com/106156087/232796226-c239d892-5dc9-48f8-b991-0edbc0b2f571.png" width="600">

## 호스팅 링크

[Movie Diary](https://kylee31.github.io/movie_diary/)
<br><br>

## 실행 영상 (youtube)

[![movie diary](https://img.youtube.com/vi/W1zmduWOr4I/0.jpg)](https://www.youtube.com/W1zmduWOr4I)
<br><br>

## 프로젝트 개발환경

VScode (version 1.77.2)<br>
React (version 18.2.0)<br>
styled-components (version 5.3.5)
