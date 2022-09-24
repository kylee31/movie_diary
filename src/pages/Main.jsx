import styled from "styled-components";
import DiaryList from "../component/DiaryList";
import Header from "../component/Header";

const AppDiv = styled.div`
  width:650px;
  height:500px;
  box-shadow: 0 0 0 2px lightgrey inset;
  border-radius:50px;
  padding:20px;
`;

function Main() {
  return (
    <>
      <AppDiv>
        <Header />
        <DiaryList />
      </AppDiv>
    </>
  );
}

export default Main;