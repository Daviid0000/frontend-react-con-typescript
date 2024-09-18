import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "../components/styles.public.product.css"

export const FormModal = ({ show, handleClose }) => {
  const [product, setProduct] = useState({
    company: '',
    name: '',
    description: '',
    ubication: '',
    stock: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/product', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (response.ok) {
        setProduct({ company: '', name: '', description: '', ubication: '', stock: 0 });
        handleClose();
      } else {
        console.error('Error creating product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} >
      <Modal.Header closeButton className='containerPublicProduct'>
        <Modal.Title>Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body className='containerPublicProduct'>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formProductCompany" >
            <Form.Label>Company</Form.Label>
            <Form.Control
              className='inputPublicProduct'
              type="text"
              placeholder="Empresa"
              name="company"
              value={product.company}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formProductName" className='formPublicProduct'>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              className='inputPublicProduct'
              type="text"
              placeholder="Nombre de producto"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formProductDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              className='inputPublicProduct'
              as="textarea"
              rows={3}
              placeholder="Descripcion de producto"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formProductUbication">
            <Form.Label>Ubication</Form.Label>
            <Form.Control
              className='inputPublicProduct'
              type="text"
              placeholder="Dónde se ubica el producto"
              name="ubication"
              value={product.ubication}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formProductStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              className='inputPublicProduct'
              type="number"
              placeholder="Stock de producto"
              name="stock"
              value={product.stock}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="success" type="submit">
            Publicar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
