import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { Link } from 'react-router-dom';
import MovieTheater from "./MovieTheater";
import emptyImg from "../db/emptyImg.png";
import { useLayoutEffect } from "react";
import { useDiaryDispatchContext, useDiaryIdxContext, useDiaryValueContext } from "../context/DiaryProvider";

interface isEdit{
    isEdit?:boolean,
    id?:number
}

interface ThemaColor{
    $thema:string
}  

interface Buttonprops{
    $primary?:boolean
}

interface TextProps{
    $length:number
}

function Edit({ isEdit, id }:isEdit) {

    const navigate = useNavigate();
    const nowDate = () => {
        const year = new Date().getFullYear().toString();
        let month:number|string = (new Date().getMonth() + 1);
        let day:number|string = new Date().getDate();

        if (month >= 1 && month <= 9) {
            month = "0" + (new Date().getMonth() + 1).toString();
        }
        if (day >= 1 && day <= 9) {
            day = "0" + new Date().getDate();
        }
        return `${year}-${month}-${day}`;
    };

    //const [diary, setDiary] = useState( JSON.parse(`${localStorage.getItem("diary")}`)==null? [] : JSON.parse(`${localStorage.getItem("diary")}`));
    const diary=useDiaryValueContext();
    const idx=useDiaryIdxContext();
    const dispatch=useDiaryDispatchContext();

    const [date, setDay] = useState(nowDate);
    const [thema, setThema] = useState("cgv");
    const [img, setImg] = useState(emptyImg);
    const [seat, setSeat] = useState("");
    const [location, setLocation] = useState("");
    const [room, setRoom] = useState("");
    const [number, setNumber] = useState("");
    const [comment, setComment] = useState("");

    const themaBackground = thema.concat("Background");

    //id를 사용하지 않아도 되는 속성으로 만들기 위해 ?를 붙였고, undefined가 될 수 있어서 오류 발생.
    //아래와 같이 id가 undefiend일 때 0으로 만들어줬다.
    const isId=id!==undefined?id:0;

    const diaryItems = {
        idx:isEdit?diary[isId].idx:idx.current,
        date: date,
        thema: thema,
        img: img,
        seat: seat,
        location: location,
        room: room,
        number: number,
        comment: comment,
    };

    function onSaveSeat(data:string) { setSeat(data); }
    function onSaveDate(e:React.ChangeEvent<HTMLInputElement>) { setDay(e.target.value); }
    function onSelectThema(e:React.ChangeEvent<HTMLSelectElement>) { setThema(e.target.value); }
    function onSaveLocation(e:React.ChangeEvent<HTMLInputElement>) { setLocation(e.target.value); }
    function onSaveRoom(e:React.ChangeEvent<HTMLInputElement>) { setRoom(e.target.value); }
    function onSaveNumber(e:React.ChangeEvent<HTMLInputElement>) { setNumber(e.target.value); }
    function onSaveComment(e:React.ChangeEvent<HTMLTextAreaElement>) { setComment(e.target.value); }

    function onImgUpload(e:React.ChangeEvent<HTMLInputElement>) {
        let reader = new FileReader();
        const target = e.target;
        const files = (target.files as FileList)[0];
        if (files) {
            reader.readAsDataURL(files);
            reader.onload = () => {
                const previewImgUrl= reader.result as string;

                const fackImg = new Image();
                fackImg.src = previewImgUrl;
                //로드되면 실행
                fackImg.onload = () => {
                    const canvas = document.createElement("canvas");
                    let ctx = canvas.getContext("2d");
                    ctx!.drawImage(fackImg, 0, 0);

                    const MAX_WIDTH = 300;
                    const MAX_HEIGHT = 420;
                    let width = fackImg.width;
                    let height = fackImg.height;

                    if (width > 600 && height > 840) {
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

                        ctx!.drawImage(fackImg, 0, 0, canvas.width, canvas.height);

                        const dataurl = canvas.toDataURL("image/png");
                        setImg(dataurl);
                    }
                    else {
                        console.log("바로 여기로")
                        setImg(previewImgUrl);
                    }
                }
            }
            e.target.value = "";
        }
    }
    function onRemoveImg() {
        setImg(emptyImg);
    }

    async function onSave() {
        if (window.confirm(`${isEdit ? "수정" : "저장"}하시겠습니까🙂?`)) {
            try {
                if (!isEdit) {
                    dispatch({type:'CREATE',diaryItems});
                    idx.current+=1;
                    await navigate(`/`);
                }
                else if (isEdit) {
                    dispatch({type:'EDIT',diaryItems});
                    await navigate(`/show_movie_diary/${isId+1}`);
                }
            } catch (e) {
                console.log(e);
            }
        }
    };

    //새로고침 시 깜빡임 오류 수정(useEffect에서 useLayoutEffect로)
    useLayoutEffect(() => {
        if (isEdit) {
            async function newDatas() {
                const thisId=(id)?id:0;
                await setDay(diary[thisId].date);
                await setSeat(diary[thisId].seat);
                await setImg(diary[thisId].img);
                await setThema(diary[thisId].thema);
                await setLocation(diary[thisId].location);
                await setRoom(diary[thisId].room);
                await setNumber(diary[thisId].number);
                await setComment(diary[thisId].comment);
            }
            newDatas();
        }
    }, []);

    return (
        <AppDiv className={themaBackground}>
            <EditHeader>
                <Link to="/" className="logo">🎬영화일기</Link>
                <Label>{date} <input type="date" value={date} onChange={onSaveDate} /></Label>
                <select value={thema} onChange={onSelectThema}>
                    <option value="cgv">CGV</option>
                    <option value="lotte">LotteCinema</option>
                    <option value="mega">MEGABOX</option>
                    <option value="inde">독립영화관</option>
                    <option value="home">HOME</option>
                </select>
                <MyButton onClick={onSave} $primary={true}>{isEdit ? "수정" : "저장"}</MyButton>
            </EditHeader><br />
            <Div>
                <section>
                    <Img src={img} alt="" />
                    <ImgButton>
                        <label>
                            <MyButton title="권장 사이즈 600x840 이하">포스터 선택</MyButton>
                            <input style={{ display: "none" }} type="file" accept="image/*" onChange={onImgUpload} />
                        </label>
                        <MyButton onClick={onRemoveImg}>포스터 삭제</MyButton>
                    </ImgButton>
                </section>
                <section>
                    {thema !== "home" && <MovieTheater event={true} myseat={seat} onSeat={onSaveSeat} thema={thema} />}
                    <Info $thema={thema}>
                        <input autoComplete="off" type="text" value={location} name="location" size={10} placeholder="위치" className={thema} onChange={onSaveLocation} />
                        {thema !== "home" && <input autoComplete="off" type="text" value={room} name="room" size={10} placeholder="상영관" className={thema} onChange={onSaveRoom} />}
                        {thema !== "home" && <input autoComplete="off" type="text" value={number} name="number" size={10} placeholder="좌석번호" className={thema} onChange={onSaveNumber} />}
                    </Info>
                </section>
            </Div>
            {/*value값을 줘서 max-length가 제대로 작동하지 못함. 임시방편으로 작성시에만 undefined로 수정, 수정기능에서는 다시 고려해야함*/}
            <TextArea name="comment" value={!isEdit ? undefined : comment} maxLength={140} onChange={onSaveComment} />
            <TextNum $length={comment.length}>{comment.length}/140</TextNum>
        </AppDiv>
    );
}

export default Edit;

const AppDiv = styled.div`
  width:630px;
  height:480px;
  background-color:rgb(250,250,250);
  border-radius:50px;
  padding:20px;
`;

const EditHeader = styled.header`
    display: flex;
    justify-content: center;
    .logo{
        font-weight:900;
        margin-right:110px;
        margin-left:10px;
        text-decoration: none;
        color:black;
    }
`;

const Label = styled.label`
    font-weight: 900;
    font-size: 1.1rem;
    margin-right:10px;
`

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    margin-left:5px;
`;

const Img = styled.img`
    width:200px;
    height:280px;
`;

const ImgButton = styled.div`
    display:flex;
    flex-direction:row;
    margin-top:10px;
`;

const Info = styled.div<ThemaColor>`
    margin-left:47px;
    margin-top: 10px;
    ${props => props.$thema === "home" && css`
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

const MyButton = styled.div<Buttonprops>`
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
    ${props => props.$primary && css`
        width: 50px;
        margin-left:10px;
    `}
`;

const TextNum = styled.div<TextProps>`
    font-size:0.3rem;
    font-weight:900;
    position:absolute;
    margin-left:575px;
    color:${props => props.$length <= 140 ? "grey" : "red"};
`;