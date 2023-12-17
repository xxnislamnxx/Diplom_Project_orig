import { observer } from "mobx-react-lite";
import React, { useContext,useEffect, useState} from "react";
import { Context } from "../index";
import ListGroup from 'react-bootstrap/ListGroup';
import { getTask, updTask } from "../http/workApi";
import { Col, Form, Row } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

const TaskBar = observer(({Work_id,isHidden}) => {
    const {user} = useContext(Context)
    const {work} = useContext(Context)
    const hid= work.selectedWork.id === Work_id
    const token = jwtDecode(localStorage.getItem('token'))

const [Check,setCheck] = useState()
let check = null
    const isCompleted = async (id,checkedd)=>
    {
        updTask(id,checkedd).then(
        getTask(work.selectedWork.id).then(data => work.setTask(data)))
    }

    return (
        <div hidden={!hid}>
            
                
            <ListGroup className="mt-0 list-group-flush">
                {work.task.map(tasks => 
                    <ListGroup.Item className="d-flex list-group-item-action justify-content-between"
                        style={{cursor: 'pointer'}}
                        key={tasks.id}
                        >
                        {tasks.Text}
                        <div
                            hidden={tasks.Text ==="В проекте нет задач, для создания обратитесь к руководителю"}
                            >
                            <Form.Check // prettier-ignore'
                                reverse
                                type="switch"
                                id={tasks.id}
                                label={tasks.Completed?"Выполнено":"Не выполнено"}
                                checked={tasks.Completed}
                                onClick={e=>isCompleted(tasks.id,e.target.checked)}
                                disabled={tasks.User_id==token.id? false:true}
                        />
                        <small className="">
                            Автор: {user.users.find(({id})=>id===tasks.User_id).Name}
                        </small>
                        </div>
                    </ListGroup.Item>
                )}
            </ListGroup>
            
            
        </div>

    )

})
export default TaskBar;