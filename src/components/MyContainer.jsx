import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useData from '../data/useData';

function MyContainer({ element: Element }) {
    const items = useData();
    return (
        <Container>
            <Row>
                {items.map((item) => (
                    <Col key={item.id} lg={4} className="mb-4">
                        <Element {...item} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default MyContainer;
