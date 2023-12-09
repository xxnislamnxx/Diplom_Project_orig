import React, { useContext } from 'react'
import { Context } from '../index.js'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min.js'
import { ADMIN_ROUTE, LOGIN_ROUTE, USERLIST_ROUTE } from '../utils/consts.js'
import {Button} from 'react-bootstrap'
import {observer} from 'mobx-react-lite'
import {useHistory} from "react-router-dom/cjs/react-router-dom";



 const NavBar = observer(()  => {
    const {user} = useContext(Context)
    const history = useHistory()

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
              <Button 
                variant={"outline-light"} 
                onClick={() => history.push(ADMIN_ROUTE)}>Админ панель</Button>
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