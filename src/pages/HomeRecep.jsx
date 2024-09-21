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
                                        console.log("Shipment ID: ", shipment.id),
                                        <tr key={shipment.id}>
                                            <td>{shipment.product}</td>
                                            <td>{shipment.quantity}</td>
                                            <td>{shipment.companyDist}</td>
                                            <td>{new Date(shipment.dateSend).toLocaleDateString()}</td>
                                            <td>{shipment.statusProduct}</td>
                                            <td>
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
