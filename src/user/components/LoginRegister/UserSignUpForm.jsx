import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../common/context/AuthContext";

export const UserSignUpForm = () => {
  const [className, setClassName] = useState("hidden");

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, errors: registerErrors } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <>
      {
        registerErrors.map((error, i) => (
          <div key={i} className="errors">
            {error.map((line, j) => (
              <p key={j}>
                <p className="bullet"></p>
                {line}
              </p>
            ))}
          </div>
        ))
      }

      <form className="form-signup" onSubmit={onSubmit}>
        <label htmlFor="fullname">Nombre de usuario</label>
        <input
          className="form-styling"
          type="text"
          onChange={className}
          {...register('username', { required: true })}
        />
        {
          errors.username && (
            <p className="bg-black">El nombre de usuario es obligatorio</p>
          )
        }
        <label htmlFor="email">Correo electrónico</label>
        <input className="form-styling" type="email"
          {...register('email', { required: true })} />
        {
          errors.email && (
            <p className="text-red-500">El correo electrónico es obligatorio</p>
          )
        }
        <label htmlFor="password">Contraseña</label>
        <input
          className="form-styling"
          type="password"
          {...register('password', { required: true })}
        />
        {
          errors.password && (
            <p className="text-red-500">La contraseña es obligatoria</p>
          )
        }

        <label htmlFor="confirmpassword">Confirmar contraseña</label>
        <input
          className="form-styling"
          type="password"
          {...register('confirmpassword', { required: true })}
        />
        {
          errors.confirmpassword && (
            <p className="text-red-500">La confirmación de la contraseña es obligatoria</p>
          )
        }

        <button type="submit" ng-click="checked = !checked" className="btn-signup">
          Registrarse
        </button>
      </form>

    </>
  );
};
