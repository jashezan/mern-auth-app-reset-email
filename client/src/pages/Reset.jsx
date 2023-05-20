import React from "react";
import { Link } from "react-router-dom";
import FormHeadingLogo from "../components/FormHeadingLogo";

const Reset = () => {
  return (
    <section className="w-full">
      <FormHeadingLogo>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Didn't Get OTP?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          <button
            type="button"
            className="font-medium text-indigo-600 hover:text-indigo-800"
          >
            Send Again
          </button>
        </p>
      </FormHeadingLogo>

      <form className="w-1/2 mx-auto">
        <div className="mb-6">
          <label
            htmlFor="otp"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            OTP Code
          </label>
          <input
            type="number"
            id="otp"
            name="otp"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Your OTP Code..."
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Send OTP
        </button>
      </form>
    </section>
  );
};

export default Reset;
