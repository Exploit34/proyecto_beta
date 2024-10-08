import React, { useState, useEffect } from "react";
import { Link, NavLink } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export const SignInForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signIn, isAuthenticated, errors: signinErrors } = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(data => {
    console.log(data);
    signIn(data);
  })

  useEffect(() => {
    if (isAuthenticated) navigate("/profileUser")
  }, [isAuthenticated])

  return (
    <>
            {
              signinErrors.map((error, i) => (
                <div key={i} className="bg-red-500 text-white">
                  {error}
                </div>
              ))
            }
            <form className="form-signin" onSubmit={onSubmit}>
              <label htmlFor="email">Email</label>
              <input className="form-styling" type="email"
                {...register('email', { required: true })} />
              {
                errors.email && (
                  <p className="text-red-500">Email is required</p>
                )
              }
              <label htmlFor="password">Password</label>
              <input
                className="form-styling"
                type="password"
                {...register('password', { required: true })}
              />
              {
                errors.password && (
                  <p className="text-red-500">password is required</p>
                )
              }
              <div className="btn-animate">
                <button type="submit" >
                  <a className="btn-signin">Sign in</a>
                </button>
              </div>

            </form>
    </>
  );
}
