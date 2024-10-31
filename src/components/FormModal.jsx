import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import "../components/styles.public.product.css"
import { getCompanyToken } from '../utils/getCompanyToken';

export const FormModal = ({ show, handleClose }) => {
  const [product, setProduct] = useState({
    company: '',
    name: '',
    description: '',
    ubication: '',
    stock: 0
  });

  useEffect(() => {
    const companyName = getCompanyToken();
    if (companyName) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        company: companyName
      }));
    }
  }, []);

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
        setProduct({ company: product.company, name: '', description: '', ubication: '', stock: 0 });
        handleClose();
        Swal.fire({
          title: '¡Producto publicado!',
          icon: 'success',
          timer: 2000,
          background: '#222',
          backdrop: '#22222280',
          color: '#ddd',
          imageHeight: 100
        })

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
              disabled
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

          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Button variant="success" type="submit" style={{width: '100%', marginTop: 15}}>
              Publicar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
