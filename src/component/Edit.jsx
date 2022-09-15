import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import styled, { css } from "styled-components";
import MovieTheater from "../component/MovieTheater";
import img1 from "../db/img1.png";

const AppDiv = styled.div`
  width:630px;
  height:480px;
  background-color:rgb(250,250,250);
  border-radius:50px;
  padding:20px;
`;

const Header = styled.header`
    display: flex;
    justify-content: center;
    .logo{
        font-weight:900;
        margin-right:110px;
        margin-left:10px;
        text-decoration: none;
        color:black;
    }
    label{
        font-weight: 900;
        font-size: 1.1rem;
        margin-right:10px;
    }
`;

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    margin-left:5px;
    img{
        width: 200px;
        height:280px;
    }
    .imgButton{
        display:flex;
        flex-direction:row;
        margin-top:10px;
    }
`;

const Info = styled.div`
    margin-left:47px;
    margin-top: 10px;
    ${props => props.thema === "home" && css`
        position:absolute;
        margin-top:132px;
        margin-left:80px;
    `}
`;

const TextArea = styled.textarea`
    display:flex;
    margin:auto;
    width: 600px;
    height: 80px;
    border: 2px solid lightgrey;
    resize: none;
    font-family:Arial;
    border-radius:10px;
    margin-top:10px;
`;

const MyButton = styled.div`
    text-align:center;
    background-color:black;
    color:white;
    font-weight:900;
    width:95px;
    height:30px;
    border-radius:10px;
    cursor:pointer;    
    font-size:0.8rem;
    display : flex;
    justify-content : center;
    align-items : center;
    margin-right:10px;
    ${props => props.primary && css`
        width: 50px;
        margin-left:10px;
    `}
`;

const TextNum = styled.div`
    font-size:5px;
    font-weight:900;
    position:absolute;
    margin-left:575px;
    color:${props => props.length <= 140 ? "grey" : "red"};
`;


function Edit({ isEdit, id }) {

    const navigate = useNavigate();

    const [diary, setDiary] = useState(JSON.parse(localStorage.getItem("diary")) == null ? [] : JSON.parse(localStorage.getItem("diary")));
    const [date, setDay] = useState("0000-00-00");
    const [thema, setThema] = useState("cgv");
    const [img, setImg] = useState(img1);
    const [seat, setSeat] = useState("");
    const [location, setLocation] = useState("");
    const [room, setRoom] = useState("");
    const [number, setNumber] = useState("");
    const [comment, setComment] = useState("");

    const themaBackground = thema.concat("Background");

    const mydiary = {
        date: date,
        thema: thema,
        img: img,
        seat: seat,
        location: location,
        room: room,
        number: number,
        comment: comment,
    };

    function saveSeat(data) { setSeat(data); }
    function saveDate(e) { setDay(e.target.value); }
    function selectThema(e) { setThema(e.target.value); }
    function saveLocation(e) { setLocation(e.target.value); }
    function saveRoom(e) { setRoom(e.target.value); }
    function saveNumber(e) { setNumber(e.target.value); }
    function saveComment(e) { setComment(e.target.value); }

    function onImgUpload(e) {
        let reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = () => {
            const previewImgUrl = reader.result;

            const img = document.createElement("img");
            img.src = previewImgUrl;

            const canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            const MAX_WIDTH = 300;
            const MAX_HEIGHT = 360;
            let width = img.width;
            let height = img.height;

            if (width > 800 && height > 960) {
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;

                // canvas에 변경된 크기의 이미지를 다시 그려줍니다. 
                ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                const dataurl = canvas.toDataURL("image/png");
                //console.log(dataurl); 
                setImg(dataurl);
            }
            else {
                setImg(previewImgUrl);
            }
        }
    }
    function onRemoveImg() {
        setImg(img1);
    }

    async function onSave() {
        if (date === "0000-00-00") {
            alert("날짜를 기입해주세요😅");
        }
        else {
            if (window.confirm(`${isEdit ? "수정" : "저장"}하시겠습니까🙂?`)) {
                try {
                    if (!isEdit) { (diary == null) ? await setDiary([mydiary]) : await setDiary([mydiary, ...diary]); }
                    else if (isEdit) {
                        await setDiary([mydiary, ...diary.filter((item, index) => index !== id)]);
                        //console.log(diary);
                    }
                    await navigate(`/`);
                } catch (e) {
                    console.log(e);
                }
            }
        }
    };



    useEffect(() => {
        if (isEdit) {
            async function newDatas() {
                await setDay(diary[id].date);
                await setSeat(diary[id].seat);
                await setImg(diary[id].img);
                await setThema(diary[id].thema);
                await setLocation(diary[id].location);
                await setRoom(diary[id].room);
                await setNumber(diary[id].number);
                await setComment(diary[id].comment);
            }
            newDatas();
        }
        localStorage.setItem("diary", JSON.stringify(diary));
    }, [isEdit, diary, id]);

    return (
        <AppDiv className={themaBackground}>
            <Header>
                <span><Link to="/" className="logo">🎬영화일기</Link></span>
                <label>{date} <input type="date" value={date} onChange={saveDate} /></label>
                <select value={thema} onChange={selectThema}>
                    <option value="cgv">CGV</option>
                    <option value="lotte">LotteCinema</option>
                    <option value="mega">MEGABOX</option>
                    <option value="inde">독립영화관</option>
                    <option value="home">HOME</option>
                </select>
                <MyButton onClick={onSave} primary={true}>{isEdit ? "수정" : "저장"}</MyButton>
            </Header><br />
            <Div>
                <section>
                    <img src={img} alt="" />
                    <div className="imgButton">
                        <label>
                            <MyButton title="권장 사이즈 800x960 이하">포스터 선택</MyButton>
                            <input style={{ display: "none" }} type="file" accept="image/*" onChange={onImgUpload} />
                        </label>
                        <MyButton onClick={onRemoveImg}>포스터 삭제</MyButton>
                    </div>
                </section>
                <section>
                    {thema !== "home" && <MovieTheater event={true} myseat={seat} onSeat={saveSeat} thema={thema} />}
                    <Info thema={thema}>
                        <input autoComplete="off" type="text" value={location} name="location" size="10" placeholder="장소" className={thema} onChange={saveLocation} />
                        {thema !== "home" && <input autoComplete="off" type="text" value={room} name="room" size="10" placeholder="영화관" className={thema} onChange={saveRoom} />}
                        {thema !== "home" && <input autoComplete="off" type="text" value={number} name="number" size="10" placeholder="좌석번호" className={thema} onChange={saveNumber} />}
                    </Info>
                </section>
            </Div>
            <TextArea name="comment" value={comment} maxLength="140" onChange={saveComment} />
            <TextNum length={comment.length}>{comment.length}/140</TextNum>
        </AppDiv>
    );
}

export default Edit;