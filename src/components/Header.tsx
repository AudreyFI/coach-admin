import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="flex items-center flex-0 p-6 font-extrabold">
        <div className="text-xl lg:flex-grow text-right">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "lg:inline-block lg:mt-0 text-gray-300 cursor-default"
                : "lg:inline-block lg:mt-0 text-white hover:text-white"
            }
          >
            Utilisateurs
          </NavLink>
          <NavLink
            to="/subscriptions"
            className={({ isActive }) =>
              isActive
                ? "lg:inline-block lg:mt-0 text-gray-300 cursor-default px-8"
                : "lg:inline-block lg:mt-0 text-white hover:text-white px-8"
            }
          >
            Abonnements
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Header;
