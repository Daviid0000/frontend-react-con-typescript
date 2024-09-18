import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const sesionClose = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }
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
            <a style={{color: '#000', fontSize: 15}} href="#">Mi Cuenta</a><br />
            <button className='btn btn-danger' onClick={sesionClose}>Cerrar sesión</button>
        </Offcanvas.Body>
        </Offcanvas>

    </>
  );
}
