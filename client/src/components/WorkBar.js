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
    const [WorkVisible,setWorkVisible] = useState(false)
    const [Select,setSelect] = useState({})
    let onHidden=true 
    
    if (!WorkVisible) { 
        onHidden = true
    }
    else{
        onHidden = false
        console.log('Проект не выбран',onHidden)
    }

const  updTask = async (works) => 
    {
        try {
            work.setSelectedWork(works)
                if (Select.id===work.selectedWork.id) {
                    onHidden = true
                    setWorkVisible(false)
                    setSelect({})
                    console.log('Выбран тот же проект',onHidden)
                 } else {
                    work.setSelectedWork(works)
                    setWorkVisible(true)
                    setSelect(works)
                    onHidden = false
                    if (work.selectedWork.id) 
                    {
                        getTask(work.selectedWork.id,work.SortCol,work.SortDir).then(data => work.setTask(data))
                        
                    } 
                    onHidden = false
                    console.log('Выбран другой проект',onHidden)
                 }              
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
                            {Select.id === workss.id?
                                <Button className="align-items-baseline"
                                    variant="outline-success"
                                    size="sm"
                                    key={workss.id + 5}
                                    hidden={workss.id === 0}
                                    onClick={e=>{
                                        e.stopPropagation(); setTaskVisible(true)}}>
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
                        {WorkVisible?
                        <TaskBar Work_id={workss.id}/>:''}
                        </ListGroup.Item>
                    </>
                )}
            </ListGroup>
            <CreateTask show={TaskVisible} onHide={()=> setTaskVisible(false)} />
        </div>

    )

})
export default WorkBar;