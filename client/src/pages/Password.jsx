import React, { useState } from "react";
import InputPassword from "../components/inputs/InputPassword";
import FormHeadingLogo from "../components/FormHeadingLogo";

const Password = () => {
  return (
    <section className="w-full">
      <FormHeadingLogo>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset Your Password
        </h2>
      </FormHeadingLogo>
      <form className="w-1/2 mx-auto">
        <InputPassword title="New password" name="newPassword" />
        <InputPassword title="Repeat password" name="repearPassword" />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Reset
        </button>
      </form>
    </section>
  );
};

export default Password;
