import React from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom/cjs/react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

let otdel = ['MES',
             'КСОДУ','PIMS']
console.log(otdel.length)
const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    console.log(location)
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card  className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' :  'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    {isLogin ? 
                    <div>
                    <Form.Control 
                        className="mt-3"
                        placeholder="Введите ваш Логин или Email..."
                    />
                    <Form.Control 
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                    />
                    </div>
                    :
                    <div>
                    <Form.Control 
                        className="mt-3"
                        placeholder="Введите ваша ФИО... "
                    />
                    <Form.Select className="mt-3">
                        otdel.forEach(element ={">"} {
                            <option>element</option>
                        });
                        
                    </Form.Select>
                    <Form.Control 
                        className="mt-3"
                        placeholder="Введите ваш Логин или Email..."
                    />
                    <Form.Control 
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                    />
                    </div>
                    }

              
                    <Row className="d-flex justify-content-between g-0 mt-3">
                        {isLogin ? 
                            <div style={{width:326}}> 
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся</NavLink>
                            </div>
                            :
                            <div style={{width:266}}> 
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                            </div>
                        }   
                        {isLogin ?         
                            <Button 
                                style={{width:100}}
                                variant="outline-success">
                                Войти
                            </Button>
                            :
                            <Button 
                                style={{width:160}}
                                variant="outline-success">
                               Регистрация
                            </Button>
                        }
                    </Row>
                </Form>
            </Card>
        </Container>

    )

}
export default Auth;

/*
bg-secondary
                    <Row className="d-flex justify-content-between mt-3 ">
                        <div>
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE} >Зарегестрируйся</NavLink>
                        </div>
                        <Button 
                            className="mt-3 align-self-end"
                            variant={"outline-success"}>
                            Войти
                        </Button>
                    </Row>

*/