# 🎬 Movie Diary
그림일기 형식의 영화 감상문 웹 서비스 (2022.07-2022.08, 2023~)
<br/><br/>
## 구현 및 배포기술
- CRUD를 모두 구현한 React 프로젝트 (gh-pages 배포).
- SPA 형식으로 작성했으며 localstorage에 데이터 저장.
- localstorage의 한정된 용량을 고려해 Canvas API로 이미지 크기제한.
- Context API와 useReducer로 전역 상태 관리.
<br/><br/>
## 디렉토리 구조 (src/)
[src/component, src/context, src/db, src/pages, src/types]
<br/><br/>
## 실행 (상세 설명)

- **Cover Page** <br/>
  - 0.6초 후 Main Page로 이동 <br/>
    <image src="https://user-images.githubusercontent.com/106156087/232793800-6042f556-23fd-44a0-a404-a92ca87c5277.png" width="600">
- **Main page** <br/>
  - 작성된 일기 정렬 기능 (작성순, 날짜순, 테마순) <br/>
    <image src="https://github.com/kylee31/movie_diary/assets/106156087/0b83acb0-c46c-4979-95b8-ff0f849de760.png" width="600">
- **일기 작성 Page** <br/>
  - 5가지 테마 선택 가능, 이미지 추가, 좌석 선택, 영화관 위치 등 작성 기능, 140자 감상문 작성
    <image src="https://user-images.githubusercontent.com/106156087/232794169-497b62ed-a6a4-40a7-b185-42f179828786.png" width="600">
- **작성한 일기 Page** <br/>
  - 일기 수정, 삭제, 이미지로(png 파일) 저장하기 기능 <br/>
    <image src="https://user-images.githubusercontent.com/106156087/232796226-c239d892-5dc9-48f8-b991-0edbc0b2f571.png" width="600">
<br/><br/>
## 링크
<h3>https://kylee31.github.io/movie_diary</h3>
<br/>

## 현재 이슈, 코드 및 기능 개선사항
[이슈] . <br/>
[코드 개선사항] Zustand 상태 관리 라이브러리 적용하여 리팩토링 예정 <br/>
[기능 개선사항] 영화 API 연결하여 검색으로 포스터 로딩할 수 있는 기능 추가 고려
<br/><br/>
## 프로젝트 개발환경
VScode (version 1.77.2), React (version 18.2.0), Typescript (version 5.0.4), Node.js (version 16.15.1)

