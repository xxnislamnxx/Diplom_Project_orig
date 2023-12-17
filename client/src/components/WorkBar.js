import { observer } from "mobx-react-lite";
import React, { useContext,useEffect } from "react";
import { Context } from "../index";
import ListGroup from 'react-bootstrap/ListGroup';
import TaskBar from "./TaskBar";
import { getTask,setTask } from "../http/workApi";
import {Button } from "react-bootstrap";
import {jwtDecode} from "jwt-decode";


const WorkBar = observer(() => {
    const {user} = useContext(Context)
    const {work} = useContext(Context)
    const token = jwtDecode(localStorage.getItem('token')).id
    let onHidden = true

    if (work.selectedWork.id) {  
        onHidden = false
    }

const  updTask = async (works) => 
    {
        try {
            {work.setSelectedWork(works)}
            if (work.selectedWork.id) {
                getTask(work.selectedWork.id).then(data => work.setTask(data))    
            }   
    } catch (e) {
        alert(e.response.data.message)
    }
}

const  setTasks = async (Work_id,User_id,Text,Completed) => 
{
    try {
        await setTask(Work_id,User_id,Text,Completed) 
    } catch (e) {
        alert(e.response.data.message)
    }
}

    return (
        <div>
            <div>
                Список проектов:
            </div>
            <ListGroup className="mt-3 list-group-flush">
                {work.works.map(workss => 
                    <>
                        <ListGroup.Item 
                            className="d-flex 
                                justify-content-between
                                align-items-center
                                list-group-item-action"
                            style={{ cursor: 'pointer' }}
                            key={workss.id}
                            onClick={()=>updTask(workss)}
                        >
                            {workss.Text}
                            {work.selectedWork.id === workss.id?
                            <Button className="align-items-baseline"
                                variant="outline-success"
                                size="sm"
                                onClick={()=>setTasks(work.selectedWork.id,token,"Новая задача",false)}>
                                Добавить задачу
                            </Button>
                            :
                            <small >Выбирете проект, что бы посмотреть задачи</small>    
                        }
                        </ListGroup.Item>

                        <ListGroup.Item 
                            hidden={onHidden}
                            style={{marginLeft: "20px"}}>
                        <TaskBar Work_id={workss.id}/>
                        </ListGroup.Item>
                    </>
                )}
            </ListGroup>
        </div>

    )

})
export default WorkBar;