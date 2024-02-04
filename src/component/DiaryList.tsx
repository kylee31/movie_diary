import DiaryItem from "./DiaryItem";
import {
  useDiaryDispatchContext,
  useDiaryValueContext,
} from "../context/DiaryProvider";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface SortData {
  isSort: string;
}

function DiaryList({ isSort }: SortData) {
  //localstorage아이템 불러오기
  //const data = JSON.parse(`${localStorage.getItem("diary")}`)==null? [] : JSON.parse(`${localStorage.getItem("diary")}`);
  const data = useDiaryValueContext();
  const dispatch = useDiaryDispatchContext();

  //sort에 따라서 데이터 순서변경
  //localStorage setItem에 따라서 오래된 순으로 선택 후 일기작성 시 순서 변경됨
  //sortData에 따라 값이 변경되지만 localstorage에 저장되지 않고 dispatch시에 localstorage setItem으로 저장된다
  //create에서 newState=[action.diaryItems,...state];로 생성되는 새로운 값을 맨 앞에 저장했기 때문에 오류 발생 x
  const [sortData, setSortData] = useState([...data]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (isSort === "write") {
      data.sort((a, b) => b.idx - a.idx);
      setSortData([...data].sort((a, b) => b.idx - a.idx));
    } else if (isSort === "date") {
      data.sort(
        (a, b) =>
          parseInt(a.date.toString().replace(/-/g, "")) -
          parseInt(b.date.toString().replace(/-/g, ""))
      );
      setSortData(
        [...data].sort(
          (a, b) =>
            parseInt(a.date.toString().replace(/-/g, "")) -
            parseInt(b.date.toString().replace(/-/g, ""))
        )
      );
    } else if (isSort === "thema") {
      //(a,b)=>(a.thema).localeCompare(b.thema) or a.thema>b.thema?1:-1 (문자열 비교 방법)
      data.sort((a, b) => a.thema.localeCompare(b.thema));
      setSortData([...data].sort((a, b) => a.thema.localeCompare(b.thema)));
    }
    setSearchParams({ sort: isSort });
    dispatch({ type: "SORT", data });
  }, [isSort]);

  return (
    <div className="box diaryListContainer">
      {sortData.map((item, index: number) => {
        return (
          <DiaryItem
            key={index}
            id={index}
            thema={item.thema}
            img={item.img}
            date={item.date}
          />
        );
      })}
    </div>
  );
}

export default DiaryList;
