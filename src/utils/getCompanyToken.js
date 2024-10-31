import { jwtDecode } from "jwt-decode";

export const getCompanyToken = () => {
    const token = localStorage.getItem("token");
    if(token){
      const tokenDecodificado = jwtDecode(token);
      const Company = tokenDecodificado.company
      
      return Company
    }
    return null;
  }