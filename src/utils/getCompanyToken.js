import { jwtDecode } from "jwt-decode";

export const getCompanyToken = () => {
    const token = localStorage.getItem("token");
    if(token){
      const tokenDecodificado = jwtDecode(token);
      const Company = tokenDecodificado.company
      console.log("Empresa en el frontend:", Company)
      
      return Company
    }
    return null;
  }