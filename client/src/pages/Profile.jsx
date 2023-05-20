import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import InputPassword from "../components/inputs/InputPassword";
import InputEmail from "../components/inputs/InputEmail";

const Profile = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <section className="w-full">
      <form className="w-1/2 mx-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4">
          <label data-tooltip-target="tooltip-default" htmlFor="profile-pic">
            <CgProfile className="mx-auto h-24 p-1 rounded-full w-auto border border-gray-300" />
          </label>
          <input
            type="file"
            className="hidden"
            name="profile-pic"
            id="profile-pic"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register your account
          </h2>
        </div>
        <InputEmail title="Your email" name="email" />
        <InputPassword title="Current Password" name="currentPassword" />
        <InputPassword title="New Password" name="newPassword" />
        <InputPassword title="Repeat Password" name="repeatPassword" />

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Update Profile
        </button>
      </form>
    </section>
  );
};

export default Profile;
