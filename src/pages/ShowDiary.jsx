import styled,{css} from "styled-components";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MovieTheater from "../component/MovieTheater";
import html2canvas from "html2canvas";

const Container = styled.div`
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const AppDiv = styled.div`
  width:630px;
  height:480px;
  border-radius:50px;
  background-color:rgb(250,250,250);
  padding:20px;
  overflow:auto;
`;

const Header=styled.header`
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

const Div=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight:900;
  margin-left:14px;
  margin-top:${props=>props.thema==="home"?"30px":0};
  .poster{
    margin-left:${props=>props.thema==="home"?"38px":0};
  }
  img{
    width: 200px;
    height: 280px;
  }
  .date{
    font-size:1.6rem;
    margin-left: 30px;
  }
  .information{
    display: flex;
    justify-content: center;
    margin-left:38px;
    margin-top:5px;
  }
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
`;

const MySpan = styled.span`
  display:flex;
  justify-content:center;
  align-items:center;
  width:110px;
  height:30px;
  text-align:center;
  border-radius:10px;
  margin:3px;
  ${props =>
    props.thema==="home"&&
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

const Slider = styled.span`
  position:absolute;
  font-size:1.8rem;
  cursor:pointer;
  margin-right: ${props=>props.right?"620px":0};
  margin-left: ${props=>props.left?"620px":0};
  visibility:${props=>props.show?"hidden":"visible"};
`;

const SaveButton=styled.div`
  position:absolute;
  margin-bottom:450px;
  margin-left:300px;
`;

function ShowDiary() {
  //슬라이드 버튼 없이 단독 아이템 클릭이 필요했을때 사용한 코드. useParams로 변경
  //const location = useLocation();
  //const id = location.state.id;

  const [id, setId] = useState(useParams().id - 1);

  const navigate = useNavigate();

  const data = JSON.parse(localStorage.getItem("diary")) == null ? [] : JSON.parse(localStorage.getItem("diary"));
  const mydata = data[id];

  //localstorage에서 데이터 삭제
  function onRemove() {
    if (window.confirm("삭제하시겠습니까😮?")) {
      const newdata = data.filter((e, index) => {
        return index !== id
      })
      localStorage.setItem("diary", JSON.stringify(newdata));
      navigate("/");
    }
  }

  function onUpdate(){
    navigate(`/update_movie_diary/${id+1}`);
  }

  function onSave(uri, filename) {
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
      html2canvas(document.getElementById("capture")).then(canvas => {
        onSave(canvas.toDataURL("image/png"), `movie-diary${id + 1}.png`);
      });
    }
  }

  function onPrev() {
    //console.log(id);
    setId(id - 1);
    navigate(`/show_movie_diary/${id}`);
  }

  function onNext() {
    //console.log(id);
    setId(id + 1);
    navigate(`/show_movie_diary/${id + 2}`);
  }

  return (
    <Container>
      <AppDiv id="capture" className={mydata.thema.concat("Background")}>
        <Header>
          <span><Link to="/" className="logo">🎬영화일기</Link></span>
        </Header>
        <Div thema={mydata.thema}>
          <section className="poster">
            <img src={mydata.img} alt="" />
            <div className="date">{mydata.date}</div>
          </section>
          <section>
            {mydata.thema !== "home" && <MovieTheater event={false} myseat={mydata.seat} thema={mydata.thema} />}
            <div className="information">
              <MySpan className={mydata.thema} thema={mydata.thema}>{mydata.location}</MySpan>
              {mydata.thema !== "home" && <MySpan className={mydata.thema}>{mydata.room}</MySpan>}
              {mydata.thema !== "home" && <MySpan className={mydata.thema}>{mydata.number}</MySpan>}
            </div>
          </section>
        </Div>
        <Info>{mydata.comment}</Info>
      </AppDiv>
      <SaveButton>
          <Button onClick={onCapture}>이미지 저장</Button>
          <Button onClick={onUpdate}>수정</Button>
          <Button onClick={onRemove}>삭제</Button>
      </SaveButton>
      <Slider show={id===0} right={true} onClick={onPrev}>◀</Slider>
      <Slider show={id===data.length-1} left={true} onClick={onNext}>▶</Slider>
    </Container>
  );
}

export default ShowDiary;