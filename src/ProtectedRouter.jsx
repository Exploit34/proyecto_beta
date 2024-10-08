
import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from './common/context/AuthContext'
import Loader from './user/components/Loaders/Loader';

export const ProtectedRouter = () => {
    const { loading, user, isAuthenticated } = useAuth()
    if (loading) return <Loader />;
    if (!loading && !isAuthenticated) return (<Navigate to="/" />)

    return <Outlet />
}

export const ProtectedRouterCompany = () => {
    const { loadingCompany, isAuthenticatedCompany } = useAuth()
    console.log("cccc ", isAuthenticatedCompany, loadingCompany);
    if (loadingCompany) return <h1>Loading...</h1>
    if (!loadingCompany && !isAuthenticatedCompany) return (<Navigate to="/loginCompany" />)

    return <Outlet />
}

