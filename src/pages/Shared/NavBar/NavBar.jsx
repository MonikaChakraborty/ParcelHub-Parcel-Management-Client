import { Link, NavLink } from "react-router-dom";
import logo from "/logo1.png";
import { BiBellPlus } from "react-icons/bi";

import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-yellow-200 font-medium bg-sky-500 text-xl mb-2"
              : "text-yellow-300 font-medium text-xl hover:bg-sky-500 hover:text-gray-200 mb-2"
          }
        >
          Home
        </NavLink>
      </li>

      {/* <li>
        <NavLink
          to="/OurFeatures"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-gray-200 bg-amber-600 text-lg font-semibold mb-2"
              : "text-xl hover:bg-amber-600 hover:text-gray-200 text-gray-200 font-semibold"
          }
        >
          Our Features
        </NavLink>
      </li> */}

      {/* <li>
        <NavLink
          to="/footer"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-yellow-200 font-medium bg-sky-500 text-xl mb-2"
              : "text-yellow-300 font-medium text-xl hover:bg-sky-500 hover:text-gray-200 mb-2"
          }
        >
          Footer
        </NavLink>
      </li> */}


      <li>
        <NavLink
          to="/dashboard/bookParcel"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-yellow-200 font-medium bg-sky-500 text-xl mb-2"
              : "text-yellow-300 font-medium text-xl hover:bg-sky-500 hover:text-gray-200 mb-2"
          }
        >
          Dashboard
        </NavLink>
      </li>

      


      <li>
        <NavLink
          to="/secret"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-yellow-200 font-medium bg-sky-500 text-xl mb-2"
              : "text-yellow-300 font-medium text-xl hover:bg-sky-500 hover:text-gray-200 mb-2"
          }
        >
          Secret
        </NavLink>
      </li>

      <li>
          <button className="mb-2">
            <BiBellPlus className="text-3xl text-yellow-300" />

            <div className="text-lg px-3">
            
            </div>
          </button>
      </li>

      { user ? (
        <>
          <button
            onClick={handleLogout}
            className="btn mb-2 bg-gray-500 text-gray-200 text-lg font-semibold hover:text-gray-500"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <li>
            <NavLink
              className="btn mb-2 bg-gray-500 text-gray-200 text-lg font-semibold hover:text-gray-500"
              to="/login"
            >
              Login
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <>
      <div className="navbar bg-gray-800 text-white">
        <div className="navbar-start ">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-600   rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>

          
            <img className="md:w-20 w-14 object-cover" src={logo} alt="" />
          <a className="btn-ghost md:text-2xl font-bold text-sky-500">Parcel<span className="text-yellow-500">Hub</span>
          </a>
         
        </div>
        <div className="navbar-center hidden lg:flex lg:items-center lg:mt-5">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end mt-2">
        {user?.email ? (
            <div className="flex ">
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar mr-3"
                >
                  <div className="w-14 rounded-full">
                    
                    <img src={user.photoURL} alt={user.displayName} />
                  </div>
                </label>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content z-[1] shadow bg-gray-200 rounded-box w-30 lg:w-56 mt-3"
                >
                  <div>
                    <p className="  text-sm text-center py-2 rounded-md font-bold lg:text-base bg-gray-600 normal-case mb-2">
                      {user.displayName}
                    </p>
                  </div>
                 <li>
                 <Link className="btn  mb-2 bg-gray-600 " to="/dashboard/bookParcel">
                    <button
                      
                      className=" text-sm text-gray-200 text-center lg:text-base  normal-case "
                    >
                      Dashboard
                    </button>
                  </Link>
                 </li>

                  <li>
                    <button
                      onClick={logOut}
                      className="btn btn-ghost text-sm text-gray-200 lg:text-base  bg-gray-600 normal-case"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <a className="btn text-gray-200 font-semibold text-base bg-sky-500 hover:bg-sky-700 ">
                  Welcome {user?.displayName}
                </a>
              </div>
            </div>
          ) : (
            ""
            // <Link to="/login">
            //   <button className="btn mr-3">Login</button>
            // </Link>
          )}
        </div>
      </div>
    </>
  );
};


export default NavBar;
