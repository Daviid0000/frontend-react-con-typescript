import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Product } from './Product';
import { FormModal } from './FormModal';
import {  Button } from 'react-bootstrap';
import { getCompanyToken } from '../utils/getCompanyToken';


export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const company = getCompanyToken();
    console.log(company)
    if (!company) {
      console.error('El valor de company es inválido');
      return;
    }
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/product/${company}`);
        const data = await response.json();
        console.log("data:",data)
        // setProducts(data);
        setProducts(Array.isArray(data) ? data : []);

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
      {/* <Row>
        {products.map((product) => (
          <Col key={product.id} md={3} className="mb-4">
            <Product product={product}/>
          </Col>
        ))}
      </Row> */}
      <Row>
  {products && products.length > 0 ? (
    products.map((product) => (
      <Col key={product.id} md={3} className="mb-4">
        <Product product={product} />
      </Col>
    ))
  ) : (
    <p>No hay productos disponibles.</p>
  )}
</Row>
    </Container>
  );
};
