import { useEffect, useState } from "react";
import styled from "styled-components";
import dummy from "../db/data.json";

const Box = styled.div`
    background-color:white;
    border-radius:20px;
    width:300px;
    height:280px;
    text-align:center;
    padding:10px;
`;

const Screen = styled.div`
    width:230px;
    height:12px;
    color:white;
    font-size:6px;
    margin:auto;
`

const Seat = styled.td`
    display:inline-block;
    width:25px;
    height:25px;
    border-radius:5px;
    margin:2px;
`

function MovieTheater({ thema }) {

    //thema로 받아와서 css 변경하기

    const [selectedSeat, setSelectedSeat] = useState();

    return (
        <Box>
            <Screen className={thema}>screen</Screen><br />
            <table style={{margin:"auto"}}>
                <tbody>
                    <tr>
                    {dummy.data.map((seat) => {
                        return <Seat key={seat.id} className={thema}>{seat.id}</Seat>
                    })}
                    </tr>
                </tbody>
            </table>
        </Box>
    );
}

export default MovieTheater;