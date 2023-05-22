import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputEmail from "../components/inputs/InputEmail";
import FormHeadingLogo from "../components/FormHeadingLogo";

const Recovery = () => {
  // const { register } = useForm();

  return (
    <section className="w-full">
      <FormHeadingLogo>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/"
            className="font-medium text-indigo-600 hover:text-indigo-800"
          >
            Remember Password? then Login
          </Link>
        </p>
      </FormHeadingLogo>

      <form className="w-1/2 mx-auto">
        <InputEmail title="Your email" name="email" />
        <Link
          to={"/reset"}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Send OTP
        </Link>
      </form>
    </section>
  );
};

export default Recovery;
