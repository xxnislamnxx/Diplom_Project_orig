import React, { useContext, useEffect, useState } from "react";
import {Card, Container,Button, Row,Col } from "react-bootstrap";
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


const Project = observer(() => {
    const {otdel} = useContext(Context)
    const {user} = useContext(Context)
    const {work} = useContext(Context)
    const history = useHistory()
    const [WorkVisible,setWorkVisible] = useState(false)



   const token = jwtDecode(localStorage.getItem('token')).Otdel_id
   useEffect(() => {
        getWork(token).then(data => work.setWorks(data))
    }, [])

   


    return (
        <Container>
            <Row className="justify-content-md-center mt-4">
                <Col md={6}>
                    <div>    
                        
                        <WorkBar/>
                        <Button className="align-items-baseline mt-2"
                            variant="outline-success"
                            onClick={()=> setWorkVisible(true)
                                /*setWorks(token,"Новый проект",false)*/}
                            >
                            Создать проект
                        </Button>
                    </div> 
                </Col>
                
            </Row>

            <CreateWork show={WorkVisible} onHide={()=> setWorkVisible(false)} />
            
        </Container>
    )

})
export default Project;
            