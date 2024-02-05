import { useEffect, useState } from "react";
import "../style/componentStyle.scss";

interface Loc {
  loc: string;
}

function Cover({ loc }: Loc) {
  //커버 이미지 만들기
  const [title, setTitle] = useState(true);
  const [text, setText] = useState("🎬");
  const [count, setCount] = useState(0);

  const txt = "영화일기";
  let num = txt.length;

  useEffect(() => {
    if (count < num) {
      setTimeout(() => {
        setText(text.concat(txt[count]));
        setCount(count + 1);
      }, 200);
    } else if (count === num) {
      setTimeout(() => {
        setTitle(false);
      }, 600);
    }
  }, [count, num, text]);

  return (
    <>
      {title === true && loc === "" ? (
        <div className="appCover">
          <div className="coverTitle">{text}</div>
        </div>
      ) : null}
    </>
  );
}

export default Cover;
