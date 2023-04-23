import { useParams } from "react-router-dom";
import Edit from "../component/Edit";

function EditDiary() {

    const data = useParams().id - 1;

    return (
        <Edit isEdit={true} id={data} />
    );
}

export default EditDiary;