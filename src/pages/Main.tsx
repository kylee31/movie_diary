import styled from "styled-components";
import DiaryList from "../component/DiaryList";
import { useNavigate } from "react-router-dom";
import {useState} from "react";

function Main() {

  const navigate = useNavigate();
  function onClick() {
    navigate(`/write_movie_diary/`);
  }

  const [isSort,setIsSort]=useState("write");

  function onSort(e:React.ChangeEvent<HTMLSelectElement>){
    setIsSort(e.target.value);
  }

  return (
    <AppDiv>
      <Head>
        <Logo>🎬영화일기</Logo>
        <Select value={isSort} onChange={onSort}>
          <option value="write">작성 순</option>
          <option value="date">날짜 순</option>
          <option value="thema">테마 순</option>
        </Select>
        <Button onClick={onClick}>일기 작성</Button>
      </Head>
      <DiaryList isSort={isSort}/>
    </AppDiv>
  );
}

export default Main;

const AppDiv = styled.div`
  width:650px;
  height:500px;
  box-shadow: 0 0 0 2px lightgrey inset;
  border-radius:50px;
  padding:20px;
`;

const Head = styled.div`
    padding:15px;
`;

const Logo = styled.span`
    font-size:1.3rem;
    font-weight:900;
`;

const Select=styled.select`
    float:right;
    height:30px;
    margin-left:10px;
`

const Button = styled.button`
    float:right;
    width:100px;
    height:30px;
    background-color:black;
    color:white;
    border:0;
    border-radius:10px;
    font-weight:900;
    cursor:pointer;
`