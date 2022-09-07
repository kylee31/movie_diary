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

function DiaryItem({thema,img,date,id}){

    const navigate=useNavigate();

    function onClick(){
        navigate(`/show_diary/${id+1}`,{state:{id:id}});
    }

    return(
        <Item className={thema} onClick={onClick}>
            <img style={{width:"100px",height:"140px",marginRight:"30px"}} src={img} alt=""/>
            {date}
        </Item>
    );
}

export default DiaryItem;