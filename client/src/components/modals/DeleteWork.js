import React, { useContext, useState } from "react";
import {Button, Form, Modal} from 'react-bootstrap'
import { delWork, getWork, setWork } from "../../http/workApi";
import {jwtDecode} from "jwt-decode";
import { Context } from "../..";


const DeleteWork = ({show,onHide}) => {
    const token = jwtDecode(localStorage.getItem('token'))
    const [value,setValue] = useState('')
    const {work} = useContext(Context)
    const  delWorks = async () => 
    {
        try {
            await delWork(work.selectedWork.id)
            getWork(token.Otdel_id).then(data => work.setWorks(data))
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
            Удалить проект
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label>Подтвердите удаления проекта
            </label>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-success" onClick={delWorks}>Удалить</Button>
            <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        </Modal.Footer>
      </Modal>

    )

}
export default DeleteWork;
