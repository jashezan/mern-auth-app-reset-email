import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import InputPassword from "../components/inputs/InputPassword";
import InputEmail from "../components/inputs/InputEmail";
import FormHeadingLogo from "../components/FormHeadingLogo";

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  return (
    <section className="w-full">
      <FormHeadingLogo>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/"
            className="font-medium text-indigo-600 hover:text-indigo-800"
          >
            Already part of out community? then Sign In
          </Link>
        </p>
      </FormHeadingLogo>

      <form className="w-1/2 mx-auto">
        <InputEmail title="Your email" name="email" />
        <InputPassword title="Your password" name="password" />
        <InputPassword title="Repeat password" name="repeatPassword" />

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              defaultValue=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
              required=""
            />
          </div>
          <label
            htmlFor="terms"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            I agree with the{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              terms and conditions
            </Link>
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Register
        </button>
      </form>
    </section>
  );
};

export default Register;
