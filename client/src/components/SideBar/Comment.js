import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';



const Comment = ({ username, comment }) => {
  return (
    <Card className='d-inline-flex' border='secondary' >
      <Card.Header>
        {username}
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {comment}
        </Card.Text>
      </Card.Body>
    </Card>
    // <>
    // <div className="comments__item">
    //   <h6 className='comments__title'>John</h6>
    //   <p className='comments__description'>comment 12312</p>
    // </div>
    // </>
  );
}

export default Comment;