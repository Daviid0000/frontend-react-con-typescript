import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Product } from './Product';
import { FormModal } from './FormModal';
import {  Button } from 'react-bootstrap';
import { getCompanyToken } from '../utils/getCompanyToken';
import Swal from 'sweetalert2';


export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const company = getCompanyToken();

    if (!company) {
      Swal.fire({
        title: '¡Error!',
        icon: 'error',
        text: 'Empresa no encontrada',
        timer: 2000,
        backdrop: '#22222280',
        background: '#222',
        color: '#ddd',
      })
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/product/${company}`);
        const data = await response.json();

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
      <Row>
        {products && products.length > 0 ? (
          products.map((product) => (
            <Col key={product.id} md={3} className="mb-4">
              <Product product={product} />
            </Col>
          ))
        ) : (
          <p style={{textAlign: 'center', position: 'relative', top: 250}}>No hay productos disponibles.</p>
        )}
      </Row>
    </Container>
  );
};
