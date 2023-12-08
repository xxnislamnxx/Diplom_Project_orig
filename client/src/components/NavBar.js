import React, { useContext } from 'react'
import { Context } from '../index.js'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min.js'
import { USERLIST_ROUTE } from '../utils/consts.js'
import {Button} from 'react-bootstrap'
import {observer} from 'mobx-react-lite'

 const NavBar = observer(()  => {
    const {user} = useContext(Context)
    return (
      <Navbar bg="dark" data-bs-theme="dark">
        <Container >
          <NavLink style={{color: 'white'}} to={USERLIST_ROUTE}>My Project</NavLink> 
          {user.isAuth ?
            <Nav className="mr-2" style={{color:'white'}}>
              <Button variant={"outline-light"} >Админ панель</Button>
              <Button variant={"outline-light"} style={{marginLeft: "20px"}} onClick={() => user.setIsAuth(false)}>Выйти</Button>
            </Nav>
            :
            <Nav className="ml-auto" style={{color:'white'}}>
              <Button variant={"outline-light"} onClick={() => user.setIsAuth(true)}>Авторизация</Button>
            </Nav>
          }
        </Container>
    </Navbar>
    )

})
export default NavBar