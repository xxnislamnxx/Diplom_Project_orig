import { observer } from "mobx-react-lite";
import React, { useContext,useEffect, useState } from "react";
import { Context } from "../index";
import ListGroup from 'react-bootstrap/ListGroup';
import TaskBar from "./TaskBar";
import { getTask,setTask } from "../http/workApi";
import {Button } from "react-bootstrap";
import {jwtDecode} from "jwt-decode";
import CreateTask from "./modals/CreateTask";


const WorkBar = observer(() => {
    const {user} = useContext(Context)
    const {work} = useContext(Context)
    const [TaskVisible,setTaskVisible] = useState(false)
    
    let onHidden = true
    
    if (work.selectedWork.id ) {  
       
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
            
            <ListGroup className="mt-3 list-group-flush">
                {work.works.map((workss,index) => 
                    <>
                        <ListGroup.Item 
                            className="d-flex 
                                justify-content-between
                                align-items-center
                                list-group-item-action"
                            style={{ cursor: 'pointer' }}
                            key={workss.id+1}
                            onClick={()=>updTask(workss)}
                            >
                            {workss.Text}
                            {work.selectedWork.id === workss.id?
                                <Button className="align-items-baseline"
                                    variant="outline-success"
                                    size="sm"
                                    key={workss.id+5}
                                    hidden={workss.id ===0}
                                    onClick={()=> setTaskVisible(true)}>
                                    Добавить задачу
                                </Button>
                            :
                                <small hidden={workss.id ===0}
                                >Выбирете проект, что бы посмотреть задачи</small>    
                            }   
                        </ListGroup.Item>

                        <ListGroup.Item 
                            hidden={onHidden}
                            style={{marginLeft: "20px"}}
                            key={workss.id+10}>
                                
                        <TaskBar Work_id={workss.id}/>
                        </ListGroup.Item>
                    </>
                )}
            </ListGroup>
            <CreateTask show={TaskVisible} onHide={()=> setTaskVisible(false)} />
        </div>

    )

})
export default WorkBar;