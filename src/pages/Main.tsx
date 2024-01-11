import DiaryList from "../component/DiaryList";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style/pageStyle.scss";

function Main() {
  const navigate = useNavigate();
  function onClick() {
    navigate(`/write_movie_diary/`);
  }

  const [isSort, setIsSort] = useState("write");

  function onSort(e: React.ChangeEvent<HTMLSelectElement>) {
    setIsSort(e.target.value);
  }

  return (
    <div className="mainContainer">
      <div className="mainHead">
        <span id="logo">🎬영화일기</span>
        <select className="optionSelect" value={isSort} onChange={onSort}>
          <option value="write">작성 순</option>
          <option value="date">날짜 순</option>
          <option value="thema">테마 순</option>
        </select>
        <button className="createButton" onClick={onClick}>
          일기 작성
        </button>
      </div>
      <DiaryList isSort={isSort} />
    </div>
  );
}

export default Main;
