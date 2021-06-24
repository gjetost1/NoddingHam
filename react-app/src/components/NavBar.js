import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import logo from './NoddingHamCleaner.png'
import { SearchIcon } from '@heroicons/react/solid'
//handle navbar items

const pinkButtonClassName =
  "px-8 py-2 mx-5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-500 hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white no-underline";



  const NavBar = () => {
    const history = useHistory();

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
              <NavLink
                  to="/watchlist/1"
                  exact={true}
                  activeClassName="active"
                  className={pinkButtonClassName}
                >
                  Watchlist
                </NavLink>

            </li>
            <li>

            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8">
            <div className="relative h-16 flex justify-between">
              <div className="relative z-10 px-2 flex lg:px-0">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                    />
                </div>
              </div>
              <div className="relative z-0 flex-1 px-2 flex items-center justify-end sm:absolute sm:inset-0">
                <div className="w-full sm:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">

                    <input
                      id="search"
                      name="search"
                      className="block w-full bg-gray-700 border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 focus:placeholder-gray-500 sm:text-sm"
                      placeholder="Search Stocks"
                      // fix this event handling
                      onClick={(e)=>history.push(`/stock/${e.target.value}`)}
                      type="search"
                      />
                  </div>
                </div>
              </div>
              </div>
              </div>
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

            {user && (

            <LogoutButton />
            )}

          </ul>

        </div>
      </nav>
    </div>
  );
};

export default NavBar;
