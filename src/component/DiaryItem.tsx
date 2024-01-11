import { useNavigate } from "react-router-dom";
import "../style/themaStyle.scss";
import "../style/componentStyle.scss";

interface items {
  id: number;
  thema: string;
  img: string;
  date: string;
}

function DiaryItem({ id, thema, img, date }: items) {
  const navigate = useNavigate();
  async function onClick() {
    try {
      await navigate(`/show_movie_diary/${id + 1}`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={`diaryItem ${thema}`} onClick={onClick}>
      <img id="diaryImg" src={img} alt="" />
      <div>{date}</div>
    </div>
  );
}

export default DiaryItem;
