import { Dispatch, MutableRefObject, createContext, useContext, useReducer, useRef,useEffect } from "react";

interface DiaryItem{
    idx:number,
    date:string,
    thema:string,
    img:string,
    seat:string,
    location:string,
    room:string,
    number:string,
    comment:string
}

type Action=
    | {type:'SORT',data:DiaryItem[]}
    | {type:'READ',diary:DiaryItem[]}
    | {type:'CREATE',diaryItems:DiaryItem}
    | {type:'EDIT',diaryItems:DiaryItem}
    | {type:'DELETE', idx:number}

type DiaryDispatch=Dispatch<Action>;

function reducer(state:DiaryItem[],action:Action){
    let newState:DiaryItem[]=[];
    switch(action.type){
        case 'READ':{
            return action.diary
        }
        case 'SORT':{
            newState=action.data;
            break;
        }
        case 'CREATE':{
            newState=[action.diaryItems,...state];
            break;
        }
        case 'EDIT':{
            newState=state.map((diaryItem)=>diaryItem.idx===action.diaryItems.idx?{
                ...action.diaryItems
            }:diaryItem);
            break;
        }
        case 'DELETE':{
            newState=state.filter((diaryItem)=>diaryItem.idx!==action.idx)
            break;
        }
        default:
            return state;
    };
    localStorage.setItem('diary',JSON.stringify(newState));
    return newState;
}

const DiaryIdxContext=createContext<MutableRefObject<number>|undefined>(undefined);
const DiaryValueContext=createContext<DiaryItem[]|undefined>(undefined);
const DiaryDispatchContext=createContext<DiaryDispatch|undefined>(undefined);

function DiaryProvider({children}:{children:React.ReactNode}){

    const isEmpty:boolean= (JSON.parse(`${localStorage.getItem('diary')}`)==null) || (JSON.parse(`${localStorage.getItem('diary')}`).length===0);

    const initItems=isEmpty?[]:JSON.parse(`${localStorage.getItem('diary')}`);
    //고유 idx - 서비스 접속 시 저장된 데이터에서 불러오기 (sort에 사용 - 최신순, 오래된순)
    const initIdx=isEmpty?1:Math.max(JSON.parse(`${localStorage.getItem('diary')}`)[0].idx)+1

    //전역 상태(id 및 일기 내용) 관리
    const nextIdx=useRef(initIdx);
    const [diaryItems,dispatch]=useReducer(reducer,initItems);

    return (
        <DiaryDispatchContext.Provider value={dispatch}>
            <DiaryValueContext.Provider value={diaryItems}>
                <DiaryIdxContext.Provider value={nextIdx}>
                {children}
                </DiaryIdxContext.Provider>
            </DiaryValueContext.Provider>
        </DiaryDispatchContext.Provider>
    )
}

export default DiaryProvider;

//custom hook (useContext 사용, id, value, dispatch)
export function useDiaryIdxContext(){
    const idx=useContext(DiaryIdxContext);
    if (idx === undefined) {
        throw new Error('useTodosValue should be used within TodosProvider');
    }
    return idx;
}

export function useDiaryValueContext(){
    const value=useContext(DiaryValueContext);
    if (value === undefined) {
        throw new Error('useTodosValue should be used within TodosProvider');
    }
    return value;
}

export function useDiaryDispatchContext(){
    const dispatch=useContext(DiaryDispatchContext);
    if (dispatch === undefined) {
        throw new Error('useTodosValue should be used within TodosProvider');
    }
    return dispatch;
}