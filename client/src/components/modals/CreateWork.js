import React, { useState } from "react";
import {Button, Form, Modal} from 'react-bootstrap'
import { setWork } from "../../http/workApi";
import {jwtDecode} from "jwt-decode";


const CreateWork = ({show,onHide}) => {
    const token = jwtDecode(localStorage.getItem('token'))
    const [value,setValue] = useState('')
    
    const  addWork = async () => 
    {
        try {
            await setWork(token.Otdel_id,value,0)
            
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
            Добавить проект
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control 
                value={value}
                onChange={e=> setValue(e.target.value)}
                    placeholder="Введите название проекта"/>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-success" onClick={addWork}>Добавить</Button>
            <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        </Modal.Footer>
      </Modal>

    )

}
export default CreateWork;
