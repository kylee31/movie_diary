import styled from "styled-components";
import { useLocation } from "react-router";

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

function ShowDiary() {

  const location = useLocation();
  const id = location.state.id;

  const data = JSON.parse(localStorage.getItem("diary")) == null ? [] : JSON.parse(localStorage.getItem("diary"));

  console.log(data[id]);
  const themaImg=data[id].thema.concat("img");

  //localstorage에서 데이터 가져와서 보여주기, 이미지 저장하는 버튼 만들기

  return (
    <Container>
      <AppDiv className={themaImg}>
        <header>
          {data[id].date}
          <button>이미지 저장</button>
          <button>삭제</button>
        </header>
      </AppDiv>
    </Container>
  );
}

export default ShowDiary;