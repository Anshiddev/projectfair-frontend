import React, { useContext } from "react";
import { MDBContainer, MDBNavbar, MDBNavbarBrand } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { tokenAuthContext } from "../context_api/AuthContext";


function Header({ status }) {

  const {authStatus,setAuthStatus} = useContext(tokenAuthContext)
  const navigate = useNavigate()
  const logOut =()=>{
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('username')
    navigate('/')
    setAuthStatus(false)
  }

  return (
    <MDBNavbar light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand href="">
          <i className="fa-solid fa-peseta-sign fa-2x"></i>
          <i className="fa-solid fa-florin-sign fa-2x"></i>
          Project Fair
        </MDBNavbarBrand>
        {!status && (
          <button className="btn btn-danger" onClick={logOut}>
            Logout &nbsp;
            <i className="fa-solid fa-person-walking-dashed-line-arrow-right"></i>
          </button>
        )}
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Header;
