// import React, { useEffect, useState, useContext } from 'react';
// import { OffCanvas } from '../components/OffCanvas';
// import Swal from 'sweetalert2';
// import { getEmailToken } from '../utils/getEmailToken';

// export const HomeRecep = () => {
//     const [shipments, setShipments] = useState([]);
//     const emailCompany = getEmailToken();
    
//     useEffect(() => {
//         const fetchShipments = async () => {
//             try {
//                 const response = await fetch(`http://localhost:3000/api/product/?=email${emailCompany}`);
//                 const data = await response.json();

//                 if (!response.ok) {
//                     throw new Error(data.message || 'Error al obtener los productos enviados');
//                 }

//                 if (Array.isArray(data.shipments)) {
//                     setShipments(data.shipments); 
//                 } else {
//                     setShipments([]); 
//                 }
//             } catch (error) {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error',
//                     text: error.message,
//                 });
//             }
//         };

//         fetchShipments();
//     }, [emailCompany]);

//     return (
//         <>
//             <OffCanvas />
//             <div>
//                 <h2>Productos enviados a tu organización</h2>
//                 {shipments.length > 0 ? (
//                     <ul>
//                         {shipments.map((shipment) => (
//                             <li key={shipment.id}>
//                                 <p><strong>Producto:</strong> {shipment.product}</p>
//                                 <p><strong>Cantidad:</strong> {shipment.quantity}</p>
//                                 <p><strong>Enviado por:</strong> {shipment.companyDist}</p>
//                                 <p><strong>Fecha de envío:</strong> {new Date(shipment.dateSend).toLocaleDateString()}</p>
//                                 <hr />
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p>No se encontraron productos enviados a tu organización</p>
//                 )}
//             </div>
//         </>
//     );
// };

import React, { useEffect, useState } from 'react';
import { OffCanvas } from '../components/OffCanvas';
import Swal from 'sweetalert2';
import { getCompanyToken } from '../utils/getCompanyToken';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';

export const HomeRecep = () => {
    const [shipments, setShipments] = useState([]);
    const company = getCompanyToken();
    
    useEffect(() => {
        const fetchShipments = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products/${company}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Error al obtener los productos enviados');
                }
 
                // if (data.shipments && typeof data.shipments === 'object') {
                //     setShipments([data.shipments]);
                // } else {
                //     setShipments([]); 
                // }
                if (Array.isArray(data.shipments)) {
                    setShipments(data.shipments);
                } else {
                    setShipments([]); 
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                });
            }
        };

        fetchShipments();
    }, [company]);

    // Función para confirmar recepción del producto
    const handleReceived = async (shipmentId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/productReceived/${shipmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Error al confirmar recepción');
            }

            // Actualizar el estado local de los envíos
            setShipments((prevShipments) =>
                prevShipments.map((shipment) =>
                    shipment.id === shipmentId
                        ? { ...shipment, statusProduct: 'RECIBIDO', dateReceived: new Date() }
                        : shipment
                )
            );

            Swal.fire({
                icon: 'success',
                title: 'Recibido',
                text: 'El producto ha sido marcado como recibido',
            });
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
            <OffCanvas />
            <Container className="mt-4">
                <Row>
                    <Col>
                        <h2 className="mb-4">Productos enviados a tu organización</h2>
                        {shipments.length > 0 ? (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Enviado por</th>
                                        <th>Fecha de envío</th>
                                        <th>Estado</th>
                                        <th>Marcar como recibido</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shipments.map((shipment) => (
                                        <tr key={shipment.id}>
                                            <td>{shipment.product}</td>
                                            <td>{shipment.quantity}</td>
                                            <td>{shipment.companyDist}</td>
                                            <td>{new Date(shipment.dateSend).toLocaleDateString()}</td>
                                            <td>{shipment.statusProduct}</td>
                                            <td>
                                                {/* {shipment.statusProduct !== 'RECIBIDO' ? (
                                                    <Button
                                                        variant="success"
                                                        onClick={() => handleReceived(shipment.id)}
                                                    >
                                                        Recibido
                                                    </Button>
                                                ) : (
                                                    <span className="text-success">
                                                        Recibido el {new Date(shipment.dateReceived).toLocaleDateString()}
                                                    </span>
                                                )} */}
                                                <Button
                                                    variant="success"
                                                    onClick={() => handleReceived(shipment.id)}
                                                    disabled={shipment.statusProduct === 'RECIBIDO'}
                                                >
                                                    {shipment.statusProduct === 'RECIBIDO' ? 'Recibido' : 'Marcar como recibido'}
                                                    {shipment.statusProduct === 'RECIBIDO' && (
                                                        <span className='text-success'>
                                                            Reibido el {new Date(shipment.dateReceived).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <p>No se encontraron productos enviados a tu organización</p>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
};
