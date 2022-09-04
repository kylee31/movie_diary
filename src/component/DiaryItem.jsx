import styled from "styled-components";

const Item=styled.div`
    background-color:aliceblue;
    width:100px;
    height:50px;
`

function DiaryItem(){
    return(
        <Item>안녕하세요</Item>
    );
}

export default DiaryItem;