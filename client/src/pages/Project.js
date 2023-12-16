import React, { useContext, useEffect } from "react";
import {Card, Container,Button, Row,Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import WorkBar from "../components/WorkBar";
import { getTask, getWork,setWork } from "../http/workApi";
import {jwtDecode} from "jwt-decode";

const Project = observer(() => {
    const {otdel} = useContext(Context)
    const {user} = useContext(Context)
    const {work} = useContext(Context)
   const token = jwtDecode(localStorage.getItem('token')).Otdel_id
   useEffect(() => {
        getWork(token).then(data => work.setWorks(data))
    }, [])

   

    const  setWorks = async (Otdel_id,Text,Completed) => 
    {
        try {
            await setWork(Otdel_id,Text,Completed) 
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container>
            <Row className="justify-content-md-center mt-4">
                <Col md={6}>
                    <div>    
                        {console.log(jwtDecode(localStorage.getItem('token')))}
                        <WorkBar/>
                        <Button className="align-items-baseline mt-2"
                            variant="outline-success"
                            onClick={()=>setWorks(token,"Новый проект",false)}
                            >
                            Создать проект
                        </Button>
                    </div> 
                </Col>
                
            </Row>


        </Container>
    )

})
export default Project;
            