import styled from "styled-components";
import DiaryItem from "./DiaryItem";
import { useDiaryValueContext } from "../context/DiaryProvider";

function DiaryList({isSort}:{isSort:string}) {
    //localstorage아이템 불러오기
    //const data = JSON.parse(`${localStorage.getItem("diary")}`)==null? [] : JSON.parse(`${localStorage.getItem("diary")}`);
    const data =useDiaryValueContext();

    //sort에 따라서 데이터 순서변경
    //localStorage setItem에 따라서 오래된 순으로 선택 후 일기작성 시 순서 변경됨 
    //sortData에 따라 값이 변경되지만 localstorage에 저장되지 않고 dispatch시에 localstorage setItem으로 저장된다
    //create에서 newState=[action.diaryItems,...state];로 생성되는 새로운 값을 맨 앞에 저장했기 때문에 오류 발생 x
    const sortData=(isSort==="new")?data.sort((a,b)=>b.idx-a.idx):data.sort((a,b)=>a.idx-b.idx);
    
    return (
        <Box className="box">
            {sortData.map((item, index:number) => {
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