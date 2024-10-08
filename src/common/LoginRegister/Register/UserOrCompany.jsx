import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom'
import { UserSignUpForm } from '../../../user/components/LoginRegister/UserSignUpForm.jsx'
import "./Registro.css"
export const UserorCompany = () => {
    const location = useLocation()

    const locationRegister = location.pathname === "/registerUser"

    return (
        <div className="companyorUser">
           <UserSignUpForm />
        </div>
    );
};
