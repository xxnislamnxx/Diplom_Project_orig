import React, { useState } from "react";
import {Button, Form, Modal} from 'react-bootstrap'
import { createOtdel } from "../../http/otdelAPI";


const CreateOtdel = ({show,onHide}) => {
    const [value,setValue] = useState('')
    
    const  addOtdel = async () => 
    {
        try {
            await createOtdel(value)
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
            Добавить отдел
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control 
                    value={value}
                    onChange={e=> setValue(e.target.value)}
                    placeholder="Введите название отдела"/>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-success" onClick={addOtdel}>Добавить</Button>
            <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        </Modal.Footer>
      </Modal>

    )

  }
export default CreateOtdel;
