import { observer } from "mobx-react-lite";
import React, { useContext,useEffect, useState} from "react";
import { Context } from "../index";
import ListGroup from 'react-bootstrap/ListGroup';
import { getTask, updTask } from "../http/workApi";
import { Col, Form, Row } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import Sidebar from "./SideBar/Sidebar";
import { getComments } from "../http/commentApi";

const TaskBar = observer(({Work_id,isHidden}) => {
    const {user} = useContext(Context)
    const {work} = useContext(Context)
    const hid= work.selectedWork.id === Work_id
    const token = jwtDecode(localStorage.getItem('token'))

const [Check,setCheck] = useState()
const [CommentVisible,setCommentVisible] = useState(false)
const [TaskName,setTaskName] = useState('')
const [CreatedTask,setCreatedTask] = useState('')
const [TimeTask,setTimeTask] = useState('')
const [Userid,setUserid] = useState('')
let check = null
    const isCompleted = async (id,checkedd)=>
    {
        updTask(id,checkedd).then(
        getTask(work.selectedWork.id,work.SortCol,work.SortDir).then(data => work.setTask(data)))

    }
    const isSel = async (id,taskName,userid,timeTask) =>
    {
        await work.setSelectedTask(id)
        setTaskName(taskName)
        setUserid(userid)
        setTimeTask(timeTask.toString())
        await getComments(work.selectedTask).then(data => work.setComments(data))
         setCommentVisible(true)
        
    }
    return (
        <div hidden={!hid}>
            
                
            <ListGroup className="mt-0 list-group-flush">
                {work.task.map(tasks =>     
                    <ListGroup.Item className="d-flex list-group-item-action justify-content-between"
                        style={{cursor: 'pointer'}}
                        key={tasks.id}
                        on
                        onClick={e=>{
                            e.stopPropagation();
                            isSel(tasks.id,tasks.Text,tasks.User_id,tasks.DateTimeCreate)}}
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
                                onClick={e=>{
                                        e.stopPropagation();
                                    isCompleted(tasks.id,e.target.checked)}}
                                disabled={tasks.User_id==token.id? false:true}
                        />
                        <small className="" aria-disabled={tasks.User_id==token.id? false:true}>
                            {tasks.Text ==="В проекте нет задач, для создания обратитесь к руководителю"?
                            "":"Ответственный: "+ user.users.find( ({id})=>id===tasks.User_id).Name}
                        </small>
                        </div>
                    </ListGroup.Item>
                )}
            </ListGroup>
            
            <Sidebar show={CommentVisible} onHide={()=> setCommentVisible(false)}
                TaskName={TaskName} Userid={Userid} TimeTask={TimeTask}
            />
        </div>

    )

})
export default TaskBar;