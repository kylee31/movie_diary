import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './component/MainPage';
import MovieDiary from './component/MovieDiary';
import ShowDiary from './component/ShowDiary';
import styled from 'styled-components';
import { useState } from 'react';

const Container = styled.div`
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const Cover = styled.div`
position:absolute;
width:650px;
height:500px;
background-color:lightgrey;
border-radius:50px;
padding:20px;
`;

function App() {

  //커버이미지 만들기
  const [title, setTitle] = useState(false);
  function onClick() {
    setTitle(true);
  }

  const loc=window.location.pathname;

  return (
    <>
      <Container>
        <Cover onClick={onClick} style={{ display: (title === false && loc==="/") ? "block" : "none" }}>
          <div style={{textAlign:"center",marginTop:"230px",fontWeight:"900",fontSize:"2rem"}}>🎬영화일기</div>
        </Cover>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<MainPage/>} />
            <Route path="/add_movie_diary" element={<MovieDiary />} />
            <Route path="/show_diary/:id" element={<ShowDiary />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
