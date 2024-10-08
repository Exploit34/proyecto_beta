import React from "react";
import { SignInForm } from "./Login/SignInForm";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { UserorCompany } from "./Register/UserOrCompany";
import "./LoginRegister.css";
const LoginRegister = () => {
  const location = useLocation();
  const registerLocation =
    location.pathname === "/registerUser" ||
    location.pathname === "/registerCompany";
  console.log(registerLocation);
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
                <NavLink to="/loginUser" className="btn">
                  Sign in
                </NavLink>
              </li>
              <li
                className={
                  registerLocation ? "signup-active" : "signup-inactive"
                }
              >
                <NavLink to="/registerUser" className="btn">
                  Sign up
                </NavLink>
              </li>
            </ul>
          </div>
          <div ng-init="checked = false">
            {location.pathname === "/registerUser" && <UserorCompany />}
            {location.pathname === "/registerCompany" && <UserorCompany />}
            {location.pathname === "/loginUser" && <SignInForm />}
            {location.pathname === "/" && <SignInForm />}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginRegister;
