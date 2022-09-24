import styled from "styled-components";
import DiaryItem from "./DiaryItem";

const Box = styled.div`
  display:flex;
  flex-flow:row wrap;
  width:650px;
  height:420px;
  overflow:auto;
  margin-left:15px;
`;

function DiaryList() {

    //localstorage아이템 불러오기
    const data = JSON.parse(localStorage.getItem("diary")) == null ? [] : JSON.parse(localStorage.getItem("diary"));

    return (
        <Box className="box">
            {data.map((item, index) => {
                return <DiaryItem key={index} id={index} thema={item.thema} img={item.img} date={item.date} />
            })}
        </Box>
    );
}

export default DiaryList;