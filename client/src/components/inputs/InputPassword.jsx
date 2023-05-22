import React, { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

function generateRandomAlphanumericString(length) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }
  return randomString;
}

const kebabCase = (string) => {
  let idfor = string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
  idfor = idfor + "-" + generateRandomAlphanumericString(10);
  return idfor;
};

const InputPassword = ({ formState, ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const idfor = kebabCase(props.title);
  const { errors } = formState;
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  return (
    <div className="mb-6 relative">
      <label
        htmlFor={idfor}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {props.title}
      </label>
      <input
        type={isPasswordVisible ? "text" : "password"}
        id={idfor}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        {...props}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 top-[40%] flex items-center px-4 text-gray-600"
        onClick={togglePasswordVisibility}
      >
        {isPasswordVisible ? <MdVisibility /> : <MdVisibilityOff />}
      </button>
        {errors[props.name] && (
          <p className="text-xs text-red-500">{errors[props.name].message}</p>
        )}
    </div>
  );
};

export default InputPassword;
