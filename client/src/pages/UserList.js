import React from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom/cjs/react-router-dom";

const UserList = () => {
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card  className="p-5"
                style={{marginRight: "50px"}}
            >
               <div>Отдел:</div> 
            </Card>
            
            <Card  className="p-5"
                style={{marginLeft: "50px"}}
            >
               <div>Список людей входящих в отдел:</div> 
               <Form className="d-flex flex-column">
                   <div className="flex-end">
                    <Row className="mt-3">
                        ФИО 1
                    </Row>
                    <Row className="mt-3">
                        ФИО 2
                    </Row>
                    <Row className="mt-3">
                        ФИО 3
                    </Row>
                    <Row className="mt-3">
                        ФИО 4
                    </Row>
                </div>
                </Form>
            </Card>
        </Container>

    )

}
export default UserList;