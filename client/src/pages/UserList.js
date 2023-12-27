import React, { useContext, useEffect, useState } from "react";
import {Card, Container,Button, Row,Col } from "react-bootstrap";
import OtdelBar from "../components/OtdelBar";
import UsersBar from "../components/UsersBar";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { getOtdel } from "../http/otdelAPI";
import { getUsers } from "../http/userAPI";
import CreateOtdel from "../components/modals/CreateOtdel";
import DirectoBar from "../components/DirectorBar";
import WorkBar from "../components/WorkBar";
import TaskBar from "../components/TaskBar";
import { jwtDecode } from "jwt-decode";



const UserList = observer(() => {
    const {otdel} = useContext(Context)
    const {user} = useContext(Context)
    const [OtdelVisible,setOtdelVisible] = useState(false)
    
    const tok = localStorage.getItem('token')  
  let token
  if (!tok) {
     token = user.token[0]
    //console.log("токен дефолт ",token.Name)
  }else{
    token = jwtDecode(tok)
  }
    let onHidden = true

    useEffect(() => {
        getOtdel().then(data => otdel.setOtdel(data))
    }, [])
    
    if (otdel.selectedOtdel.id) {
        getUsers(otdel.selectedOtdel.id).then(data => user.setUsers(data))
        onHidden = false
        
    }
    
{/*    useEffect(() => {
        getUsers().then(data => user.setUsers(data))
    }, [])*/}
    
  const  click = async () => 
    {
        await console.log(user.users)
    }

    return (
        <Container>
            <Row className="justify-content-md-center mt-4">
                <Col md={2}>
                    <OtdelBar/>
                        <div hidden={token.PostId !== 1}>    
                            <Button className="align-items-baseline mt-3"
                                variant="outline-success"
                                onClick={()=>setOtdelVisible(true)}
                                >
                                Создать отдел
                            </Button>
                        </div> 
                </Col>
                <Col md="auto">
                    <div>
                        <DirectoBar onHidden={onHidden}/>
                    </div> 
                </Col>
                <Col md="auto">
                    <div>    
                        <UsersBar onHidden={onHidden}/>
                    </div> 
                </Col>
            </Row>

        <CreateOtdel show={OtdelVisible} onHide={()=> setOtdelVisible(false)}/>
        </Container>
    )

})
export default UserList;
            


{/*

<Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card  className="p-3"
                style={{marginRight: "50px"}}
            >
            <div>    
                <OtdelBar/>
                <Button className="align-items-baseline mt-2"
                     variant="outline-success"
                    onClick={click}
                    >
                    Что то сделать
                </Button>
            </div> 
            </Card>

            {/*Тут начинается второй Блок }

            <Card className="p-3"
                style={{marginLeft: "50px"}}
            >
            <div>    
                <UsersBar/>
            </div> 
            </Card>

            <CreateOtdel show={false}/>
            </Container>





*/}





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