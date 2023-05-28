import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import MovieTheater from "./MovieTheater";
import html2canvas from "html2canvas";
import { useDiaryDispatchContext, useDiaryValueContext } from "../context/DiaryProvider";

interface ThemaColor{
  $thema?:string
}

interface SliderProps{
  $right?:boolean,
  $left?:boolean,
  $show:boolean
}

function Show() {
  //슬라이드 버튼 없이 단독 아이템 클릭이 필요했을때 사용한 코드. useParams로 변경
  //const location = useLocation();
  //const id = location.state.id;

  //useParams와 슬라이드 버튼을 활용하면 sort마다 데이터 순서변경이 일어나므로 
  //localstorage에 업데이트(dispatch sort)해줘야 슬라이드 기능이 잘 동작함
  //다른 방법이 없나?
  const thisId=useParams() as {id:string};
  const diaryId = parseInt(thisId.id) - 1;
  const [id, setId] = useState(diaryId);

  const navigate = useNavigate();

  //const data = JSON.parse(`${localStorage.getItem("diary")}`) == null ? [] : JSON.parse(`${localStorage.getItem("diary")}`);
  const diary=useDiaryValueContext();
  const dispatch=useDiaryDispatchContext();

  const mydata = diary[id];

  function onUpdate() {
    navigate(`/update_movie_diary/${id + 1}`);
  }

  function onRemove() {
    if (window.confirm("삭제하시겠습니까😮?")) {
      const idx=mydata.idx;
      dispatch({type:'DELETE',idx});
      navigate("/");
    }
  }

  function onSave(uri:string, filename:string) {
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
      html2canvas(document.getElementById("capture") as HTMLElement).then(canvas => {
        onSave(canvas.toDataURL("image/png"), `movie-diary${id + 1}.png`);
      });
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
      <AppDiv id="capture" className={mydata.thema.concat("Background")}>
        <ShowHeader>
          <Link to="/" className="logo">🎬영화일기</Link>
        </ShowHeader>
        <Div $thema={mydata.thema}>
          <Poster $thema={mydata.thema}>
            <img src={mydata.img} alt="" />
            <div className="date">{mydata.date}</div>
          </Poster>
          <section>
            {mydata.thema !== "home" && <MovieTheater event={false} myseat={mydata.seat} thema={mydata.thema} />}
            <Information>
              <MySpan className={mydata.thema} $thema={mydata.thema}>{mydata.location}</MySpan>
              {mydata.thema !== "home" && <MySpan className={mydata.thema}>{mydata.room}</MySpan>}
              {mydata.thema !== "home" && <MySpan className={mydata.thema}>{mydata.number}</MySpan>}
            </Information>
          </section>
        </Div>
        <Info>{mydata.comment}</Info>
      </AppDiv>
      <SaveButton>
        <Button onClick={onCapture}>이미지 저장</Button>
        <Button onClick={onUpdate}>수정</Button>
        <Button onClick={onRemove}>삭제</Button>
      </SaveButton>
      <Slider $show={id === 0} $right={true} onClick={onPrev}>◀</Slider>
      <Slider $show={id === diary.length - 1} $left={true} onClick={onNext}>▶</Slider>
    </>
  );
}

export default Show;

const AppDiv = styled.div`
  width:630px;
  height:480px;
  border-radius:50px;
  background-color:rgb(250,250,250);
  padding:20px;
  overflow:auto;
`;

const ShowHeader = styled.header`
  display: flex;
  justify-content: center;
  margin-bottom:25px;
  .logo{
    font-weight: 900;
    margin-right: 485px;
    text-decoration: none;
    color: black;
  }
`;

const Div = styled.div<ThemaColor>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight:900;
  margin-left:14px;
  margin-top:${props => props.$thema === "home" ? "30px" : 0};
`;

const Poster = styled.section<ThemaColor>`
  margin-left:${props => props.$thema === "home" ? "38px" : 0};
  img{
    width: 200px;
    height: 280px;
  }
  .date{
    font-size:1.6rem;
    margin-left: 30px;
  }
`;

const Information = styled.div`
  display: flex;
  justify-content: center;
  margin-left:38px;
  margin-top:5px;
`;

const Info = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  font-weight:900;
  margin:5px auto;
  width: 580px;
  height: 75px;
  border-radius: 10px;
  border: 2px solid lightgrey;
  padding:10px;
  word-break:break-all;
`;

const MySpan = styled.span<ThemaColor>`
  display:flex;
  justify-content:center;
  align-items:center;
  width:110px;
  height:30px;
  text-align:center;
  border-radius:10px;
  margin:3px;
  ${props =>
    props.$thema === "home" &&
    css`
      position:absolute;
      margin-top:125px;
      margin-left:200px;
    `}
`;

const Button = styled.button`
  text-align:center;
  background-color:black;
  color:white;
  font-weight:900;
  width:80px;
  height:30px;
  border-radius:10px;
  border:0;
  margin-left:10px;
  cursor:pointer;
`;

const SaveButton = styled.div`
  position:absolute;
  margin-bottom:450px;
  margin-left:300px;
`;

const Slider = styled.span<SliderProps>`
  position:absolute;
  font-size:1.8rem;
  cursor:pointer;
  margin-right: ${props => props.$right ? "620px" : 0};
  margin-left: ${props => props.$left ? "620px" : 0};
  visibility:${props => props.$show ? "hidden" : "visible"};
`;
