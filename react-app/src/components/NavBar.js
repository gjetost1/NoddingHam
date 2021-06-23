import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import logo from './NoddingHamCleaner.png'
//handle navbar items

const pinkButtonClassName =
  "px-8 py-2 mx-5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-500 hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white no-underline";

  const NavBar = () => {
    const user = useSelector((state) => state.session.user);
    console.log(user);
    return (

      <div className="bg-black">
        <div class="logo-container"> <img src={logo} class="logo" /></div>

      <nav className="max-w-7xl mx-auto  lg:px-8" aria-label="Top">
        <div className="w-full py-6 border-b border-indigo-500 lg:border-none">
          <ul className="flex flex-row justify-between">
            <li>
              <NavLink
                to="/"
                exact={true}
                activeClassName="active"
                className={pinkButtonClassName}

              >
                Home
              </NavLink>
              <NavLink
                to="/portfolio"
                exact={true}
                activeClassName="active"
                className={pinkButtonClassName}
              >
                Portfolio
              </NavLink>
            </li>
            {!user && (
              <li>
                <NavLink
                  to="/login"
                  exact={true}
                  activeClassName="active"
                  className={pinkButtonClassName}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/sign-up"
                  exact={true}
                  activeClassName="active"
                  className={pinkButtonClassName}
                >
                  Sign up
                </NavLink>
              </li>
            )}

            {user && <LogoutButton />}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
