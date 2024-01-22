import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Context } from "..";
import { allProject, allTask, currentWork, detailProject, detailTask, userInfo } from "../http/StatisticsApi";
import { jwtDecode } from "jwt-decode";

import '../components/styles/Statistics.css'
import { getOtdel } from "../http/otdelAPI";

const Statistics = observer(() => {
    const {statistics} = useContext(Context)
    const {otdel} = useContext(Context)
    const token = jwtDecode(localStorage.getItem('token'))
    const [workVisible,setworkVisible] = useState(false)
    const [taskVisible,setTaskVisible] = useState(false)
    const [WorkDateCreate,setWorkDateCreate] = useState('') 
    const [WorkDateEnd,setWorkDateEnd] = useState('')  
    const [TaskDateCreate,setTaskDateCreate] = useState('') 
    const [TaskDateEnd,setTaskDateEnd] = useState('')  
 
    useEffect(() => {
        getOtdel().then(data => otdel.setOtdel(data))
        userInfo(token.Otdel_id).then(data => statistics.setUserInfo(data))
        allProject(token.Otdel_id).then(data => statistics.setAllProject(data))
        detailProject(token.Otdel_id).then(data => statistics.setDetailProject(data))
    }, [])
    const workSelect = async (work_id,timeStart,timeEnd) =>
    {
        currentWork(work_id).then(data => statistics.setCurrentWork(data))
        setworkVisible(true)
        setWorkDateCreate(timeStart.toString().substr(0,10)+' '+timeStart.toString().split('T')[1].split('.')[0])
        if (timeEnd) {
            setWorkDateEnd(timeEnd.toString().substr(0,10)+' '+timeEnd.toString().split('T')[1].split('.')[0])
        }else{setWorkDateEnd('')}
        allTask(work_id).then(data => statistics.setAllTask(data))

        
        //await allTask(statistics.currentWork.currentWork[0].id).then(data => statistics.setAllTask(data))

    }

    const Taskselect = async (Task_id,timeStart,timeEnd) =>
    {
        detailTask(Task_id).then(data => statistics.setDetailTask(data)).then(
            console.log(statistics.detailTask.userName))
        setTaskVisible(true)
        console.log()
        setTaskDateCreate(timeStart.toString().substr(0,10)+' '+timeStart.toString().split('T')[1].split('.')[0])
        if (timeEnd) {
            setTaskDateEnd(timeEnd.toString().substr(0,10)+' '+timeEnd.toString().split('T')[1].split('.')[0])
        }else{setTaskDateEnd('')}
    }
    //console.log(statistics.detailTask.userName)
    return (
        <>
        <Button hidden={true}>
            Печать
        </Button>
        {/* <div  className="d-flex justify-content-center flex-row"
            hidden={true}>
            <ListGroup className="d-flex justify-content-center flex-row">
           <label style={{marginRight:'20px'}}> Выберите отдел!</label>
                {otdel.otdels.map(otdell => 
                    <ListGroup.Item 
                    className="d-flex list-group-item-action"
                        style={{cursor: 'pointer'}}
                        active={otdell.id === otdel.selectedOtdel.id}
                        onClick={() => otdel.setSelectedOtdel(otdell)
                        }
                        key={otdell.id}
                    >
                        {otdell.Name}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div> */}
        <Container className="d-flex justify-content-center cont">
            <Col className="coll" md={'auto'}>
                
                <label className="line"> Информация о сотрудниках: </label>
                <div className="line1">В отделе {statistics.userInfo.rows ? statistics.userInfo.count : 'В отделе нет сотрудников'}  сотрудника </div>
                <ListGroup className="mt-0 list-group-flush listGroupShadow"
                    style={{ paddingTop: '10px' }}>
                    {statistics.userInfo.rows ?
                        statistics.userInfo.rows.map(row => 
                        <ListGroup.Item className="d-flex justify-content-between"
                            key={row.id}
                        >
                            {row.Name}
                        </ListGroup.Item>
                        ) : 'В отделе нет сотрудников'}
                </ListGroup>
            </Col>
            <Col className="coll" md={'auto'}>
                <label className="line"> Информация по проектам:</label>
                <div className="line1">Кол-во созданных проектов: {statistics.allProject.rows ? statistics.allProject.count : 'В отделе нет сотрудников'}</div>
                <ListGroup className="mt-0 list-group-flush listGroupShadow"
                    style={{ paddingTop: '10px' }}>
                    {statistics.allProject.rows ?
                        statistics.allProject.rows.map(row => 
                        <ListGroup.Item className="d-flex list-group-item-action justify-content-between"
                            style={{ cursor: 'pointer' }}
                            key={row.id}
                            onClick={()=> workSelect(row.id,row.DateTimeCreate,row.DateTimeEnd)}
                        >
                            {row.Text}
                        </ListGroup.Item>

                        ) : 'В отделе нет проектов'}
                </ListGroup>
                <div className="line1">{statistics.detailProject.AllTask ? 'Кол-во созданных задач: ' +
                    statistics.detailProject.AllTask +
                    ' / Кол-во выполненых: ' + statistics.detailProject.Compl : ''}</div>
                <div className="line1">{statistics.detailProject.AllTask ? 'Средне время затраченое на выполнение задач: ' +
                    statistics.detailProject.hourAVG + ' часов' : ''}</div>
            </Col>
        </Container>
        {statistics.currentWork.currentWork?
        <Container className="d-flex justify-content-center cont">
            <Col md={'auto'} className="coll">
                <label className="line">Подробнее о проекте:</label>
                <div className="line1">Проект: {statistics.currentWork.currentWork[0].Text}</div>
                <div className="line1">Создан: {WorkDateCreate} </div>
                <div className="line1">Время завершения: {WorkDateEnd}</div>
                <div className="line1">Процент выполнения проекта: {statistics.currentWork.procent}% </div>
                <div className="line1"> Задач в проекте: {statistics.currentWork.allTask} / Кол-во выполненых: {statistics.currentWork.complTask}</div>

            </Col>
            <Col className="coll" md={'auto'}>
                <label className="line" style={{ paddingBottom: '5px' }}>
                    Список задач:
                </label>
                <ListGroup className="mt-0 list-group-flush listGroupShadow"
                        style={{ paddingTop: '10px' }}>
                        {statistics.allTask.rows ?
                            statistics.allTask.rows.map(row => 
                                <ListGroup.Item className="d-flex list-group-item-action justify-content-between"
                                style={{ cursor: 'pointer' }}
                                key={row.id}
                                onClick={()=>Taskselect(row.id,row.DateTimeCreate,row.DateTimeEnd)}
                            >
                                {row.Text}
                                
                            </ListGroup.Item>
                            ) : 'В отделе нет сотрудников'}
                </ListGroup>
            </Col>
            {statistics.detailTask.workName?
            <Col  md={'auto'} className="coll">
                <label className="line">Подробнее о задаче:</label>
                <div className="line1">Проект: {statistics.detailTask.workName}</div>
                <div className="line1">Задача: {statistics.detailTask.currentTask.Text}</div>
                <div className="line1">Создан: {TaskDateCreate} </div>
                <div className="line1">Время завершения: {TaskDateEnd}</div>
                <div className="line1">Ответственный: {statistics.detailTask.userName} </div>
            </Col>:''}
        </Container>
        :
        ''}
        </>

    )

})
export default Statistics;