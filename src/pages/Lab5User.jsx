import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useParams } from 'react-router-dom';
import useFetch from '../data/useFetch';

function Lab5User(){
  const { id } = useParams();
  const [user] = useFetch(`https://jsonplaceholder.typicode.com/users/${id}`);

  if (!user || !user.id){
    return <p>Loading user...</p>;
  }

  return (
    <>
      <h2>User details</h2>
      <Card>
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>Username: {user.username}</ListGroup.Item>
            <ListGroup.Item>Email: {user.email}</ListGroup.Item>
            <ListGroup.Item>Phone: {user.phone}</ListGroup.Item>
            <ListGroup.Item>Website: {user.website}</ListGroup.Item>
            <ListGroup.Item>Company: {user.company?.name}</ListGroup.Item>
            <ListGroup.Item>Address: {user.address?.city}, {user.address?.street} {user.address?.suite}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
}

export default Lab5User;


