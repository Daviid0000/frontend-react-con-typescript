import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

 export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log(`Usuario: ${username} Contraseña: ${password}`)
  
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password})
      });

      const data = await response.json();

      console.log(`Datos enviados al backend: ${data.token}`)

      if(!response.ok) {
        return console.error("No se pudo loguear")
      }
      
      localStorage.setItem('token', data.token);

      Swal.fire({
        title: '¡Inicio de sesión exitoso!',
        text: 'Redirigiendo...',
        timer: 2000
      })

      navigate("/Home")

    } catch (error) {
      return console.error("Error al loguearse")
    }
    
  }
  return (
    <>
      <form>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </form>
      <button onClick={handleSubmit}>Send</button>
    </>
  )
}