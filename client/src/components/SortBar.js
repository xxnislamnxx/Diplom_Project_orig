import React, { useContext, useEffect, useState } from "react";
import {Button, Dropdown, DropdownButton, Row,Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import {useHistory} from "react-router-dom/cjs/react-router-dom";

import '../components/SideBar/Sidebar.css';
import { getTask } from "../http/workApi";


const SortBar = observer(({onHide}) => {
    const {otdel} = useContext(Context)
    const {user} = useContext(Context)
    const {work} = useContext(Context)
    const history = useHistory()
    const [Sort,setSort] = useState('')
    const [Filter,setFilter] = useState('')
    const [Dir,setDir] = useState(true)
    const [DirValue,setDirValue] = useState('')
    let text = '▼▲'

    const isSort = async (text,textt)=>
    {
        work.setSortCol(text)
        setSort(textt)
        if (work.SortDir) {
            setDirValue('ASC')
        } else {
            setDirValue('DESC')
        }
        getTask(work.selectedWork.id,work.SortCol,work.SortDir).then(data => work.setTask(data))

        
    }
    const isFilter = async (text,textt)=>
    {
        setFilter(textt)
    }
    
    const isDir = async (dir)=>
    {
        setDir(!dir)
        if (dir) {
            work.setSortDir('ASC')
        } else {
            work.setSortDir('DESC')
        }
    }
    
    if (Dir) {
        text='▼'

    } else {
        text = '▲'

    }
    return ( 
        <><div
        hidden={onHide}
        ><div className="d-flex align-items-center">
            <label className="ml-1" style={{ marginRight: "3px", marginLeft: "10px" }}>Сортировка: </label>
            <DropdownButton
                id="nav-dropdown-dark-example"
                title={'по ' + Sort}
                variant="dark">
                <Row>
                    <Col>
                        <Dropdown.ItemText className='sort__line'>Сортировка:
                            <Button
                                variant="outline-secondary"
                                // size="sm"
                                className="mt-1"
                                style={{ marginLeft: '5px' }}
                                onClick={() => isDir(Dir)}
                            >{text}</Button>
                        </Dropdown.ItemText>

                        <Dropdown.Item as="button"
                            onClick={() => isSort('DateTimeCreate', 'Времени создания')}>Времени создания</Dropdown.Item>
                        <Dropdown.Item as="button"
                            onClick={() => isSort('Completed', 'Выполненым задачам')}>Выполненым задачам

                        </Dropdown.Item>
                    </Col>
                </Row>

                <Button
                    variant="outline-secondary"
                    size="sm"
                    className="mt-1"
                    style={{ marginLeft: '60px' }}
                    onClick={() => isSort('', '')}
                >Очистить</Button>
            </DropdownButton>
            {/* <label className="ml-1" style={{ marginRight: "3px", marginLeft: "10px" }}>Фильтрация:</label>
            <DropdownButton
                id="nav-dropdown-dark-example"
                title={Filter}
                variant="dark">
                <Dropdown.ItemText className='sort__line'>Фильтрация:</Dropdown.ItemText>
                <Dropdown.Item as="button"
                    onClick={() => isFilter('Мои задачи')}>Мои задачи</Dropdown.Item>
                <Dropdown.Item as="button"
                    onClick={() => isFilter('Показать все')}>Показать все</Dropdown.Item>
                <Button
                    variant="outline-secondary"
                    size="sm"
                    className="mt-1"
                    style={{ marginLeft: '45px' }}
                    onClick={() => isFilter('', '')}
                >Очистить</Button>
            </DropdownButton> */}
        </div></div></>


)})
export default SortBar;
            