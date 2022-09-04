import { useState } from "react";
import styled from "styled-components";
import MovieTheater from "./MovieTheater";

const TextArea = styled.textarea`
    width: 600px;
    height: 100px;
    border: none;
    resize: none;
`;

function MovieDiary() {

    const [day, setDay] = useState("0000-00-00");
    const [thema, setThema] = useState("cgv");
    const [img, setImg] = useState("");

    function date(e) {
        setDay(e.target.value);
    }

    function selectThema(e) {
        setThema(e.target.value);
    }

    function imgUpload(e) {
        setImg(e.target.value);
    }

    return (
        <>
            <header style={{ display: "flex", justifyContent: "center" }}>
                <label>{day} <input type="date" onChange={date} /></label>
                <select onChange={selectThema}>
                    <option value="cgv">CGV</option>
                    <option value="lotte">LotteCinema</option>
                    <option value="mega">MEGABOX</option>
                    <option value="inde">독립영화관</option>
                    <option value="home">HOME</option>
                </select>
                <button>저장</button>
            </header><br />
            <section style={{ display: "flex", justifyContent: "center" }}>
                <img style={{ width: "200px", height: "280px" }} src={img} alt="" />
                <MovieTheater thema={thema} />
            </section>
            <section>
                <input type="file" onChange={imgUpload} />
                <br/>
                <TextArea />
            </section>
        </>
    );
}

export default MovieDiary;