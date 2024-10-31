import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaBars } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCompanyToken } from '../utils/getCompanyToken.js'


export const OffCanvas = () => {
  const [show, setShow] = useState(false);
  const company = getCompanyToken();
  console.log("compañia: ", company)

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
            <FaBars style={{display: "flex", alignItems: "center", width: 50, height: 25}} />
        </Button>

          <Offcanvas show={show} onHide={handleClose} className="bg-dark text-white">
          <Offcanvas.Header closeButton>
              <Offcanvas.Title>¡Bienvenido {company}!</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
              <button className='btn btn-danger' onClick={sesionClose}>Cerrar sesión</button>
          </Offcanvas.Body>
          </Offcanvas>
    </>
  );
}
