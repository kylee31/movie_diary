import { useLayoutEffect, useState } from "react";
import theater from "../db/data.json";
import "../style/componentStyle.scss";

interface MovieTheaterInfo {
  thema: string;
  myseat: string;
  event: boolean;
  onSeat?: (seatNumber: string) => void;
}

function MovieTheater({ thema, onSeat, myseat, event }: MovieTheaterInfo) {
  const themaseat = thema.concat("seat");
  const [selectedSeat, setSelectedSeat] = useState(myseat);

  useLayoutEffect(() => {
    setSelectedSeat(myseat);
  }, [myseat]);

  return (
    <div className={`theaterContainer ${event ? null : "click"}`}>
      <br />
      <div className={`${"theaterScreen"} ${thema}`}>screen</div>
      <br />
      <table className="theaterTable">
        <tbody>
          {theater.data.map((_seat: object, index: number) => {
            return (
              <tr key={index}>
                {theater.data[index].seat.map((seat: { id: number }) => {
                  const thisSeat = String(index) + String(seat.id);
                  return (
                    <td
                      className={`theaterSeat ${themaseat} ${
                        (seat.id === 2 || seat.id === 6) && "gap"
                      } ${thisSeat === selectedSeat && "seat"}`}
                      key={thisSeat}
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
      </table>
    </div>
  );
}

export default MovieTheater;
