import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../Layout/MainLayOut";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Secret from "../pages/Shared/Secret/Secret";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Parcels from "../pages/Dashboard/Parcels/Parcels";
import BookParcel from "../pages/Dashboard/Bookings/BookParcel";
import Profile from "../pages/Dashboard/Profile/Profile";
import UpdateParcel from "../pages/Dashboard/UpdateParcel/UpdateParcel";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AllDeliveryMen from "../pages/Dashboard/AllDeliveryMen/AllDeliveryMen";
import AllParcels from "../pages/Dashboard/AllParcels/AllParcels";
import Statistics from "../pages/Dashboard/Statistics/Statistics";

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
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
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
        path: "updateParcel/:id",
        element: <UpdateParcel></UpdateParcel>,
        loader: ({params}) => fetch(`http://localhost:5000/parcels/${params.id}`)
      },

      {
        path: "profile",
        element: <Profile></Profile>,
        // loader: () => fetch('http://localhost:5000/users')
      },


      // admin routes
      {
        path: 'allParcels',
        element: <AllParcels></AllParcels>,
      },
      {
        path: 'allUsers',
        element: <AllUsers></AllUsers>,

      },
      {
        path: 'allDeliveryMen',
        element: <AllDeliveryMen></AllDeliveryMen>
      },
      {
        path: 'statistics',
        element: <Statistics></Statistics>
      }

    ],
  },
]);
