import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import logo from './NoddingHamCleaner.png'
import { SearchIcon } from '@heroicons/react/solid'
import {colors} from "./Portfolio/index";
import { getIndividualSecurity } from "../store/stock";

//handle navbar items

const pinkButtonClassName =
  "px-8 py-2 mx-5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-500 hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white no-underline";



  const NavBar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [search, setSearch] = useState('')
    const [errors, setErrors] = useState([])
    const {ticker} = useParams()

    //ind stock error handle
    useEffect(() => {
      (async function () {
        await dispatch(getIndividualSecurity(ticker))
        .catch(async (res) => {
          const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
          alert("hello")
          return setErrors([`Oops! ${ticker} doesn't seem to be recognized as a stock ticker!`]);
        }
      });

      })();
    }, [])


    const user = useSelector((state) => state.session.user);
    // console.log(user);
    return (

      <div style={{backgroundColor: colors.background_black}}>
      <div className="logo-container" style={{height:"5vh", display:"flex", justifyContent:"center", alignItems:"center"}}> <img src={logo} style={{margin:"auto", width:"10vw", display:"flex", justifyContent:"center"}} /></div>



      <nav className="max-w-7xl mx-auto  lg:px-8" aria-label="Top">
        <div className="w-full py-6 border-b border-indigo-500 lg:border-none">

          <ul className="flex flex-row justify-between">

            {user && (<li>

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

            </li>)}
            <li>
          {user && (
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8">
                <div className="flex-shrink-0 flex items-end">
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

                      onKeyPress={ e => {
                        if(e.key==='Enter' && e.target.value.length < 5 && e.target.value.length > 2) {

                          window.location=`/stock/${e.target.value}`
                        }
                      }}
                      // onChange={e => {setSearch(query: e.target.value)}}
                      type="search"
                      />
                </div>
              </div>
            </div>
          )}




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
