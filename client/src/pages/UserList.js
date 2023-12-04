import React from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";


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
            
            {/*Тут начинается второй Блок */}
            <div className="d-flex flex-column">
                <Card  className="p-5"
                    style={{marginLeft: "50px"}}
                >
                <div>Список людей входящих в отдел:</div> 
                <Form className="d-flex justify-content-center">
                    <div className="g-0">
                            <Row className="mt-3">
                                Джаримок Ислам Юрьевич
                            </Row>
                            <Row className="mt-3">
                                Иванов Иван Иванович
                            </Row>
                            <Row className="mt-3">
                                Петров Петр Петрович
                            </Row>
                        </div>
                    </Form>
                </Card>
                <div>
                    <Button className="align-items-baseline mt-2"
                        style={{marginLeft: "50px"}}
                        variant="outline-success">
                        Что то сделать
                    </Button>
                </div>
            </div>
        </Container>

    )

}
export default UserList;