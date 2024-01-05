import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Comment from './Comment';
import './Sidebar.css';
import { Context } from '../..';


const Sidebar = ({show,onHide,TaskName,CreatedTask,TimeTask}) => {
  //const [show, setShow] = useState(false);

  const {user} = useContext(Context)
  let UserCreate
  let UserDate  
  let UserTime
if (show) {
   UserCreate = user.users.find(({id})=>id===CreatedTask).Name
   UserDate = TimeTask.toString().substr(0,10)
   UserTime = TimeTask.toString().split('T')[1].split('.')[0]
   
   console.log(UserDate,'|||',UserTime)
//2024-01-06 02:10:49.3830000 +00:00
}
  
  const taskData = {
    username: 'Islam',
    title: 'Task 1',
    date: '5 January, 13:04'
  }

  const comments = [
    { id: 1, title: 'Comment 1', username: 'John' },
    { id: 2, title: 'Comment 2', username: 'Dave' },
    { id: 3, title: 'Comment 3', username: 'Doe' },
  ];
/*
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
*/

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
          {comments.map(({ id, title, username }) => (<Comment comment={title} username={username} />))}
        </Offcanvas.Body>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <Button variant="outline-secondary" id="button-addon2">
            Button
          </Button>
        </InputGroup>
      </Offcanvas>
    </>
  );
}

export default Sidebar;