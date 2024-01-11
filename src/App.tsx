import { HashRouter, Routes, Route } from "react-router-dom";
import "./style/componentStyle.scss";
import Main from "./pages/Main";
import WriteDiary from "./pages/WriteDiary";
import ShowDiary from "./pages/ShowDiary";
import EditDiary from "./pages/EditDiary";
import Cover from "./component/Cover";

function App() {
  const loc = window.location.hash;

  return (
    <div className="appContainer">
      <Cover loc={loc} />
      <HashRouter>
        <Routes>
          <Route index path="/" element={<Main />} />
          <Route path="/write_movie_diary" element={<WriteDiary />} />
          <Route path="/show_movie_diary/:id" element={<ShowDiary />} />
          <Route path="/update_movie_diary/:id" element={<EditDiary />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
