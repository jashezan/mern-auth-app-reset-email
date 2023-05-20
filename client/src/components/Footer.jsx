import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";

const navigation = {
  main: [
    { href: "/login", name: "Login" },
    { href: "/password", name: "Password" },
    { href: "/profile", name: "Profile" },
    { href: "/recovery", name: "Recovery" },
    { href: "/register", name: "Register" },
    { href: "/reset", name: "Reset" },
  ],
  social: [
    {
      name: "Facebook",
      href: "/",
      icon: (props) => <BsFacebook {...props} />,
    },
    {
      name: "Instagram",
      href: "/",
      icon: (props) => <BsInstagram {...props} />,
    },
    {
      name: "Twitter",
      href: "/",
      icon: (props) => <BsTwitter {...props} />,
    },
    {
      name: "GitHub",
      href: "/",
      icon: (props) => <BsGithub {...props} />,
    },
    {
      name: "Dribbble",
      href: "/",
      icon: (props) => <BsDribbble {...props} />,
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-mainColor-600 mt-10">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <Link
                to={item.href}
                className="text-base text-black hover:text-white"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-black hover:text-white"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-base text-black">
          &copy; 2023 J. A. Shezan, All rights reserved.
        </p>
      </div>
    </footer>
  );
}
