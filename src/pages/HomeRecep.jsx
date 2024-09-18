import React, { useEffect, useState, useContext } from 'react';
import { OffCanvas } from '../components/OffCanvas';
import Swal from 'sweetalert2';
import { getEmailToken } from '../utils/getEmailToken';

export const HomeRecep = () => {
    const [shipments, setShipments] = useState([]);
    const emailCompany = getEmailToken();
    
    useEffect(() => {
        const fetchShipments = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/product/?=email${emailCompany}`);
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
    }, [emailCompany]);

    return (
        <>
            <OffCanvas />
            <div>
                <h2>Productos enviados a tu organización</h2>
                {shipments.length > 0 ? (
                    <ul>
                        {shipments.map((shipment) => (
                            <li key={shipment.id}>
                                <p><strong>Producto:</strong> {shipment.product}</p>
                                <p><strong>Cantidad:</strong> {shipment.quantity}</p>
                                <p><strong>Enviado por:</strong> {shipment.companyDist}</p>
                                <p><strong>Fecha de envío:</strong> {new Date(shipment.dateSend).toLocaleDateString()}</p>
                                <hr />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No se encontraron productos enviados a tu organización</p>
                )}
            </div>
        </>
    );
};
