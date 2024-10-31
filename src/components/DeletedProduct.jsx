import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { getCompanyToken } from "../utils/getCompanyToken";

export const DeletedProduct = ({ productId }) => {

    const handleDelete = async () =>{
        try {
            const company = getCompanyToken();
            console.log(`ID OBTENIDO: ${productId}`)
            const response = await fetch(`http://localhost:3000/api/product/${productId}?company=${company}`, {
                method: "DELETE",
            });

            if(!response.ok) {
                throw({
                    statusCode: 400,
                    message: "Error al eliminar el producto"
                });
            }

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message,
            });
        }
    };

    const confirmDelete = () => {
        Swal.fire({
            showDenyButton: true,
            showCancelButton: true,
            showConfirmButton: false,
            title: "Advertencia",
            text: "Está por eliminar un producto",
            icon: "warning",
            denyButtonText: "Eliminar",
            color: '#ddd',
            background: '#222',
            backdrop: '#22222280',
            iconColor: '#f50'
        }).then((result) => {
            if(result.isDenied) {
                handleDelete(),
                Swal.fire({
                    icon: "success",
                    text: 'Producto eliminado exitosamente',
                    timer: 2000,
                    background: '#222',
                    color: '#ddd',
                    backdrop: '#22222280'
                });
            }
        })
    }

    return(
        <Button variant="danger" onClick={confirmDelete}>Eliminar</Button>
    )

}