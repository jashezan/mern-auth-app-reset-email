import React from "react";

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

const InputEmail = ({ label, formState, ...props }) => {
  console.log(props)
  const { errors } = formState;
  const idfor = kebabCase(props.title);
  return (
    <div className="mb-6">
      <label
        htmlFor={idfor}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {props.title}
      </label>
      <input
        type="email"
        id={idfor}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="name@gmail.com"
        {...props}
      />
      {errors[props.name] && (
        <p className="text-xs text-red-500">{errors[props.name].message}</p>
      )}
    </div>
  );
};

export default InputEmail;
