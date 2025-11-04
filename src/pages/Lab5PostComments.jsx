import { useParams } from 'react-router-dom';
import useFetch from '../data/useFetch';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function Lab5PostComments(){
  const { id } = useParams();
  const [post] = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const [comments] = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);

  if (!post || !post.id){
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2 className="mb-3">{post.title}</h2>
      <Card className="mb-4">
        <Card.Body>{post.body}</Card.Body>
      </Card>
      <h4>Comments</h4>
      <ListGroup>
        {comments.map((c) => (
          <ListGroup.Item key={c.id}>
            <div className="fw-bold">{c.name}</div>
            <div className="text-muted small">{c.email}</div>
            <div>{c.body}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default Lab5PostComments;


