import React, { useContext, useState } from "react";
import {Button, Form, Modal} from 'react-bootstrap'
import { setTask, setWork } from "../../http/workApi";
import {jwtDecode} from "jwt-decode";
import { Context } from "../../index";


const CreateTask = ({show,onHide}) => {
    const token = jwtDecode(localStorage.getItem('token'))
    const [value,setValue] = useState('')
    const {work} = useContext(Context)
    const  addTask = async () => 
    {
        try {
            await setTask(work.selectedWork.id,token.id,value,false)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    return (
        <Modal
        size="sm"
        show={show}
        onHide={onHide}
        centered
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Добавить задачу
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control 
                    value={value}
                    onChange={e=> setValue(e.target.value)}
                    placeholder="Введите название задачи"/>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-success" onClick={addTask}>Добавить</Button>
            <Button onClick={onHide}>Закрыть</Button>
        </Modal.Footer>
      </Modal>

    )

}
export default CreateTask;
