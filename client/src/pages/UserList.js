import React, { useContext, useEffect } from "react";
import {Card, Container } from "react-bootstrap";
import OtdelBar from "../components/OtdelBar";
import UsersBar from "../components/UsersBar";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { getOtdel } from "../http/otdelAPI";
import { getUsers } from "../http/userAPI";



const UserList = observer(() => {
    const {otdel} = useContext(Context)
    const {user} = useContext(Context)

    useEffect(() => {
        getOtdel().then(data => otdel.setOtdel(data))
    }, [])
    
    if (otdel.selectedOtdel.id) {
        getUsers(otdel.selectedOtdel.id).then(data => user.setUsers(data))
        
    }
    
{/*    useEffect(() => {
        getUsers().then(data => user.setUsers(data))
    }, [])*/}
    

    


    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card  className="p-3"
                style={{marginRight: "50px"}}
            >
            <div>    
                <OtdelBar/>
            </div> 
            </Card>

            {/*Тут начинается второй Блок */}

            <Card className="p-3"
                style={{marginRight: "50px"}}
            >
            <div>    
                <UsersBar/>
            </div> 
            </Card>


            </Container>
    )

})
export default UserList;
            
            {/*
            {/*Тут начинается второй Блок 
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

*/}