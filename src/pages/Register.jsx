import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../components/styles.Login.css"

 export const Register = () => {
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({company, email, password, rol})
      });
      const data = await response.json();
      console.log("registro: ", data)

      if(!response.ok) {
        return console.error("No se pudo registrar")
      }
      
      Swal.fire({
        title: 'Registro de sesión exitoso!',
        text: 'Redirigiendo...',
        timer: 2000
      })

      
      setTimeout(() => {

          navigate("/login");

      }, 2000)

    } catch (error) {
      return console.error("Error al registrarse")
    }
    
  }
  return (
    <>
      <form className="containerLogin">
        <div className="subContainerLogin">
          <input className="inputLogin" type="text" value={company} placeholder="Empresa" onChange={(e) => setCompany(e.target.value)} />
          <input className="inputLogin" type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input className="inputLogin" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <input className="inputLogin" type="text" value={rol} placeholder="Rol" onChange={(e) => setRol(e.target.value)} />
          <i style={{color: '#bbb'}}>Rol: DISTRIBUIDORA o RECEPTOR</i><br />
          <span>¿Ya tenes cuenta? <a href="/login">Inicia sesiónn</a></span><br /> 
          <button className="btn btn-success buttonLogin" onClick={handleSubmit}>Send</button>
        </div>
      </form>
    </>
  )
}
