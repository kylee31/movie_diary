import { useEffect, useState } from "react";
import styled from "styled-components";
import dummy from "../db/data.json";

const Box = styled.div`
    background-color:white;
    border-radius:20px;
    width:300px;
    height:260px;
    text-align:center;
    padding:10px;
    border:1px solid grey;
    margin-left: 50px;
    pointer-events:${props=>props.primary?"auto":"none"};
`;

const Screen = styled.div`
    width:230px;
    height:12px;
    color:white;
    font-size:6px;
    margin:auto;
`;

const Seat = styled.td`
    display:inline-block;
    width:25px;
    height:25px;
    border-radius:5px;
    margin:2px;
    margin-right: ${props=>(props.id===2||props.id===6)?"15px":0};
    background-color: ${props=>props.seat &&"grey"};
`;

function MovieTheater({ thema, onSeat, myseat, event }) {

    const themaseat = thema.concat("seat");
    const [selectedSeat, setSelectedSeat] = useState(myseat);

    useEffect(() => {
        setSelectedSeat(myseat);
    }, [myseat]);

    return (
        <Box primary={event}><br />
            <Screen className={thema}>screen</Screen><br />
            <table style={{ margin: "auto" }}>
                <tbody>
                    {dummy.data.map((seat, index) => {
                        return <tr key={index}>
                            {dummy.data[index].seat.map((seat) => {
                                const thisSeat =String(index)+String(seat.id);
                                return <Seat key={thisSeat} id={seat.id} seat={thisSeat===selectedSeat} className={themaseat} onClick={() => {
                                    if (selectedSeat === "") {
                                        setSelectedSeat(thisSeat);
                                        onSeat(thisSeat);
                                    }
                                    else {
                                        setSelectedSeat("");
                                        onSeat("");
                                    }
                                }}/>
                            })}
                        </tr>
                     })}
                </tbody>
            </table>
        </Box>
    );
}

export default MovieTheater;