# 🎬 Movie Diary

CRUD 기능 구현, 이미지 최적화 적용한 영화 감상문
<br/><br/>

## 설치 및 실행

```
## npm
git clone https://github.com/kylee31/movie_diary.git
npm install
npm run start

## yarn
git clone https://github.com/kylee31/movie_diary.git
yarn install
yarn start
```

## 기술스택 및 구현 기능

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black"/> <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&logo=styledcomponents&logoColor=black"/> <img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white"/> <img src="https://img.shields.io/badge/Context API-61DAFB?style=flat-square&logoColor=white"/> <img src="https://img.shields.io/badge/githubpages-222222?style=flat-square&logo=githubpages&logoColor=white"/>

- CRUD를 모두 구현한 React 프로젝트 (gh-pages 배포)
- SPA 형식으로 작성했으며 localstorage에 데이터 저장
- localstorage의 한정된 용량을 고려해 Canvas API로 이미지 크기제한
- Context API와 useReducer로 전역 상태 관리
  <br/><br/>

## 주요 기능

|                                                                                                                                  |                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **커버**                                                                                                                         | **메인 페이지**                                                                                                                  |
| <image src="https://user-images.githubusercontent.com/106156087/232793800-6042f556-23fd-44a0-a404-a92ca87c5277.png" width="600"> | <image src="https://github.com/kylee31/movie_diary/assets/106156087/0b83acb0-c46c-4979-95b8-ff0f849de760.png" width="600">       |
| **일기 작성**                                                                                                                    | **일기 내용**                                                                                                                    |
| <image src="https://user-images.githubusercontent.com/106156087/232794169-497b62ed-a6a4-40a7-b185-42f179828786.png" width="600"> | <image src="https://user-images.githubusercontent.com/106156087/232796226-c239d892-5dc9-48f8-b991-0edbc0b2f571.png" width="600"> |

- 0.6초 후 Main Page로 이동
- 작성된 일기 정렬 기능 (작성순, 날짜순, 테마순)
- 5가지 테마 선택 가능, 이미지 추가, 좌석 선택, 영화관 위치 등 작성 기능, 140자 감상문 작성
- 일기 수정, 삭제, 이미지로(png 파일) 저장하기  
  <br/><br/>

## 링크

<h3>https://kylee31.github.io/movie_diary</h3>
<br/>

## 트러블슈팅

<details>
<summary><b>고해상도 이미지 크기 재정의로 저장 개수 증가</b></summary>
[문제] <br/>
localstorage 용량이 한정되어 있어 크기가 1MB 이상 이미지 삽입 시 저장 가능한 일기 개수가 5개 미만이 되어 사용성 낮음<br/>
[과정] <br/>
- 일정 기준(용량 또는 크기) 초과 시 이미지 리사이징하는 로직 생성<br/>
[1단계] 용량 기준으로 리사이징<br/>
- 점유율 높은 이미지 리사이징 라이브러리 중 고민<br/>
    - 용량을 기준으로 리사이징하는 browser-image-compression 선택<br/>
    - 해당 라이브러리는 브라우저 내장 기능에 의존하여 리사이징 → 1MB 넘지 않는 이미지라도 리사이징 시간 2초 이상으로 오래 걸림<br/>
[2단계] 크기(가로,세로) 초과 시 Canvas API로 리페인팅 후 저장하는 방식으로 변경<br/>
- 가로 600 혹은 세로 840 초과 시 Canvas API 사용하여 300x420 크기로 리페인팅하여 리사이징 된 이미지 저장<br/>
[3단계] 크기 기준 라이브러리 최종 적용<br/>
- 구현한 로직이 react-image-file-resizer와 동일한 방식으로 해당 라이브러리 적용도 적절한 방법이라고 판단<br/>
- react-image-file-resizer 적용으로 리사이징 quality 수정도 가능해짐<br/>
[결과] <br/>
1MB 이상 이미지 5개 미만 저장 → 크기 제한 리사이징으로 최대 30개까지 저장 가능<br/>
</details>

<br/>

## 현재 이슈, 코드 및 기능 개선사항

[이슈] . <br/>
[코드 개선사항] Zustand 상태 관리 라이브러리 적용하여 리팩토링 예정 <br/>
[기능 개선사항] 영화 API 연결하여 검색으로 포스터 로딩할 수 있는 기능 추가 고려
<br/><br/>
