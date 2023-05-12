import { useParams } from "react-router-dom";
import Edit from "../component/Edit";

function EditDiary() {

    const {id}=useParams() as {id:string};
    const data = parseInt(id) - 1;

    return (
        <Edit isEdit={true} id={data} />
    );
}

export default EditDiary;