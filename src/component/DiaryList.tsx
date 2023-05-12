import styled from "styled-components";
import DiaryItem from "./DiaryItem";

interface DataInfo{
    thema:string,
    img:string,
    date:string
}

function DiaryList() {
    //localstorage아이템 불러오기
    const data = JSON.parse(localStorage.getItem("diary")||"{}") == null ? [] : JSON.parse(localStorage.getItem("diary")||"{}");

    return (
        <Box className="box">
            {data.map((item:DataInfo, index:number) => {
                return <DiaryItem key={index} id={index} thema={item.thema} img={item.img} date={item.date} />
            })}
        </Box>
    );
}

export default DiaryList;

const Box = styled.div`
  display:flex;
  flex-flow:row wrap;
  width:650px;
  height:420px;
  overflow:auto;
  margin-left:15px;
`;