import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export const EditProduct = ({ productEdit }) => {
  const [show, setShow] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    company: productEdit.company,
    name: productEdit.name,
    description: productEdit.description,
    ubication: productEdit.ubication,
    stock: productEdit.stock,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/product/${productEdit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProduct),
      });

      if (!response.ok) {
        throw new Error('Error al editar el producto');
      }

      Swal.fire({
        icon: 'success',
        title: 'Producto editado con éxito',
        timer: 2000,
        backdrop: '#22222280',
        background: '#222',
        color: '#ddd',
      });

      handleClose();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
        backdrop: '#22222280',
        background: '#222',
        color: '#ddd',
      });
    }
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>Editar</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='containerPublicProduct'>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body className='containerPublicProduct'>
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>Empresa</Form.Label>
              <Form.Control
                className='inputPublicProduct'
                type="text"
                name="name"
                value={editedProduct.company}
                onChange={handleChange}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formProductName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                className='inputPublicProduct'
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                className='inputPublicProduct'
                as="textarea"
                rows={3}
                name="description"
                value={editedProduct.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductUbication">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                className='inputPublicProduct'
                type="text"
                name="ubication"
                value={editedProduct.ubication}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                className='inputPublicProduct'
                type="number"
                name="stock"
                value={editedProduct.stock}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className='containerPublicProduct' style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
          <Button variant="secondary" onClick={handleClose} style={{width: '48%'}}>Cerrar</Button>
          <Button variant="success" onClick={handleEditSubmit} style={{width: '48%'}}>Guardar Cambios</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
