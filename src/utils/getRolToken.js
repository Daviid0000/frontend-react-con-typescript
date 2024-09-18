import { jwtDecode } from "jwt-decode";

export const getRolToken = () => {
    const token = localStorage.getItem("token");
    if(token){
      const tokenDecodificado = jwtDecode(token);
      const rolCompany = tokenDecodificado.CompanyRol
      
      return rolCompany
    }
    return null;
  }