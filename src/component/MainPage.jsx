import styled from "styled-components";
import DiaryItem from "./DiaryItem";
import Header from "./Header";

const Container = styled.div`
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const AppDiv = styled.div`
  width:650px;
  height:500px;
  box-shadow: 0 0 0 2px lightgrey inset;
  border-radius:50px;
  padding:20px;
`;

const Box = styled.div`
  display:flex;
  flex-flow:row wrap;
  width:650px;
  height:420px;
  overflow:auto;
  margin-left:15px;
`;

function MainPage() {

  //localstorage아이템 불러오기
  const data = JSON.parse(localStorage.getItem("diary")) == null ? [] : JSON.parse(localStorage.getItem("diary"));

  return (
    <>
      <Container>
        <AppDiv>
          <Header />
          <Box className="box">
            {data.map((item, index) => {
              return <DiaryItem id={index} key={index} thema={item.thema} img={item.img} date={item.date} />
            })}
          </Box>
        </AppDiv>
      </Container>
    </>
  );
}

export default MainPage;