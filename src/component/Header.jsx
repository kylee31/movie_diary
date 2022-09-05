import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
    float:right;
    width:100px;
    height:30px;
    background-color:blue;
    color:white;
    border:0;
    border-radius:10px;
    font-weight:900;
`

function Header() {

    const navigate = useNavigate();

    function onClick() {
        navigate(`/add_movie_diary/`);
    }

    return (
        <div style={{padding:"15px"}}>
            <span style={{fontSize:"1.3rem",fontWeight:"900"}}>🎬영화일기</span>
            <Button onClick={onClick}>일기 작성</Button>
        </div>
    );
}

export default Header;