import React, { useContext, useEffect, useState } from "react";
import {Card, Container,Button, Row,Col, Dropdown, DropdownButton } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import WorkBar from "../components/WorkBar";
import { getTask, getWork,setWork } from "../http/workApi";
import {jwtDecode} from "jwt-decode";
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import { LOGIN_ROUTE, PROJECT_ROUTE, USERLIST_ROUTE } from '../utils/consts.js'
import CreateOtdel from "../components/modals/CreateOtdel.js";
import CreateWork from "../components/modals/CreateWork.js";
import CreateTask from "../components/modals/CreateTask.js";
import { getUsers } from "../http/userAPI.js";
import DeleteWork from "../components/modals/DeleteWork.js";
import '../components/SideBar/Sidebar.css';
import SortBar from "../components/SortBar.js";


const Project = observer(() => {
    const {otdel} = useContext(Context)
    const {user} = useContext(Context)
    const {work} = useContext(Context)

    const [WorkVisible,setWorkVisible] = useState(false)
    const [DelWorkVisible,setDelWorkVisible] = useState(false)


   const token = jwtDecode(localStorage.getItem('token'))
   console.log(token)
   useEffect(() => {
        getWork(token.Otdel_id).then(data => work.setWorks(data))
        getUsers(token.Otdel_id).then(data => user.setUsers(data))
    }, [])
    return (
        <Container>
            <Row className="justify-content-md-center mt-4">
                <Col md={11}>     
                    <div className="d-flex justify-content-between align-items-center">
                       <label>Список проектов:</label> 
                       <SortBar onHide={!work.selectedWork.id}/>
                    </div>   
                    <WorkBar/>
                    <div hidden={token.PostId !== 1}>         
                        <Button className="align-items-baseline mt-2"
                            variant="outline-success"
                            onClick={()=> setWorkVisible(true)}
                            >
                            Создать проект
                        </Button>
                        <Button className="align-items-baseline mt-2"
                            variant="outline-danger"
                            onClick={()=> setDelWorkVisible(true)}
                            style={{marginLeft: "20px"}}
                            >
                            Удалить проект
                        </Button>
                    </div> 
                </Col>
            </Row>

            <CreateWork show={WorkVisible} onHide={()=> setWorkVisible(false)} />
            <DeleteWork show={DelWorkVisible} onHide={()=> setDelWorkVisible(false)}/>
        </Container>
    )

})
export default Project;
            