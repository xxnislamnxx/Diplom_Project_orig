import React, { useContext, useEffect } from "react";
import {Card, Container,Button, Row,Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import WorkBar from "../components/WorkBar";
import { getWork } from "../http/workApi";

const Project = observer(() => {
    const {otdel} = useContext(Context)
    const {user} = useContext(Context)
    const {work} = useContext(Context)
   
 

    return (
        <Container>
            <Row className="justify-content-md-center mt-4">
                <Col md={2}>
                    <div>    
                        {/*<WorkBar/>*/}
                        <Button className="align-items-baseline mt-2"
                            variant="outline-success">
                            Что то сделать
                        </Button>
                    </div> 
                </Col>
                
            </Row>


        </Container>
    )

})
export default Project;
            