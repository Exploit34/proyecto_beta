import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import "./LoginRegister.css";
import { SignInForm } from '../../user/components/LoginRegister/SignInForm.jsx';

export const SignInUserorCompany = () => {
    const location = useLocation();

    const locationRegister = location.pathname === "/loginUser";

    return (
        <div className="companyorUser">
          <SignInForm />
        </div>
    );
};
