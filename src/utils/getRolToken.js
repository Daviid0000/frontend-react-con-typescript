import { jwtDecode } from "jwt-decode";

export const getRolToken = () => {
    const token = localStorage.getItem("token");
    if(token){
      const tokenDecodificado = jwtDecode(token);
      console.log("rol en el frontend:", tokenDecodificado.CompanyRol)
      return tokenDecodificado.CompanyRol;
    }
    return null;
  }