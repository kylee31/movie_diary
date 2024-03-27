import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/componentStyle.scss";
import { Link } from "react-router-dom";
import MovieTheater from "./MovieTheater";
import emptyImg from "../db/emptyImg.png";
import { useLayoutEffect } from "react";
import {
  useDiaryDispatchContext,
  useDiaryIdxContext,
  useDiaryValueContext,
} from "../context/DiaryProvider";
import FileResizer from "react-image-file-resizer";

interface isEdit {
  isEdit?: boolean;
  id?: number;
}

function Edit({ isEdit, id }: isEdit) {
  const navigate = useNavigate();
  const nowDate = () => {
    const year = new Date().getFullYear().toString();
    let month: number | string = new Date().getMonth() + 1;
    let day: number | string = new Date().getDate();

    if (month >= 1 && month <= 9) {
      month = "0" + (new Date().getMonth() + 1).toString();
    }
    if (day >= 1 && day <= 9) {
      day = "0" + new Date().getDate();
    }
    return `${year}-${month}-${day}`;
  };

  //const [diary, setDiary] = useState( JSON.parse(`${localStorage.getItem("diary")}`)==null? [] : JSON.parse(`${localStorage.getItem("diary")}`));
  const diary = useDiaryValueContext();
  const idx = useDiaryIdxContext();
  const dispatch = useDiaryDispatchContext();

  const [date, setDay] = useState(nowDate);
  const [thema, setThema] = useState("cgv");
  const [img, setImg] = useState(emptyImg);
  const [seat, setSeat] = useState("");
  const [location, setLocation] = useState("");
  const [room, setRoom] = useState("");
  const [number, setNumber] = useState("");
  const [comment, setComment] = useState("");

  const themaBackground = thema.concat("Background");

  //id를 사용하지 않아도 되는 속성으로 만들기 위해 ?를 붙였고, undefined가 될 수 있어서 오류 발생.
  //아래와 같이 id가 undefiend일 때 0으로 만들어줬다.
  const isId = id !== undefined ? id : 0;

  const diaryItems = {
    idx: isEdit ? diary[isId].idx : idx.current,
    date: date,
    thema: thema,
    img: img,
    seat: seat,
    location: location,
    room: room,
    number: number,
    comment: comment,
  };

  function onSaveSeat(data: string) {
    setSeat(data);
  }
  function onSaveDate(e: React.ChangeEvent<HTMLInputElement>) {
    setDay(e.target.value);
  }
  function onSelectThema(e: React.ChangeEvent<HTMLSelectElement>) {
    setThema(e.target.value);
  }
  function onSaveLocation(e: React.ChangeEvent<HTMLInputElement>) {
    setLocation(e.target.value);
  }
  function onSaveRoom(e: React.ChangeEvent<HTMLInputElement>) {
    setRoom(e.target.value);
  }
  function onSaveNumber(e: React.ChangeEvent<HTMLInputElement>) {
    setNumber(e.target.value);
  }
  function onSaveComment(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setComment(e.target.value);
  }

  async function onImgUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const resizeFile = (file: File) =>
      new Promise((resolve) => {
        FileResizer.imageFileResizer(
          file,
          300,
          420,
          "PNG",
          80,
          0,
          (uri) => {
            resolve(uri);
          },
          "base64"
        );
      });

    const target = e.target;
    const files = (target.files as FileList)[0];
    const newImg = await resizeFile(files);
    setImg(newImg);
  }
  function onRemoveImg() {
    setImg(emptyImg);
  }

  async function onSave() {
    if (window.confirm(`${isEdit ? "수정" : "저장"}하시겠습니까🙂?`)) {
      try {
        if (!isEdit) {
          dispatch({ type: "CREATE", diaryItems });
          idx.current += 1;
          await navigate(`/`);
        } else if (isEdit) {
          dispatch({ type: "EDIT", diaryItems });
          await navigate(`/show_movie_diary/${isId + 1}`);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  //새로고침 시 깜빡임 오류 수정(useEffect에서 useLayoutEffect로)
  useLayoutEffect(() => {
    if (isEdit) {
      async function newDatas() {
        const thisId = id ? id : 0;
        await setDay(diary[thisId].date);
        await setSeat(diary[thisId].seat);
        await setImg(diary[thisId].img);
        await setThema(diary[thisId].thema);
        await setLocation(diary[thisId].location);
        await setRoom(diary[thisId].room);
        await setNumber(diary[thisId].number);
        await setComment(diary[thisId].comment);
      }
      newDatas();
    }
  }, []);

  return (
    <div className={`editContainer ${themaBackground}`}>
      <header id="editHeader">
        <Link to="/" className="editLogo">
          🎬영화일기
        </Link>
        <label className="editLabel">
          {date} <input type="date" value={date} onChange={onSaveDate} />
        </label>
        <select value={thema} onChange={onSelectThema}>
          <option value="cgv">CGV</option>
          <option value="lotte">LotteCinema</option>
          <option value="mega">MEGABOX</option>
          <option value="inde">독립영화관</option>
          <option value="home">HOME</option>
        </select>
        <div className="editButton editBtnPrimary" onClick={onSave}>
          {isEdit ? "수정" : "저장"}
        </div>
      </header>
      <br />
      <div className="editDiv">
        <section>
          <img className="editImg" src={img} alt="" />
          <div className="editImgButton">
            <label>
              <div className="editButton" title="권장 사이즈 600x840 이하">
                포스터 선택
              </div>
              <input
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                onChange={onImgUpload}
              />
            </label>
            <div className="editButton" onClick={onRemoveImg}>
              포스터 삭제
            </div>
          </div>
        </section>
        <section>
          {thema !== "home" && (
            <MovieTheater
              event={true}
              myseat={seat}
              onSeat={onSaveSeat}
              thema={thema}
            />
          )}
          <div className={`editInfo ${thema === "home" && "editHomeInfo"}`}>
            <input
              autoComplete="off"
              type="text"
              value={location}
              name="location"
              size={10}
              placeholder="위치"
              className={thema}
              onChange={onSaveLocation}
            />
            {thema !== "home" && (
              <input
                autoComplete="off"
                type="text"
                value={room}
                name="room"
                size={10}
                placeholder="상영관"
                className={thema}
                onChange={onSaveRoom}
              />
            )}
            {thema !== "home" && (
              <input
                autoComplete="off"
                type="text"
                value={number}
                name="number"
                size={10}
                placeholder="좌석번호"
                className={thema}
                onChange={onSaveNumber}
              />
            )}
          </div>
        </section>
      </div>
      {/*value값을 줘서 max-length가 제대로 작동하지 못함. 임시방편으로 작성시에만 undefined로 수정, 수정기능에서는 다시 고려해야함*/}
      <textarea
        className="editTextArea"
        name="comment"
        value={!isEdit ? undefined : comment}
        maxLength={140}
        onChange={onSaveComment}
      />
      <div className={`editTextNum ${comment.length <= 140 && "textLen"}`}>
        {comment.length}/140
      </div>
    </div>
  );
}

export default Edit;
