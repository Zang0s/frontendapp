import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AppContext from '../data/AppContext';

function MyContainer({ element: Element }) {
    const context = useContext(AppContext);
    const items = context.items;
    const dispatch = context.dispatch;
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
