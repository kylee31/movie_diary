import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const Button=styled.button`
    float:right;
    width:100px;
    heigth:50px;
    background-color:blue;
    color:white;
`

function Header(){

    const navigate=useNavigate();

    function onClick(){
        navigate(`/add_movie_diary/`);
    }

    return(
        <>
        <h1>🎬영화일기</h1>
        <Button onClick={onClick}>추가</Button>
        </>
    );
}

export default Header;