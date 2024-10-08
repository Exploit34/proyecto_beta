import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext.jsx";

export const UserSignUpForm = () => {
  const [className, setClassName] = useState("hidden")

  const { register, handleSubmit, formState: {
    errors
  } } = useForm()
  const { signup, errors: registerErrors } = useAuth()

  const onSubmit = handleSubmit(async (values) => {
    signup(values)
  })
  return (
    <>
      {
        registerErrors.map((error, i) => (
          <div key={i} className="errors">
            {error.map((line, j) => (
              <p key={j}>
                <p class="bullet"></p>
                {line}
              </p>
            ))}
          </div>
        ))
      }

      <form className="form-signup" onSubmit={onSubmit}>
        <label htmlFor="fullname">Full name</label>
        <input
          className="form-styling"
          type="text"
          onChange={className}
          {...register('username', { required: true })}
        />
        {
          errors.username && (
            <p className="bg-black">Username is required</p>
          )
        }
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

        <label htmlFor="confirmpassword">Confirm password</label>
        <input
          className="form-styling"
          type="password"
          {...register('confirmpassword', { required: true })}
        />
        {
          errors.confirmpassword && (
            <p className="text-red-500">confirmpassword is required</p>
          )
        }

        <button type="submit" ng-click="checked = !checked" className="btn-signup">
          Sign Up
        </button>
      </form>

    </>
  );
};
