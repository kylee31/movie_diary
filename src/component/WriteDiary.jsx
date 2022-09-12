import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import MovieTheater from "./MovieTheater";
import img1 from "../db/img1.png";

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
`;

const TextNum=styled.div`
    font-size:5px;
    font-weight:900;
    position:absolute;
    margin-left:575px;
    color:${props=>props.length<=140?"grey":"red"};
`;

function reducer(state,action){
    return {
        ...state,
        [action.name]:action.value
    };
}

function MovieDiary() {

    const navigate = useNavigate();

    const [diary, setDiary] = useState(JSON.parse(localStorage.getItem("diary")) == null ? [] : JSON.parse(localStorage.getItem("diary")));
    const [day, setDay] = useState("0000-00-00");
    const [thema, setThema] = useState("cgv");
    const [img, setImg] = useState(img1);
    const [seat, setSeat] = useState("");

    const themaImg = thema.concat("img");

    //useReducer
    const [state, dispatch]=useReducer(reducer,{
        comment:'💬',
        location:'💬',
        room:'💬',
        number:'💬'
    });
    const {comment,location,room,number}=state;
    const onChange=(e)=>{
        dispatch(e.target);
    };
    
    const mydiary = {
        date: day,
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
    function removeImg() { setImg(img1); }
    function saveDatas() {
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
                <header style={{ display: "flex", justifyContent: "center" }}>
                    <span style={{ fontWeight: "900", marginRight: "110px",marginLeft:"10px" }}><Link to="/" style={{ textDecoration: 'none', color: "black" }}>🎬영화일기</Link></span>
                    <label style={{ fontWeight: "900", fontSize: "1.1rem",marginRight:"10px"}}>{day} <input type="date" onChange={saveDate} /></label>
                    <select onChange={selectThema}>
                        <option value="cgv">CGV</option>
                        <option value="lotte">LotteCinema</option>
                        <option value="mega">MEGABOX</option>
                        <option value="inde">독립영화관</option>
                        <option value="home">HOME</option>
                    </select>
                    <MyButton onClick={saveDatas} style={{ width: "50px",marginLeft:"10px" }}>저장</MyButton>
                </header><br />
                <div style={{ display: "flex", justifyContent: "center", alignItems:"center",marginLeft:"5px"}}>
                    <section>
                        <img style={{ width: "200px", height: "280px" }} src={img} alt="" />
                        <div style={{display:"flex",flexDirection:"row",marginTop:"10px"}}>
                        <label>
                            <MyButton>포스터 선택</MyButton>
                            <input style={{ display: "none" }} type="file" accept="image/*" onChange={imgUpload} />
                        </label>
                        <MyButton onClick={removeImg}>포스터 삭제</MyButton>
                        </div>
                    </section>
                    <section>
                        {thema !== "home" ? <MovieTheater event={true} myseat={""} onSeat={saveSeat} thema={thema} /> : <></>}
                        <div style={{ marginLeft: "47px", marginTop: "10px" }}>
                            <input autoComplete="off" type="text" name="location" size="10" placeholder="장소" className={thema} onChange={onChange} 
                            style={{position:thema==="home"?"absolute":"static",marginTop:thema==="home"?"127px":"0",marginLeft:thema==="home"?"70px":"0"}}/>
                            {thema !== "home" && <input autoComplete="off" type="text" name="room" size="10" placeholder="영화관" className={thema} onChange={onChange} />}
                            {thema !== "home" && <input autoComplete="off"  type="text" name="number" size="10" placeholder="좌석번호" className={thema} onChange={onChange} />}
                        </div>
                    </section>
                </div>
                <TextArea name="comment" maxLength="140" onChange={onChange}/>
                <TextNum length={comment.length}>{comment==="💬"?0:comment.length}/140</TextNum>
            </AppDiv>
        </Container>
    );
}

export default MovieDiary;