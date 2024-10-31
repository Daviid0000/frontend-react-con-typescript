import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getRolToken } from "../utils/getRolToken.js";
import "../components/styles.Login.css"
import { rols } from "../types/types.js";

 export const Login = () => {
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({company, password})
      });
      const data = await response.json();
      
      if(!response.ok) {
        console.error("No se pudo loguear")
        return Swal.fire({
          title: 'Error',
          text: 'Credenciales invalidas',
          icon: 'error',
          backdrop: '#22222280',
          background: '#222',
          color: '#ddd',
        })
      }

      localStorage.setItem('token', data.token);

      Swal.fire({
        title: '¡Inicio de sesión exitoso!',
        text: 'Redirigiendo...',
        timer: 2000,
        backdrop: '#22222280',
        background: '#222',
        color: '#ddd',
      })
      
      setTimeout(() => {
        const ROL = getRolToken();

        if(ROL === rols.ADMIN){
          navigate("/Home");
        }else if(ROL === rols.COMPANY_EMISOR){
          navigate("/Home")
        }else if(ROL === rols.ORGANIZATION_RECEPTOR){
          navigate("/Homerecep")
        }

      },2000)

    } catch (error) {
      return console.error("Error al loguearse")
    }
    
  }
  return (
    <>
      <form className="containerLogin" >
        <div className="subContainerLogin" style={{ paddingLeft: 25, paddingRight: 25, paddingTop: 20, paddingBottom: 20, position: 'relative', top: 170}}>
          <div style={{ fontSize: 30 }}>Inicia sesión</div>
          <input style={{ width: 300 }} className="inputLogin" type="text" value={company} placeholder="Empresa" onChange={(e) => setCompany(e.target.value)} />
          <input style={{ width: 300 }} className="inputLogin" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

          <span style={{ color: '#ddd' }}>¿No tienes una cuenta? 
            <a href="/register" style={{ textDecorationLine:'none', color: '#08a' }}> Registrate</a>
          </span><br />
          <button className="btn btn-success buttonLogin" onClick={handleSubmit}>LOGIN</button>
        </div>
      </form>
    </>
  )
}
