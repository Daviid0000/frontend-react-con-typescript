import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../components/styles.Login.css"

 export const Register = () => {
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("DISTRIBUIDORA");
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
        timer: 2000,
        backdrop: '#22222280',
        background: '#222',
        color: '#ddd',
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
        <div className="subContainerLogin" style={{ paddingLeft: 25, paddingRight: 25, paddingTop: 20, paddingBottom: 20, position: 'relative', top: 170}}>
          <div style={{ fontSize: 30 }}>Crea tu cuenta</div>
          <input style={{ width: 400 }} className="inputLogin" type="text" value={company} placeholder="Empresa" onChange={(e) => setCompany(e.target.value)} />
          <input style={{ width: 400 }} className="inputLogin" type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input style={{ width: 400 }} className="inputLogin" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <select className="inputLogin" value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="DISTRIBUIDORA">DISTRIBUIDORA</option>
            <option value="RECEPTOR">RECEPTOR</option>
          </select>
          <span>¿Ya tienes una cuenta? 
            <a href="/login" style={{ textDecorationLine:'none', color: '#08a' }}> Iniciá sesión</a>
          </span><br /> 
          <button className="btn btn-success buttonLogin" onClick={handleSubmit}>REGISTRO</button>
        </div>
      </form>
    </>
  )
}
