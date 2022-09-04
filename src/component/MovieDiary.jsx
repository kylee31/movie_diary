import { useState } from "react";
import styled from "styled-components";
import MovieTheater from "./MovieTheater";

const TextArea = styled.textarea`
    display:flex;
    margin:auto;
    margin-top:5px;
    width: 600px;
    height: 100px;
    border: 2px solid lightgrey;
    resize: none;
    font-family:Arial;
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

function MovieDiary() {

    const [day, setDay] = useState("0000-00-00");
    const [thema, setThema] = useState("cgv");
    const [img, setImg] = useState("");

    const themaImg=thema.concat("img");

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
        setImg("");
    }

    function saveData(){
        //날짜, 테마, 좌석위치, 이미지, 정보(위치,관람관,상세좌석), 감상글
        //localstorage에 저장하기
        //useEffect 사용하기
    }

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
                    <button onClick={saveData}>저장</button>
                </header><br />
                <section style={{ display: "flex", justifyContent: "center",marginBottom:"10px"}}>
                    <img style={{ width: "200px", height: "280px", marginRight: "50px" }} src={img} alt="" />
                    {thema !== "home" ? <MovieTheater thema={thema} /> : <></>}
                </section>
                <section style={{ display: "flex", justifyContent: "center"}}>
                    <input type="file" onChange={imgUpload} />
                    <button onClick={removeImg}>remove</button>
                    <input type="text" size="10" />
                    {thema!=="home"&&<input type="text" size="10" />}
                    {thema!=="home"&&<input type="text" size="10" />}
                </section>
                <br />
                <TextArea />
            </AppDiv>
        </Container>
    );
}

export default MovieDiary;