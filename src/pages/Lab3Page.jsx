import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import MyContainer from '../components/MyContainer';
import Lab3ProfileCard from '../components/Lab3ProfileCard';


const examplePeople = [
  {
    name: "Ala",
    id: 1
  },
  {
    name: "Ela",
    id: 2
  },
  {
    name: "Karol",
    id: 3
  },
  {
    name: "Ola",
    id: 4
  },
  {
    name: "Monika",
    id: 5
  },
  {
    name: "Robert",
    id: 6
  }
];

const Item = ({name, id, className}) => 
  <Card style={{width: `18rem`}} className="border mb-3 p-3 ms-3" key={id}>{name}</Card>;

function Lab3Page() {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="mb-4">Laboratorium 3</h1>
          
          <MyContainer element={Lab3ProfileCard}/>
        </Col>
      </Row>
    </Container>
  );
}

export default Lab3Page;
