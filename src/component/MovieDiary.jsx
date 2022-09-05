import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MovieTheater from "./MovieTheater";
import img1 from "../db/img1.png";

const TextArea = styled.textarea`
    display:flex;
    margin:auto;
    width: 600px;
    height: 100px;
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
  width:650px;
  height:500px;
  background-color:lightgrey;
  border-radius:50px;
  padding:20px;
`;

const Button = styled.div`
    text-align:center;
    background-color:lightgrey;
    width:110px;
    height:30px;
    border-radius:10px;
`;

function MovieDiary() {

    const navigate = useNavigate();

    const [day, setDay] = useState("0000-00-00");
    const [thema, setThema] = useState("cgv");
    const [img, setImg] = useState(img1);
    const [comment, setComment] = useState("");

    const themaImg = thema.concat("img");

    function date(e) {
        setDay(e.target.value);
    }

    function selectThema(e) {
        setThema(e.target.value);
    }

    function imgUpload(e) {
        //console.log(e.target.value);
        //setImg(e.target.value);
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
        comment: comment,
        //seat:,
        //info:,
    };

    const [diary, setDiary] = useState(JSON.parse(localStorage.getItem("diary")) == null ? [] : JSON.parse(localStorage.getItem("diary")));

    function saveDatas() {
        //날짜, 테마, 좌석위치, 이미지, 정보(위치,관람관,상세좌석), 감상글
        //localstorage에 저장하기
        //useEffect 사용하기
        if(window.confirm("저장하시겠습니까🙂?")){
        (diary == null) ? setDiary([mydiary]) : setDiary([...diary, mydiary]);
        setTimeout(() => {
            navigate(`/`);
        }, 200);
        }
    };

    useEffect(() => {
        localStorage.setItem("diary", JSON.stringify(diary));
    }, [diary]);

    return (
        <Container>
            <AppDiv className={themaImg}>
                <header style={{ display: "flex", justifyContent: "center" }}>
                    <label>{day} <input type="date" onChange={date} /></label>
                    <select onChange={selectThema}>
                        <option value="cgv">CGV</option>
                        <option value="lotte">LotteCinema</option>
                        <option value="mega">MEGABOX</option>
                        <option value="inde">독립영화관</option>
                        <option value="home">HOME</option>
                    </select>
                    <button onClick={saveDatas}>저장</button>
                </header><br />
                <section style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                    <img style={{ width: "200px", height: "280px", marginRight: "50px" }} src={img} alt="" />
                    {thema !== "home" ? <MovieTheater thema={thema} /> : <></>}
                </section>
                <section style={{ display: "flex", justifyContent: "center" }}>
                    <label>
                        <Button>포스터 선택</Button>
                        <input style={{ display: "none" }} type="file" accept="image/*" onChange={imgUpload} />
                    </label>
                    <button onClick={removeImg} style={{ marginRight: "50px" }}>포스터 삭제</button>

                    <input type="text" size="10" placeholder="장소" className={thema} />
                    {thema !== "home" && <input type="text" size="10" placeholder="영화관" className={thema} />}
                    {thema !== "home" && <input type="text" size="10" placeholder="좌석번호" className={thema} />}
                </section>
                <br />
                <TextArea onChange={saveComment} />
            </AppDiv>
        </Container>
    );
}

export default MovieDiary;