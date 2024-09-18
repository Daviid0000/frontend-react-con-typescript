import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBars } from "react-icons/fa";


export const OffCanvas = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        <Button variant="dark" onClick={handleShow} >
            <FaBars style={{display: "flex", alignItems: "center"}} />
        </Button>

        <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Perfil</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <a style={{color: '#000', fontSize: 15}} href="#">Mi Cuenta</a>
        </Offcanvas.Body>
        </Offcanvas>

    </>
  );
}
