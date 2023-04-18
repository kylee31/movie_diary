import { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import theater from "../db/data.json";

const Box = styled.div`
    background-color:white;
    border-radius:20px;
    width:300px;
    height:260px;
    text-align:center;
    padding:10px;
    border:1px solid grey;
    margin-left: 50px;
    pointer-events:${props => props.$click ? "auto" : "none"};
`;

const Screen = styled.div`
    width:230px;
    height:12px;
    color:white;
    font-size:0.3rem;
    margin:auto;
`;

const Table = styled.table`
    margin:auto;
`

const Seat = styled.td`
    display:inline-block;
    width:25px;
    height:25px;
    border-radius:5px;
    margin:2px;
    margin-right: ${props => (props.$id === 2 || props.$id === 6) ? "15px" : 0};
    background-color: ${props => props.$seat && "grey"};
`;

function MovieTheater({ thema, onSeat, myseat, event }) {

    const themaseat = thema.concat("seat");
    const [selectedSeat, setSelectedSeat] = useState(myseat);

    useLayoutEffect(() => {
        setSelectedSeat(myseat);
    }, [myseat]);

    return (
        <Box $click={event}><br />
            <Screen className={thema}>screen</Screen><br />
            <Table>
                <tbody>
                    {theater.data.map((seat, index) => {
                        return <tr key={index}>
                            {theater.data[index].seat.map((seat) => {
                                const thisSeat = String(index) + String(seat.id);
                                return <Seat $id={seat.id} $seat={thisSeat === selectedSeat} key={thisSeat} className={themaseat} onClick={() => {
                                    if (selectedSeat === "") {
                                        setSelectedSeat(thisSeat);
                                        onSeat(thisSeat);
                                    }
                                    else {
                                        setSelectedSeat("");
                                        onSeat("");
                                    }
                                }} />
                            })}
                        </tr>
                    })}
                </tbody>
            </Table>
        </Box>
    );
}

export default MovieTheater;