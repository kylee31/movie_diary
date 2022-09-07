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
`;

function MovieTheater({ thema, onSeat, myseat, event }) {

    const themaseat = thema.concat("seat");
    const [selectedSeat, setSelectedSeat] = useState(myseat);

    useEffect(() => {
        setSelectedSeat(myseat);
    }, [myseat]);

    return (
        <Box style={{ pointerEvents: event === false ? "none" : "auto" }}><br />
            <Screen className={thema}>screen</Screen><br />
            <table style={{ margin: "auto" }}>
                <tbody>
                    {dummy.data.map((seat, index) => {
                        return <tr key={index}>{dummy.data[index].seat.map((seat) => {
                            if (seat.id === 2 || seat.id === 6) {
                                return <Seat style={{ marginRight: "15px", backgroundColor: selectedSeat === String(index) + String(seat.id) && "grey" }} key={String(index) + String(seat.id)} className={themaseat} onClick={() => {
                                    if (selectedSeat === "") {
                                        setSelectedSeat(String(index) + String(seat.id));
                                        onSeat(String(index) + String(seat.id));
                                    }
                                    else {
                                        setSelectedSeat("");
                                        onSeat("");
                                    }
                                }}></Seat>
                            }
                            else {
                                return <Seat style={{ backgroundColor: selectedSeat === String(index) + String(seat.id) && "grey" }} key={String(index) + String(seat.id)} className={themaseat} onClick={() => {
                                    if (selectedSeat === "") {
                                        setSelectedSeat(String(index) + String(seat.id));
                                        onSeat(String(index) + String(seat.id));
                                    }
                                    else {
                                        setSelectedSeat("");
                                        onSeat("");
                                    }
                                }}></Seat>
                            }
                        })}</tr>;
                    })}
                </tbody>
            </table>
        </Box>
    );
}

export default MovieTheater;