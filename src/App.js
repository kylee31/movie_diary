import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import WriteDiary from './pages/WriteDiary';
import ShowDiary from './pages/ShowDiary';
import EditDiary from './pages/EditDiary';
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

const Title = styled.div`
text-align: center;
margin-top: 230px;
font-weight: 900;
font-size: 2rem;
`;

function App() {

  //커버이미지 만들기
  const [title, setTitle] = useState(false);
  function onClick() {
    setTitle(true);
  }

  const loc = window.location.pathname;

  return (
    <>
      <Container>
        <Cover onClick={onClick} style={{ display: (title === false && loc === "/") ? "block" : "none" }}>
          <Title>🎬영화일기</Title>
        </Cover>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<MainPage />} />
            <Route path="/write_movie_diary/" element={<WriteDiary />} />
            <Route path="/show_movie_diary/:id" element={<ShowDiary />} />
            <Route path="/update_movie_diary/:id" element={<EditDiary />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;