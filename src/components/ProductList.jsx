import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Product } from './Product';
import { FormModal } from './FormModal';
import {  Button } from 'react-bootstrap';


export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
    
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/product');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <Container>

      <Button variant="success" onClick={handleShowModal} className="mb-4">
        Publicar Producto
      </Button> 

      <FormModal show={showModal} handleClose={handleCloseModal} />
      <Row>
        {products.map((product) => (
          <Col key={product.id} md={3} className="mb-4">
            <Product product={product}/>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
