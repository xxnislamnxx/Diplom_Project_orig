import React, { useContext, useEffect, useState } from "react";
import {Button, Form, ListGroup, Modal} from 'react-bootstrap'
import { getTask, setTask, setWork } from "../../http/workApi";
import {jwtDecode} from "jwt-decode";
import { Context } from "../../index";
import { getOtdel } from "../../http/otdelAPI";
import { getUsers } from "../../http/userAPI";


const CreateTask = ({show,onHide}) => {
    const token = jwtDecode(localStorage.getItem('token'))
    const [value,setValue] = useState('')
    const [User_id,setUser_id] = useState(token.id)
    const {work} = useContext(Context)
    const {user} = useContext(Context)
    
    const  addTask = async () => 
    {
        try {
            await setTask(work.selectedWork.id,User_id,value,false)
            await getTask(work.selectedWork.id).then(data => work.setTask(data))
        } catch (e) {
          alert(e.response.data.message)
        }
    }
   const getid = async (user_name) => 
    {
      await setUser_id(user.users.find( ({Name})=>Name===user_name).id)
    }

    useEffect(() => {
      getUsers(token.Otdel_id).then(data => user.setUsers(data))
  }, [])

    return (
        <Modal
       
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
            <div className="mt-3 d-flex justify-content-between align-items-center"> Назначено: 
            
              {token.PostId !==1?
                <Form.Select className=""
                  style={{marginLeft: "50px"}}
                  disabled={token.PostId !==1}
                >
                <option key={0}>{token.Name}</option>
                </Form.Select>
                :
                <Form.Select className=""
                  style={{marginLeft: "50px"}}
                  disabled={token.PostId !==1}
                  onChange={e => getid(e.target.value)}
                >
                <option key={0}>Укажите пользователя</option>
                {user.users.map(userss => 
                  <option key={userss.id}>
                      {userss.Name}
                  </option>)
                }
                </Form.Select>
              }
              
            </div>  
            {/* <div className="mt-2 d-flex flex-row-reverse">
              <Button size="sm">Изменить</Button>
            </div> */}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-success" onClick={addTask}>Добавить</Button>
            <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        </Modal.Footer>
      </Modal>

    )

}
export default CreateTask;
