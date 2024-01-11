import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MovieTheater from "./MovieTheater";
import html2canvas from "html2canvas";
import {
  useDiaryDispatchContext,
  useDiaryValueContext,
} from "../context/DiaryProvider";

function Show() {
  //슬라이드 버튼 없이 단독 아이템 클릭이 필요했을때 사용한 코드. useParams로 변경
  //const location = useLocation();
  //const id = location.state.id;

  //useParams와 슬라이드 버튼을 활용하면 sort마다 데이터 순서변경이 일어나므로
  //localstorage에 업데이트(dispatch sort)해줘야 슬라이드 기능이 잘 동작함
  //다른 방법이 없나?
  const thisId = useParams() as { id: string };
  const diaryId = parseInt(thisId.id) - 1;
  const [id, setId] = useState(diaryId);

  const navigate = useNavigate();

  //const data = JSON.parse(`${localStorage.getItem("diary")}`) == null ? [] : JSON.parse(`${localStorage.getItem("diary")}`);
  const diary = useDiaryValueContext();
  const dispatch = useDiaryDispatchContext();

  const mydata = diary[id];

  const themaBackground = mydata.thema.concat("Background");

  function onUpdate() {
    navigate(`/update_movie_diary/${id + 1}`);
  }

  function onRemove() {
    if (window.confirm("삭제하시겠습니까😮?")) {
      const idx = mydata.idx;
      dispatch({ type: "DELETE", idx });
      navigate("/");
    }
  }

  function onSave(uri: string, filename: string) {
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  }
  //html2canvas
  function onCapture() {
    if (window.confirm("일기를 저장하시겠습니까🙂?")) {
      html2canvas(document.getElementById("capture") as HTMLElement).then(
        (canvas) => {
          onSave(canvas.toDataURL("image/png"), `movie-diary${id + 1}.png`);
        }
      );
    }
  }

  //현재 params는 id+1이므로
  function onPrev() {
    setId(id - 1);
    navigate(`/show_movie_diary/${id}`);
  }

  function onNext() {
    setId(id + 1);
    navigate(`/show_movie_diary/${id + 2}`);
  }

  return (
    <>
      <div id="capture" className={`showContainer ${themaBackground}`}>
        <header id="showHeader">
          <Link to="/" className="showLogo">
            🎬영화일기
          </Link>
        </header>
        <div
          className={`showDiv ${mydata.thema === "home" && "showDivMargin"}`}
        >
          <section
            className={`showPoster ${
              mydata.thema === "home" && "showPosterMargin"
            }`}
          >
            <img src={mydata.img} alt="" />
            <div className="date">{mydata.date}</div>
          </section>
          <section>
            {mydata.thema !== "home" && (
              <MovieTheater
                event={false}
                myseat={mydata.seat}
                thema={mydata.thema}
              />
            )}
            <div className="showInfo">
              <span
                className={`showInfoSpan ${
                  mydata.thema === "home" ? "showHomeSpan" : null
                } ${mydata.thema}`}
              >
                {mydata.location}
              </span>
              {mydata.thema !== "home" && (
                <span className={`showInfoSpan ${mydata.thema}`}>
                  {mydata.room}
                </span>
              )}
              {mydata.thema !== "home" && (
                <span className={`showInfoSpan ${mydata.thema}`}>
                  {mydata.number}
                </span>
              )}
            </div>
          </section>
        </div>
        <div className="showInfoText">{mydata.comment}</div>
      </div>
      <div className="showSaveButton">
        <button className="showButton" onClick={onCapture}>
          이미지 저장
        </button>
        <button className="showButton" onClick={onUpdate}>
          수정
        </button>
        <button className="showButton" onClick={onRemove}>
          삭제
        </button>
      </div>
      <span
        className={`showSlider right ${id === 0 && "btnShow"}`}
        onClick={onPrev}
      >
        ◀
      </span>
      <span
        className={`showSlider left ${id === diary.length - 1 && "btnShow"}`}
        onClick={onNext}
      >
        ▶
      </span>
    </>
  );
}

export default Show;
