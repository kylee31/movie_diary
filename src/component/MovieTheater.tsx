import { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import theater from "../db/data.json";
import { Theme, ThemeColorType, themeColor } from "../styled/theme";

interface MovieTheaterInfo {
  thema: string;
  myseat: string;
  event: boolean;
  onSeat?: (seatNumber: string) => void;
}

interface BoxProps {
  $click: boolean;
}

interface SeatProps extends Theme {
  $id: number;
  $seat: boolean;
}

function MovieTheater({ thema, onSeat, myseat, event }: MovieTheaterInfo) {
  const [selectedSeat, setSelectedSeat] = useState(myseat);

  useLayoutEffect(() => {
    setSelectedSeat(myseat);
  }, [myseat]);

  return (
    <Box $click={event}>
      <br />
      <Screen $theme={thema}>screen</Screen>
      <br />
      <Table>
        <tbody>
          {theater.data.map((_seat: object, index: number) => {
            return (
              <tr key={index}>
                {theater.data[index].seat.map((seat: { id: number }) => {
                  const thisSeat = String(index) + String(seat.id);
                  return (
                    <Seat
                      key={thisSeat}
                      $id={seat.id}
                      $seat={thisSeat === selectedSeat}
                      $theme={thema}
                      onClick={() => {
                        if (selectedSeat === "") {
                          setSelectedSeat(thisSeat);
                          if (onSeat) onSeat(thisSeat);
                        } else {
                          setSelectedSeat("");
                          if (onSeat) onSeat("");
                        }
                      }}
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Box>
  );
}

export default MovieTheater;

const Box = styled.div<BoxProps>`
  background-color: white;
  border-radius: 20px;
  width: 300px;
  height: 260px;
  text-align: center;
  padding: 10px;
  border: 1px solid grey;
  margin-left: 50px;
  pointer-events: ${(props) => (props.$click ? "auto" : "none")};
`;

const Screen = styled.div<Theme>`
  width: 230px;
  height: 12px;
  line-height: 12px;
  color: white;
  font-size: 0.3rem;
  margin: auto;
  background-color: ${(props) =>
    themeColor[props.$theme as keyof ThemeColorType]};
  font-weight: 900;
`;

const Table = styled.table`
  margin: auto;
`;

const Seat = styled.td<SeatProps>`
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  margin: 2px;
  margin-right: ${(props) => (props.$id === 2 || props.$id === 6 ? "15px" : 0)};
  background-color: ${(props) =>
    props.$seat ? "grey" : themeColor[props.$theme as keyof ThemeColorType]};
  &:hover {
    background-color: rgb(105, 105, 105);
  }
`;
