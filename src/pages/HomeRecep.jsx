import React, { useEffect, useState } from 'react';
import { OffCanvas } from '../components/OffCanvas';
import Swal from 'sweetalert2';
import { getCompanyToken } from '../utils/getCompanyToken';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import "../components/styles.homeRecep.css"

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
            <Container className="mt-4 custom-container">
    <Row>
        <Col>
            <h2 className="mb-4 custom-heading">Productos enviados a tu organización</h2>
            {shipments.length > 0 ? (
                <Table striped bordered hover className="custom-table">
                    <thead className="custom-thead">
                        <tr className="custom-row">
                            <th className="custom-header titles">Producto</th>
                            <th className="custom-header titles">Cantidad</th>
                            <th className="custom-header titles">Enviado por</th>
                            <th className="custom-header titles">Fecha de envío</th>
                            <th className="custom-header titles">Estado</th>
                            <th className="custom-header titles">Marcar como recibido</th>
                        </tr>
                    </thead>
                    <tbody className="custom-tbody">
                        {shipments.map((shipment) => (
                            <tr key={shipment.id} className="custom-row">
                                <td className="custom-cell" style={{backgroundColor: '#333', color: '#ddd'}}>{shipment.product}</td>
                                <td className="custom-cell" style={{backgroundColor: '#333', color: '#ddd'}}>{shipment.quantity}</td>
                                <td className="custom-cell" style={{backgroundColor: '#333', color: '#ddd'}}>{shipment.companyDist}</td>
                                <td className="custom-cell" style={{backgroundColor: '#333', color: '#ddd'}}>{new Date(shipment.dateSend).toLocaleDateString()}</td>
                                <td className="custom-cell" style={{backgroundColor: '#333', color: '#ddd'}}>{shipment.statusProduct}</td>
                                <td className="custom-cell" style={{backgroundColor: '#333', color: '#ddd'}}>
                                    <Button
                                        variant="success"
                                        onClick={() => handleReceived(shipment.id)}
                                        disabled={shipment.statusProduct === 'RECIBIDO'}
                                        className="custom-button"
                                    >
                                        Recibido
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p className="custom-no-products">No se encontraron productos enviados a tu organización</p>
            )}
        </Col>
    </Row>
</Container>
        </>
    );
};
