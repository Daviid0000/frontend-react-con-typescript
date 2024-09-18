import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import "../components/styles.public.product.css"

import Swal from 'sweetalert2';

export const DistributeProduct = ({ productId }) => {
  const [showModal, setShowModal] = useState(false);
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [distributed, setDistributed] = useState(0);

  const handleDistribute = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/product/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ distributed, company, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al distribuir el producto');
      }

      Swal.fire({
        icon: 'success',
        title: 'Producto distribuido',
        text: data.message,
        timer: 2000,
        
      });

      setShowModal(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };

  return (

    <>
      <Button variant="success" onClick={() => setShowModal(true)}>
        Distribuir
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton className='containerPublicProduct'>
          <Modal.Title>Distribuir Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body className='containerPublicProduct'>
          <Form>
            <Form.Group controlId="formCompany">
              <Form.Label>Nombre de la Empresa Distribuidora</Form.Label>
              <Form.Control
                className='inputPublicProduct'
                type="text"
                placeholder="Nombre de la empresa"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email de la Organización Receptora</Form.Label>
              <Form.Control
                className='inputPublicProduct'
                type="email"
                placeholder="Email de la organización"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDistributed">
              <Form.Label>Cantidad de productos a distribuir</Form.Label>
              <Form.Control
                className='inputPublicProduct'
                type="number"
                placeholder="Cantidad"
                value={distributed}
                onChange={(e) => setDistributed(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className='containerPublicProduct'>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleDistribute}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
