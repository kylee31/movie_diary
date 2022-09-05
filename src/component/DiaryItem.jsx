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
`

function DiaryItem({thema,img,date,id}){

    const navigate=useNavigate();

    function onClick(){
        navigate(`/show_diary/${id}`,{state:{id:id}});
    }

    return(
        <Item className={thema} onClick={onClick}>
            <img style={{width:"100px",height:"140px",marginRight:"20px"}} src={img} alt=""/>
            {date}
        </Item>
    );
}

export default DiaryItem;