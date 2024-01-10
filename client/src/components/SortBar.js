import React, { useContext, useEffect, useState } from "react";
import {Card, Container,Button, Row,Col, Dropdown, DropdownButton } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import WorkBar from "../components/WorkBar";
import { getTask, getWork,setWork } from "../http/workApi";
import {jwtDecode} from "jwt-decode";
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import { LOGIN_ROUTE, PROJECT_ROUTE, USERLIST_ROUTE } from '../utils/consts.js'
import CreateOtdel from "../components/modals/CreateOtdel.js";
import CreateWork from "../components/modals/CreateWork.js";
import CreateTask from "../components/modals/CreateTask.js";
import { getUsers } from "../http/userAPI.js";
import DeleteWork from "../components/modals/DeleteWork.js";
import '../components/SideBar/Sidebar.css';


const SortBar = observer(() => {
    const {otdel} = useContext(Context)
    const {user} = useContext(Context)
    const {work} = useContext(Context)
    const history = useHistory()
    const [WorkVisible,setWorkVisible] = useState(false)
    const [DelWorkVisible,setDelWorkVisible] = useState(false)
    const [Sort,setSort] = useState('')
    const [Filter,setFilter] = useState('')

   const token = jwtDecode(localStorage.getItem('token'))
   console.log(token)
   useEffect(() => {
        getWork(token.Otdel_id).then(data => work.setWorks(data))
        getUsers(token.Otdel_id).then(data => user.setUsers(data))
    }, [])
    const isSort = async (text)=>
    {
        setSort(text)
    }
    const isFilter = async (text)=>
    {
        setFilter(text)
    }
    return ( 
        <div className="d-flex align-items-center"> 
            <label className="ml-1" style={{marginRight: "3px", marginLeft: "10px"}}>Сортировка: </label>
            <DropdownButton
                id="nav-dropdown-dark-example"
                title={'по '+ Sort}
                variant="dark">
                    <Dropdown.ItemText className='sort__line'>Сортировка:</Dropdown.ItemText>
                    <Dropdown.Item as="button"
                    onClick={()=>isSort('Времени создания')}>Времени создания</Dropdown.Item>
                    <Dropdown.Item as="button"
                    onClick={()=>isSort('Выполненым задачам')}>Выполненым задачам</Dropdown.Item>
            </DropdownButton>
            <label className="ml-1" style={{marginRight: "3px", marginLeft: "10px"}}>Фильтрация:</label>
            <DropdownButton
                id="nav-dropdown-dark-example"
                title={ Filter}
                variant="dark">
                    <Dropdown.ItemText className='sort__line'>Фильтрация:</Dropdown.ItemText>
                    <Dropdown.Item as="button"
                    onClick={()=>isFilter('Мои задачи')}>Мои задачи</Dropdown.Item>
                    <Dropdown.Item as="button"
                    onClick={()=>isFilter('Показать все')}>Показать все</Dropdown.Item>
            </DropdownButton>
        </div>


)})
export default SortBar;
            