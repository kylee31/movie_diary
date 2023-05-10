import { HashRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Main from './pages/Main';
import WriteDiary from './pages/WriteDiary';
import ShowDiary from './pages/ShowDiary';
import EditDiary from './pages/EditDiary';
import Cover from './component/Cover';

const Container = styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  justify-content:center;
  align-items:center;
`;

function App() {

  const loc = window.location.hash;

  return (
    <>
      <Container>
        <Cover loc={loc} />
        <HashRouter>
          <Routes>
            <Route index path="/" element={<Main />} />
            <Route path="/write_movie_diary/" element={<WriteDiary />} />
            <Route path="/show_movie_diary/:id" element={<ShowDiary />} />
            <Route path="/update_movie_diary/:id" element={<EditDiary />} />
          </Routes>
        </HashRouter>
      </Container>
    </>
  );
}

export default App;