import { useEffect, useMemo, useReducer } from 'react';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import useFetch from '../data/useFetch';

function TableHeader({ title, onAsc, onDesc, onNatural }){
  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-secondary" size="sm">{title}</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={onAsc}>Ascending order</Dropdown.Item>
        <Dropdown.Item onClick={onDesc}>Descending order</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={onNatural}>Natural order</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

function tableDataReducer(state, action){
  switch(action.type){
    case 'set':
      return { data: action.data, natural: action.data };
    case 'sort_user_asc':{
      const d = [...state.data].sort((a,b) => a.user.name.localeCompare(b.user.name));
      return { ...state, data: d };
    }
    case 'sort_user_desc':{
      const d = [...state.data].sort((a,b) => b.user.name.localeCompare(a.user.name));
      return { ...state, data: d };
    }
    case 'sort_title_asc':{
      const d = [...state.data].sort((a,b) => a.post.title.localeCompare(b.post.title));
      return { ...state, data: d };
    }
    case 'sort_title_desc':{
      const d = [...state.data].sort((a,b) => b.post.title.localeCompare(a.post.title));
      return { ...state, data: d };
    }
    case 'sort_comments_asc':{
      const d = [...state.data].sort((a,b) => a.comments.length - b.comments.length);
      return { ...state, data: d };
    }
    case 'sort_comments_desc':{
      const d = [...state.data].sort((a,b) => b.comments.length - a.comments.length);
      return { ...state, data: d };
    }
    case 'natural':
      return { ...state, data: state.natural };
    default:
      return state;
  }
}

function Lab5Page(){
  const [posts] = useFetch('https://jsonplaceholder.typicode.com/posts');
  const [users] = useFetch('https://jsonplaceholder.typicode.com/users');
  const [comments] = useFetch('https://jsonplaceholder.typicode.com/comments');

  const computed = useMemo(() => {
    if (!posts.length || !users.length || !comments.length) return [];
    return posts.map((p) => ({
      user: users.find((u) => u.id === p.userId),
      post: p,
      comments: comments.filter((c) => c.postId === p.id)
    }));
  }, [posts, users, comments]);

  const [state, dispatch] = useReducer(tableDataReducer, { data: [], natural: [] });
  useEffect(() => { if (computed.length) dispatch({ type: 'set', data: computed }); }, [computed]);

  return (
    <>
      <h1>Laboratorium 5</h1>

      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>
              <TableHeader title="User" onAsc={() => dispatch({type:'sort_user_asc'})} onDesc={() => dispatch({type:'sort_user_desc'})} onNatural={() => dispatch({type:'natural'})} />
            </th>
            <th>
              <TableHeader title="Post title" onAsc={() => dispatch({type:'sort_title_asc'})} onDesc={() => dispatch({type:'sort_title_desc'})} onNatural={() => dispatch({type:'natural'})} />
            </th>
            <th className="text-end">
              <TableHeader title="Comments count" onAsc={() => dispatch({type:'sort_comments_asc'})} onDesc={() => dispatch({type:'sort_comments_desc'})} onNatural={() => dispatch({type:'natural'})} />
            </th>
          </tr>
        </thead>
        <tbody>
          {state.data.map((row) => (
            <tr key={row.post.id}>
              <td>
                <Link to={`/lab5/users/${row.user.id}`}>{row.user.name}</Link>
              </td>
              <td>
                <Accordion flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{row.post.title}</Accordion.Header>
                    <Accordion.Body>
                      {row.post.body}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </td>
              <td className="text-end">
                <Link to={`/lab5/posts/${row.post.id}/comments`}>{row.comments.length}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Lab5Page;


