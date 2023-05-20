import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

// components
import InputPassword from "../components/inputs/InputPassword";
import InputEmail from "../components/inputs/InputEmail";
import FormHeadingLogo from "../components/FormHeadingLogo";

const Login = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    email: "",
    password: "",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section className="w-full">
      <FormHeadingLogo>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-800"
          >
            Not part of out community? then be One
          </Link>
        </p>
      </FormHeadingLogo>

      <form className="w-1/2 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,
              message: "You have entered an invalid email address!",
            },
          }}
          render={({ field, formState }) => <InputEmail title="Your email" formState={formState} {...field} />}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Password is required",
            },
          }}
          render={({ field, formState }) => (
            <InputPassword title="Your password" formState={formState} {...field}/>
          )}
        />
        <div className="flex justify-between mb-6">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                defaultValue=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                name="remember"
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Remember me
            </label>
          </div>
          <div className="text-sm text-indigo-600">
            <Link to={"/recovery"}>Forgot Password?</Link>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
