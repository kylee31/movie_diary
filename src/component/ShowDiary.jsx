import styled from "styled-components";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import MovieTheater from "./MovieTheater";

const Container = styled.div`
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const AppDiv = styled.div`
  width:650px;
  height:500px;
  border-radius:50px;
  padding:20px;
  overflow:auto;
`;

const Info = styled.div`
display:flex;
justify-content:center;
align-items:center;
font-weight:900;
margin:5px auto;
`

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
`;

function ShowDiary() {

  const location = useLocation();
  const id = location.state.id;

  const navigate = useNavigate();

  const data = JSON.parse(localStorage.getItem("diary")) == null ? [] : JSON.parse(localStorage.getItem("diary"));
  const mydata = data[id];

  const themaImg = data[id].thema.concat("img");

  //localstorage에서 데이터 가져와서 보여주기, 이미지 저장하는 버튼 만들기
  function removeData() {
    if (window.confirm("삭제하시겠습니까😮?")) {
      const newdata = data.filter((e, index) => {
        return index !== id
      })
      localStorage.setItem("diary", JSON.stringify(newdata));
      navigate("/");
    }
  }

  return (
    <Container>
      <AppDiv className={themaImg}>
        <header style={{ display: "flex", justifyContent: "center", margin: "15px 0" }}>
          <span style={{ fontWeight: "900", marginRight: "300px" }}><Link to="/" style={{ textDecoration: 'none', color: "black" }}>🎬영화일기</Link></span>
          <Button>이미지 저장</Button>
          <Button onClick={removeData}>삭제</Button>
        </header>
        <section style={{ display: "flex", justifyContent: "center" }}>
          <img style={{ width: "200px", height: "280px" }} src={mydata.img} alt="" />
          {mydata.thema !== "home" && <MovieTheater myseat={mydata.seat} thema={mydata.thema} />}
        </section>
        <Info>
          <span style={{ fontSize: "1.6rem", marginRight: "50px" }}>{mydata.date}</span>
          <MySpan className={mydata.thema}>{mydata.location}</MySpan>
          {mydata.thema !== "home" && <MySpan className={mydata.thema}>{mydata.room}</MySpan>}
          {mydata.thema !== "home" && <MySpan className={mydata.thema}>{mydata.number}</MySpan>}
        </Info>
        <Info style={{ width: "600px", height: "100px", borderRadius: "10px", border: "2px solid lightgrey" }}>
          {mydata.comment}
        </Info>
      </AppDiv>
    </Container>
  );
}

export default ShowDiary;