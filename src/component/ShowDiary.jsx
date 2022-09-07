import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MovieTheater from "./MovieTheater";
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

const Info = styled.p`
display:flex;
justify-content:center;
align-items:center;
font-weight:900;
margin:5px auto;
`;

const MySpan = styled.span`
  display:flex;
  justify-content:center;
  align-items:center;
  width:100px;
  height:30px;
  text-align:center;
  border-radius:10px;
  margin:3px;
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
  function removeData() {
    if (window.confirm("삭제하시겠습니까😮?")) {
      const newdata = data.filter((e, index) => {
        return index !== id
      })
      localStorage.setItem("diary", JSON.stringify(newdata));
      navigate("/");
    }
  }

  //html2canvas
  function onCapture() {
    if (window.confirm("이미지를 저장하시겠습니까🙂?")) {
      html2canvas(document.getElementById("capture")).then(canvas => {
        onSave(canvas.toDataURL("image/png"), `movie-diary${id + 1}.png`);
      });
    }
  }

  function onSave(uri, filename) {
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  }

  function onPrev() {
    //navigate로 변경..? 근데 왜 안돼
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
      <AppDiv id="capture" className={mydata.thema.concat("img")}>
        <header style={{ display: "flex", justifyContent: "center", margin: "8px 0" }}>
          <span style={{ fontWeight: "900", marginRight: "300px" }}><Link to="/" style={{ textDecoration: 'none', color: "black" }}>🎬영화일기</Link></span>
          <Button onClick={onCapture}>이미지 저장</Button>
          <Button onClick={removeData}>삭제</Button>
        </header>
        <div style={{ display: "flex", justifyContent: "center",alignItems:"center",fontWeight:"900"}}>
          <section style={{marginLeft:mydata.thema==="home"?"50px":"0"}}>
            <img style={{ width: "200px", height: "280px" }} src={mydata.img} alt="" />
            <div style={{ fontSize: "1.6rem", marginLeft: "25px"}}>{mydata.date}</div>
          </section>
          <section>
            {mydata.thema !== "home" && <MovieTheater event={false} myseat={mydata.seat} thema={mydata.thema} />}
            <div style={{ display: "flex", justifyContent: "center",marginLeft:"50px",marginTop:"5px"}}>
              <MySpan className={mydata.thema} 
              style={{position:mydata.thema==="home"?"absolute":"",marginTop:mydata.thema==="home"?"120px":"",marginLeft:mydata.thema==="home"?"200px":""}}>{mydata.location}</MySpan>
              {mydata.thema !== "home" && <MySpan className={mydata.thema}>{mydata.room}</MySpan>}
              {mydata.thema !== "home" && <MySpan className={mydata.thema}>{mydata.number}</MySpan>}
            </div>
          </section>
        </div>
        <Info style={{ width: "580px", height: "75px", borderRadius: "10px", border: "2px solid lightgrey",padding:"10px"}}>
          {mydata.comment}
        </Info>
      </AppDiv>
      <Slider style={{ marginRight: "620px", visibility: id === 0 ? "hidden" : "visible" }} onClick={onPrev}>◀</Slider>
      <Slider style={{ marginLeft: "620px", visibility: id === data.length - 1 ? "hidden" : "visible" }} onClick={onNext}>▶</Slider>
    </Container>
  );
}

export default ShowDiary;