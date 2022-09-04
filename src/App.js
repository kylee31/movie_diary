import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './component/Header';
import MovieDiary from './component/MovieDiary';

const Container = styled.div`
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const AppDiv = styled.div`
  width:650px;
  height:500px;
  background-color:lightgrey;
  border-radius:50px;
  padding:20px;
`;

function App() {
  return (
    <BrowserRouter>
      <Container>
        <AppDiv>
          <Routes>
            <Route index path="/" element={<Header/>}/>
            <Route path="/add_movie_diary" element={<MovieDiary/>}/>
          </Routes>
        </AppDiv>
      </Container>
    </BrowserRouter>
  );
}

export default App;
