import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Theme, ThemeColorType, themeColor } from "../styled/theme";

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
    <Item $theme={thema} onClick={onClick}>
      <Img src={img} alt="" />
      <div>{date}</div>
    </Item>
  );
}

export default DiaryItem;

const Item = styled.div<Theme>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 270px;
  height: 180px;
  border-radius: 15px;
  margin: 20px;
  color: white;
  font-weight: 900;
  cursor: pointer;
  background-color: ${(props) =>
    themeColor[props.$theme as keyof ThemeColorType]};
  font-weight: 900;
`;

const Img = styled.img`
  width: 100px;
  height: 140px;
  margin-right: 30px;
`;
