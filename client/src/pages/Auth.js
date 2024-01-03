import React, { useContext, useState, useEffect  } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, USERLIST_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import {observer} from 'mobx-react-lite'
import { Context } from '../index.js'
import { getOneOtdel, getOtdel } from "../http/otdelAPI";
import {jwtDecode} from "jwt-decode";
import { Link } from "react-router-dom";
const Auth = observer(() => {
    const {user} = useContext(Context)
    const {otdel} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    
    const [Name, setName] = useState('')
    const [Login, setLogin] = useState('')
    const [Password, setPassword] = useState('')
    const [Otdel_id, setOtdel_id] = useState('')
    

    const click = async () => {
       try {
        let data;

        if (isLogin) {
            data = await login(Login,Password)
            const token = jwtDecode(localStorage.getItem('token'))
            getOneOtdel(token.Otdel_id).then(data => otdel.setOneOtdel(data))
        } else {
            data = await registration(Name,Login,Password,Otdel_id)
            const token = jwtDecode(localStorage.getItem('token'))
            getOneOtdel(token.Otdel_id).then(data => otdel.setOneOtdel(data))
        }
        user.setUser(user)
        user.setIsAuth(true)
        history.push(USERLIST_ROUTE)
        //location.reload(true);
       } catch (e) {
        alert(e.response.data.message)
       }
    }

    
    useEffect(() => {
        getOtdel().then(data => otdel.setOtdel(data))
    }, [])

    const getid = async (Namee) => 
    {
        setOtdel_id(otdel.otdels.find(({Name})=>Name===Namee).id)
    }

    //console.log(location)
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
                        value={Login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <Form.Control 
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        type="password"
                        value={Password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    </div>
                    :
                    <div>
                    <Form.Control 
                        className="mt-3"
                        placeholder="Введите ваша ФИО... "
                        value={Name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Select className="mt-3"
                        onChange={e => getid(e.target.value) /*setOtdel_id(e.target.options.selectedIndex)*/}
                    >
                        <option key={0}>Укажите отдел</option>
                        {otdel.otdels.map(otdell => 
                            <option
                                key={otdell.id}
                            >
                                {otdell.Name}
                            </option>)}
                    </Form.Select>
                    <Form.Control 
                        className="mt-3"
                        placeholder="Введите ваш Логин или Email..."
                        value={Login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <Form.Control 
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={Password}
                        type="password"
                        onChange={e => setPassword(e.target.value)}
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
                                variant="outline-success"
                                onClick={click}
                                >
                                Войти
                            </Button>
                            :
                            <Button 
                                style={{width:160}}
                                variant="outline-success"
                                onClick={click}
                                >
                               Регистрация
                            </Button>
                        }
                    </Row>
                </Form>
            </Card>
        </Container>

    )

})
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