import { jwtDecode } from "jwt-decode";

export const getEmailToken = () => {
    const token = localStorage.getItem("token");
    if(token){
      const tokenDecodificado = jwtDecode(token);
      const emailCompany = tokenDecodificado.CompanyEmail
      console.log("Email company frontend:", emailCompany)
      
      return emailCompany
    }
    return null;
  }