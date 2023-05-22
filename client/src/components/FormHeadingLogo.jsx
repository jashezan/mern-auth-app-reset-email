import React from "react";
import { Link } from "react-router-dom";

const FormHeadingLogo = ({ children }) => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md mb-5">
      <img
        className="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default FormHeadingLogo;
