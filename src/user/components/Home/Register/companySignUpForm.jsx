import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext.jsx";
export const CompanySignUpForm = () => {
  const { register, handleSubmit, formState: {
    errors
  } } = useForm()
  const { signupCompany, isAuthenticated, errors: registerErrors } = useAuth()
  const [classNameModal, setClassNameModal] = useState("hidden");

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    values.phoneNumber = parseInt(values.phoneNumber)
    values.taxIdentity = parseInt(values.taxIdentity)
    signupCompany(values)
  })

  function ButtonOpenModal() {
    if (isAuthenticated) {
      if (classNameModal == "hidden") {
        setClassNameModal("visible")
      } else setClassNameModal("hidden")
    }
  }

  return (
    <>
      {
        registerErrors.map((error, i) => (
          <div key={i} className="errors">
            {Array.isArray(error) ? (
              error.map((line, j) => (
                <p key={j}>{line}</p>
              ))
            ) : (
              <p key={i}>{error}</p>
            )}
          </div>
        ))
      }


      <form className="form-signup" onSubmit={onSubmit}>
        {
          errors.companyName && (
            <p className="text-red-500">companyName is required</p>
          )
        }
        <label htmlFor="companyName">Nombre de la compañía</label>
        <input
          className="form-styling"
          type="text"
          {...register('companyName', { required: true })}
        />
        {
          errors.legalEntity && (
            <p className="text-red-500">legal Entity is required</p>
          )
        }
        <label htmlFor="legalEntity">Entidad Legal</label>
        <textarea
          className="form-styling"
          type="text"
          {...register('legalEntity', { required: true })}
        />
        {
          errors.companyAddress && (
            <p className="text-red-500">company address is required</p>
          )
        }
        <label htmlFor="companyAddress">Dirección</label>
        <textarea
          className="form-styling"
          type="text"
          {...register('companyAddress', { required: true })}
        />
        {
          errors.activityDescription && (
            <p className="text-red-500">Activity description is required</p>
          )
        }
        <label htmlFor="activityDescription">Activity description</label>
        <textarea
          className="form-styling"
          type="text"
          {...register('activityDescription', { required: true })}
        />
        {
          errors.phoneNumber && (
            <p className="text-red-500">phone number is required</p>
          )
        }
        <label htmlFor="phoneNumber">Phone number</label>
        <input
          className="form-styling"
          type="number"
          {...register('phoneNumber', { required: true })}
        />

        {
          errors.email && (
            <p className="text-red-500">Email is required</p>
          )
        }
        <label htmlFor="email">Email</label>
        <input className="form-styling" type="email" {...register('email', { required: true })} />

        {
          errors.taxIdentity && (
            <p className="text-red-500">Tax identity is required</p>
          )
        }
        <label htmlFor="taxIdentity">Identidad fiscal</label>
        <input
          className="form-styling"
          type="number"
          {...register('taxIdentity', { required: true })}
        />

        {
          errors.password && (
            <p className="text-red-500">Password is required</p>
          )
        }
        <label htmlFor="password">Contraseña</label>
        <input
          className="form-styling"
          type="text"
          {...register('password', { required: true })}
        />

        {
          errors.confirmpassword && (
            <p className="text-red-500">Confirm password is required</p>
          )
        }
        <label htmlFor="confirmpassword">Confirmar contraseña</label>
        <input
          className="form-styling"
          type="text"
          {...register('confirmpassword', { required: true })}
        />
        <button onClick={ButtonOpenModal} ng-click="checked = !checked" className="btn-signup" type="submit">
          Registrarse
        </button>
      </form>
    </>
  );
};