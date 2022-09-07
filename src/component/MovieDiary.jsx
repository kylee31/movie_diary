import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import MovieTheater from "./MovieTheater";
import img1 from "../db/img1.png";

const TextArea = styled.textarea`
    display:flex;
    margin:auto;
    width: 600px;
    height: 80px;
    border: 2px solid lightgrey;
    resize: none;
    font-family:Arial;
    border-radius:10px;
`;

const Container = styled.div`
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const AppDiv = styled.div`
  width:630px;
  height:480px;
  background-color:rgb(250,250,250);
  border-radius:50px;
  padding:20px;
`;

const MyButton = styled.div`
    font-size:0.8rem;
    text-align:center;
    background-color:black;
    color:white;
    font-weight:900;
    width:100px;
    height:30px;
    border-radius:10px;
  display : flex;
  justify-content : center;
  align-items : center;
   margin-right:5px;
`;

const Button = styled.button`
    text-align:center;
    background-color:black;
    color:white;
    font-weight:900;
    width:100px;
    height:30px;
    border-radius:10px;
    border:0;
`;

function MovieDiary() {

    const navigate = useNavigate();

    const [day, setDay] = useState("0000-00-00");
    const [thema, setThema] = useState("cgv");
    const [img, setImg] = useState(img1);
    const [comment, setComment] = useState("💬");
    const [location,setLocation]=useState("💬");
    const [room,setRoom]=useState("💬");
    const [number,setNumber]=useState("💬");

    const [seat,setSeat]=useState("");

    function saveSeat(data){
        setSeat(data);
    }

    //seat:,

    function saveNumber(e){
        setNumber(e.target.value);
    }

    function saveRoom(e){
        setRoom(e.target.value);
    }

    function saveLocation(e){
        setLocation(e.target.value);
    }

    const themaImg = thema.concat("img");

    function saveDate(e) {
        setDay(e.target.value);
    }

    function selectThema(e) {
        setThema(e.target.value);
    }

    function imgUpload(e) {
        let reader = new FileReader();

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onloadend = () => {
            const previewImgUrl = reader.result;
            setImg(previewImgUrl);
        }
    }

    function removeImg() {
        setImg(img1);
    }

    function saveComment(e) {
        setComment(e.target.value);
    }

    const mydiary = {
        date: day,
        thema: thema,
        img: img,
        seat:seat,
        location:location,
        room:room,
        number:number,
        comment: comment,
    };

    const [diary, setDiary] = useState(JSON.parse(localStorage.getItem("diary")) == null ? [] : JSON.parse(localStorage.getItem("diary")));

    function saveDatas() {
        //날짜, 테마, 좌석위치, 이미지, 정보(위치,관람관,상세좌석), 감상글
        //localstorage에 저장하기
        //useEffect 사용하기
        if (day === "0000-00-00") {
            alert("날짜를 기입해주세요😅");
        }
        else {
            if (window.confirm("저장하시겠습니까🙂?")) {
                (diary == null) ? setDiary([mydiary]) : setDiary([...diary, mydiary]);
                setTimeout(() => {
                    navigate(`/`);
                }, 200);
            }
        }
    };

    useEffect(() => {
        localStorage.setItem("diary", JSON.stringify(diary));
    }, [diary]);

    return (
        <Container>
            <AppDiv className={themaImg}>
                <header style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                    <span style={{ fontWeight: "900", marginRight: "140px" }}><Link to="/" style={{ textDecoration: 'none', color: "black" }}>🎬영화일기</Link></span>
                    <label style={{fontWeight:"900"}}>{day} <input type="date" onChange={saveDate} /></label>
                    <select onChange={selectThema}>
                        <option value="cgv">CGV</option>
                        <option value="lotte">LotteCinema</option>
                        <option value="mega">MEGABOX</option>
                        <option value="inde">독립영화관</option>
                        <option value="home">HOME</option>
                    </select>
                    <Button onClick={saveDatas} style={{width:"50px"}}>저장</Button>
                </header><br />
                <section style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                    <img style={{ width: "200px", height: "280px" }} src={img} alt="" />
                    {thema !== "home" ? <MovieTheater event={true} myseat={""} onSeat={saveSeat} thema={thema} /> : <></>}
                </section>
                <section style={{ display: "flex", justifyContent: "center" }}>
                    <label>
                        <MyButton>포스터 선택</MyButton>
                        <input style={{ display: "none" }} type="file" accept="image/*" onChange={imgUpload} />
                    </label>
                    <Button onClick={removeImg} style={{ marginRight: "40px" }}>포스터 삭제</Button>
                    <input type="text" size="10" placeholder="장소" className={thema} onChange={saveLocation}/>
                    {thema !== "home" && <input type="text" size="10" placeholder="영화관" className={thema} onChange={saveRoom}/>}
                    {thema !== "home" && <input type="text" size="10" placeholder="좌석번호" className={thema} onChange={saveNumber}/>}
                </section>
                <br />
                <TextArea onChange={saveComment} />
            </AppDiv>
        </Container>
    );
}

export default MovieDiary;