import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../Layout/MainLayOut";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Secret from "../pages/Shared/Secret/Secret";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Parcels from "../pages/Dashboard/Bookings/Parcels";
import BookParcel from "../pages/Dashboard/BookParcel";
import Profile from "../Layout/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/secret",
        element: (
          <PrivateRoute>
            <Secret></Secret>
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "parcels",
        element: <Parcels></Parcels>,
      },

      {
        path: "bookParcel",
        element: <BookParcel></BookParcel>,
      },

      {
        path: "profile",
        element: <Profile></Profile>
      },
    ],
  },
]);
