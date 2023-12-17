import React from "react";
import {Button, Form, Modal} from 'react-bootstrap'
const CreateOtdel = ({show,onHide}) => {
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
                    placeholder="Введите название отдела"/>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onHide}>Добавить</Button>
            <Button onClick={onHide}>Закрыть</Button>
        </Modal.Footer>
      </Modal>

    )

}
export default CreateOtdel;
