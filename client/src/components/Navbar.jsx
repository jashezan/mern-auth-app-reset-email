import { Link } from "react-router-dom";

const navigation = [
  { href: "/", name: "", current: true },
  { href: "/password", name: "Password", current: false },
  { href: "/profile", name: "Profile", current: false },
  { href: "/recovery", name: "Recovery", current: false },
  // { href: "/register", name: "Register", current: false },
  { href: "/reset", name: "Reset", current: false },
];

export default function Navbar() {
  return (
    <header className="bg-mainColor-600 mb-10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-mainColor-500 lg:border-none">
          <div className="flex items-center">
            <Link to="/">
              <span className="sr-only">Workflow</span>
              <img
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg"
                alt=""
              />
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-base font-medium text-black hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <Link
              to="/login"
              className="inline-block bg-mainColor-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-mainColor-600 hover:bg-mainColor-50"
            >
              Sign up
            </Link>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-base font-medium text-black hover:text-mainColor-50"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
