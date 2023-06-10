import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Loc{
    loc:string
}

interface AppCoverProps{
    //props임을 명시하기 위해 변수명 앞에 $붙이기
    $title:boolean,
    $loc:string
}

function Cover({ loc }:Loc) {

    //커버 이미지 만들기
    const [title, setTitle] = useState(true);
    const [text, setText] = useState("🎬");
    const txt = "영화일기";
    const [count, setCount] = useState(0);
    let num = txt.length;

    useEffect(() => {
        if (count < num) {
            setTimeout(() => {
                setText(text.concat(txt[count]));
                setCount(count + 1);
            }, 200);
        }
        else if(count===num){
            setTimeout(()=>{
                setTitle(false);
            },800)
        }
    }, [count, num, text]);

    return (
        <AppCover $title={title} $loc={loc}>
            <Title>{text}</Title>
        </AppCover>
    );
}

export default Cover;

const AppCover = styled.div<AppCoverProps>`
  position:absolute;
  width:650px;
  height:500px;
  background-color:lightgrey;
  border-radius:50px;
  padding:20px;
  display: ${props => (props.$title === true && props.$loc === "") ? "block" : "none"};
`;

const Title = styled.div`
  text-align: center;
  margin-top: 230px;
  font-weight: 900;
  font-size: 2rem;
`;