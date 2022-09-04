import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
    float:right;
    width:100px;
    heigth:50px;
    background-color:blue;
    color:white;
`
const Container = styled.div`
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const AppDiv = styled.div`
  width:650px;
  height:500px;
  background-color:lightgrey;
  border-radius:50px;
  padding:20px;
`;

function Header() {

    const navigate = useNavigate();

    function onClick() {
        navigate(`/add_movie_diary/`);
    }

    return (
        <Container>
            <AppDiv>
                <h1>🎬영화일기</h1>
                <Button onClick={onClick}>추가</Button>
            </AppDiv>
        </Container>
    );
}

export default Header;