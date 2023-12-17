import { observer } from "mobx-react-lite";
import React, { useContext,useEffect} from "react";
import { Context } from "../index";
import ListGroup from 'react-bootstrap/ListGroup';
import { getTask } from "../http/workApi";
import { Form } from "react-bootstrap";

const TaskBar = observer(({Work_id,isHidden}) => {
    const {user} = useContext(Context)
    const {work} = useContext(Context)
    const hid= work.selectedWork.id === Work_id
    
   {/* const elem = document.querySelector('#checkbox')
if (elem.checked) {
  console.log(`Checkbox is checked!`)
} else {
  console.log(`Checkbox is not checked.`)
}*/}
let check ;
    const isCompleted = async (checkedd)=>
    {
        check = !checkedd
        console.log(check) 
    }
    
    return (
        <div hidden={!hid}>
            <ListGroup className="mt-1 list-group-flush">
                {work.task.map(tasks => 
                    <ListGroup.Item className="list-group-item-action"
                        style={{cursor: 'pointer'}}
                        key={tasks.id}
                        >
                        {tasks.Text}
                        <div 
                            hidden={tasks.Text ==="В проекте нет задач, для создания обратитесь к руководителю"}
                            >
                            <Form.Check // prettier-ignore
                                type="switch"
                                id={"cswitch"}
                                label={!check?"нажми на меня":"Не нажимай"}
                                checked={check}
                                onClick={()=>isCompleted(check)}
                        />
                        </div>
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>

    )

})
export default TaskBar;