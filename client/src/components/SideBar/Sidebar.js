import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Comment from './Comment';
import './Sidebar.css';
import { Context } from '../..';
import { getComments, setComments } from '../../http/commentApi';
import { jwtDecode } from 'jwt-decode';
import { observer } from 'mobx-react-lite';


const Sidebar = observer(({show,onHide,TaskName,Userid,TimeTask}) => {

  const {user} = useContext(Context)
  const {work} = useContext(Context)
  const token = jwtDecode(localStorage.getItem('token'))
  const [value,setValue] = useState('')
  let UserCreate
  let UserDate  
  let UserTime

  if (show) {
   UserCreate = user.users.find(({id})=>id===Userid).Name
   UserDate = TimeTask.toString().substr(0,10)
   UserTime = TimeTask.toString().split('T')[1].split('.')[0]
}

  const addComment = async() => {

    await setComments(work.selectedTask,token.id,value).then(
      getComments(work.selectedTask).then(data => work.setComments(data))
      )
    console.log('Отправил')
    setValue('')
  }

  return (
    <>
      <Offcanvas show={show} onHide={onHide}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{TaskName}</Offcanvas.Title>
        </Offcanvas.Header>
        <div className='task__description'>
          <p>Автор: <strong>{UserCreate}</strong></p>
          <p>Создан: <strong>{UserDate + ' '+UserTime}</strong></p>
        </div>
        <Offcanvas.Body className='comments__list'>
          { work.comments.map(comment => 
            <>
              {comment.id ===0? 
                <label>
                  {comment.Text}
                </label>
                :
                <Comment 
                  comment={comment.Text}
                  username={ user.users.find(({id})=>id===comment.User_id).Name}
                />
              }
            </>
          )}
              
        </Offcanvas.Body>
        <InputGroup className="mb-3">
          <Form.Control
          value={value}
          onChange={e=>setValue(e.target.value)}
            placeholder="Введите комментарий"
            aria-label="Введите комментарий"
            aria-describedby="basic-addon2"
          />
          <Button 
            variant="outline-secondary" 
            id="button-addon2"
            onClick={addComment}
          >
            Отправить
          </Button>
        </InputGroup>
      </Offcanvas>
    </>
  );
})

export default Sidebar;