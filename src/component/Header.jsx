import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Head = styled.div`
    padding:15px;
`;

const Logo = styled.span`
    font-size:1.3rem;
    font-weight:900;
`;

const Button = styled.button`
    float:right;
    width:100px;
    height:30px;
    background-color:black;
    color:white;
    border:0;
    border-radius:10px;
    font-weight:900;
    cursor:pointer;
`

function Header() {

    const navigate = useNavigate();
    function onClick() {
        navigate(`/write_movie_diary/`);
    }

    return (
        <Head>
            <Logo>🎬영화일기</Logo>
            <Button onClick={onClick}>일기 작성</Button>
        </Head>
    );
}

export default Header;