import React, { useEffect } from "react";
import { SignInForm } from "../../user/components/LoginRegister/SignInForm";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserorCompany } from "./Register/UserOrCompany";
import "./LoginRegister.css";
import { SignInUserorCompany } from "./SignInUserorCompany";
import { useAuth } from "../context/AuthContext";

const LoginRegister = () => {
  const location = useLocation();
  const registerLocation =
    location.pathname === "/registerUser" ||
    location.pathname === "/registerCompany";
  console.log(registerLocation);

  const { isAuthenticated, isAuthenticatedCompany } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticatedCompany) {
      navigate("/homeCompany");
    } else if (isAuthenticated) {
      navigate("/start");
    } else if (!isAuthenticated && !isAuthenticatedCompany) {
      navigate("/")
    }
  }, [isAuthenticated, isAuthenticatedCompany]);
  return (
    <>
      <div className="container">
        <div className="frame">
          <div className="nav">
            <ul className="links">
              <li
                className={
                  registerLocation ? "signup-inactive" : "signup-active"
                }
              >
                <NavLink to="/" className="btn">
                Iniciar sesión
                </NavLink>
              </li>
              <li
                className={
                  registerLocation ? "signup-active" : "signup-inactive"
                }
              >
                <NavLink to="/registerUser" className="btn">
                  Registrarse
                </NavLink>
              </li>
            </ul>
          </div>
          <div ng-init="checked = false">
            {location.pathname === "/registerUser" && <UserorCompany />}
           
            {location.pathname === "/" && <SignInUserorCompany />}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginRegister;
