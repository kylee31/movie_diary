import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './component/MainPage';
import MovieDiary from './component/MovieDiary';
import ShowDiary from './component/ShowDiary';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<MainPage />} />
        <Route path="/add_movie_diary" element={<MovieDiary />} />
        <Route path="/show_diary/:id" element={<ShowDiary/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
