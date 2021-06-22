import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";

//handle navbar items

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  console.log(user);
  return (
    <div className="bg-red-300">
      <nav className="max-w-7xl mx-auto  lg:px-8" aria-label="Top">
        <div className="w-full py-6 border-b border-indigo-500 lg:border-none">
          <ul className="flex flex-row flex-1 justify-between">
            <li>
              <NavLink to="/" exact={true} activeClassName="active">
                Home
              </NavLink>
            </li>
            {!user && (
              <li>
                <NavLink to="/" exact={true} activeClassName="active">
                  Login
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
