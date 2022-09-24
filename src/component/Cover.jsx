import { useEffect, useState } from 'react';
import styled from 'styled-components';

const AppCover = styled.div`
  position:absolute;
  width:650px;
  height:500px;
  background-color:lightgrey;
  border-radius:50px;
  padding:20px;
  cursor:pointer;
  display: ${props => (props.$title === true && props.$loc === "/") ? "block" : "none"};
`;

const Title = styled.div`
  text-align: center;
  margin-top: 230px;
  font-weight: 900;
  font-size: 2rem;
`;

function Cover({ loc }) {

    //커버 이미지 만들기
    const [title, setTitle] = useState(true);
    const [text, setText] = useState("🎬");
    const txt = "영화일기";
    const [count, setCount] = useState(0);
    let num = txt.length;

    function onClick() {
        setTitle(false);
    }

    useEffect(() => {
        if (count < num) {
            setTimeout(() => {
                setText(text.concat(txt[count]));
                setCount(count + 1);
            }, 200);
        }
    }, [count, num, text]);

    return (
        <AppCover onClick={onClick} $title={title} $loc={loc}>
            <Title>{text}</Title>
        </AppCover>
    );
}

export default Cover;