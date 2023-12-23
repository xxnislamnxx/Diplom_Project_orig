import React, { useContext, useEffect } from 'react'
import { Context } from '../index.js'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min.js'
import { ADMIN_ROUTE, LOGIN_ROUTE, PROJECT_ROUTE, USERLIST_ROUTE } from '../utils/consts.js'
import {Button} from 'react-bootstrap'
import {observer} from 'mobx-react-lite'
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import {jwtDecode} from "jwt-decode";
import { getOneOtdel } from '../http/otdelAPI.js'


 const NavBar = observer(()  => {
    const {user} = useContext(Context)
    const {otdel} = useContext(Context)
    const history = useHistory()
    const token = jwtDecode(localStorage.getItem('token'))
    
    useEffect(() => {
      getOneOtdel(token.Otdel_id).then(data => otdel.setOneOtdel(data))
  }, [])
  
    const logOut =() => {
      user.setUser({})
      user.setIsAuth(false)
    }
    return (
      
      <Navbar bg="dark" data-bs-theme="dark">
        <Container >
          <NavLink style={{color: 'white'}} to={USERLIST_ROUTE}>My Project</NavLink> 
          {user.isAuth ?
            <Nav className="mr-2" style={{color:'white'}}>

              <label 
                className="d-flex align-items-center"
                style={{marginRight: "10px"}}
                >
                  {token.Name} | {otdel.OneOtdel.Name}</label>
              <Button 
                variant={"outline-light"} 
                style={{marginLeft: "20px"}}
                onClick={() => history.push(PROJECT_ROUTE)}>Проекты</Button>

              <Button 
                variant={"outline-light"} 
                style={{marginLeft: "20px"}}
                onClick={() => logOut()}>Выйти</Button>
                
            </Nav>
            :
            <Nav className="ml-auto" style={{color:'white'}}>
              <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
            </Nav>
          }
        </Container>
    </Navbar>
    )

})
export default NavBar