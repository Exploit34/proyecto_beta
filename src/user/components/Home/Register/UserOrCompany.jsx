import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom'
import { UserSignUpForm } from './UserSignUpForm.jsx'
import { CompanySignUpForm } from './companySignUpForm.jsx';
import "./Registro.css"
export const UserorCompany = () => {
    const location = useLocation()

    const locationRegister = location.pathname === "/registerUser"

    return (
        <div className="companyorUser">
            <div className='options'>
                <NavLink className={locationRegister === false ? 'signUpUserCompany-active' : 'signupUserCompany-inactive'} to="/registerCompany">
                    Company
                </NavLink>
                <p>or</p>
                <NavLink className={locationRegister ? 'signUpUserCompany-active' : 'signupUserCompany-inactive'} to="/registerUser">
                        User
                </NavLink>
            </div>
            {location.pathname === "/registerCompany" && <CompanySignUpForm />}
            {location.pathname === "/registerUser" && <UserSignUpForm />}
        </div>
    );
};