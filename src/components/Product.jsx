import React from 'react';
import { Card, Container } from 'react-bootstrap';
import "../components/styles.products.css"
import { DeletedProduct } from './DeletedProduct';
import { EditProduct } from './editProduct';
import { DistributeProduct } from './DistributeProduct';

export const Product = ({ product }) => {
  return (
    <Card className='cardContainer'>
      <Card.Body className='cardBody'>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className='cardText'>
          <strong>Empresa distribuidora: </strong>{product.company}
        </Card.Text>
        <Card.Text className='cardText'>
          <strong>Descripción: </strong>{product.description}
        </Card.Text>
        <Card.Text className='cardText'>
          <strong>Ubicación: </strong>{product.ubication}
        </Card.Text>
        <Card.Text className='cardText'>
          <strong>Stock: </strong>{product.stock}
        </Card.Text>
        <Container className="buttonProduct">
          <DeletedProduct productId={product.id} />
          <EditProduct productEdit={product} variant="secondary" />
          <DistributeProduct productId={product.id} variant="success" />
        </Container>
      </Card.Body>
    </Card>
  );
};
