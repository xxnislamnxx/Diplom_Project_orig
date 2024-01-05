import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Comment from './Comment';
import './Sidebar.css';


const Sidebar = ({show,onHide}) => {
  //const [show, setShow] = useState(false);
/*
  const {user} = useContext(Context)
  const {work} = useContext(Context)
*/

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
          <Offcanvas.Title>{taskData.title}</Offcanvas.Title>
        </Offcanvas.Header>
        <div className='task__description'>
          <p>created by <strong>{taskData.username}</strong></p>
          <p>{taskData.date}</p>
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