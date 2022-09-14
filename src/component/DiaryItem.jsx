import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Item=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:270px;
    height:180px;
    border-radius:15px;
    margin:20px;
    color:white;
    font-weight:900;
    cursor:pointer;
`

const Img=styled.img`
    width:100px;
    height:140px;
    margin-right:30px;
`

function DiaryItem({id,thema,img,date}){

    const navigate=useNavigate();

    function onClick(){
        navigate(`/show_movie_diary/${id+1}`);
    }

    return(
        <Item className={thema} onClick={onClick}>
            <Img src={img} alt=""/>
            {date}
        </Item>
    );
}

export default DiaryItem;