import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';

export const Product = ({ product }) => {
  return (
    <Card style={{ width: '18rem', backgroundColor: "#333", color: "#fff", display: 'flex', flexDirection: 'column' }}>
      <Card.Body style={{ flex: 1 }}>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          <strong>Descripción: </strong>{product.description}
        </Card.Text>
        <Card.Text style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          <strong>Ubicación: </strong>{product.ubication}
        </Card.Text>
        <Card.Text style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          <strong>Stock: </strong>{product.stock}
        </Card.Text>
        <Container style={{display: "flex", gap: 5, flexDirection: "row-reverse", justifyContent: "flex-end"}}>
          <Button variant="secondary">Editar</Button>
          <Button variant="success">Distribuir</Button>
        </Container>
      </Card.Body>
    </Card>
  );
};
