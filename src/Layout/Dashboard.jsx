import { NavLink, Outlet } from "react-router-dom";
import { FaBook, FaHome, FaList } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";


const Dashboard = () => {
  return (
    <div className="flex">
      {/* sidebar */}
      <div className="w-64 min-h-screen bg-yellow-500 p-4">
        <ul className="menu p-2">
         

          <li>
            <NavLink className='m-3 text-lg' to="/dashboard/bookParcel">
             <FaBook></FaBook>
              Book a Parcel
            </NavLink>
          </li>

          <li>
            <NavLink className='m-3 text-lg' to="/dashboard/parcels">
              <FaList></FaList>
              My Parcels
            </NavLink>
          </li>

          <li>
            <NavLink className='m-3 text-lg' to="/dashboard/profile">
             <CgProfile></CgProfile>
              My Profile
            </NavLink>
          </li>

          <div className="divider"></div>
          <li>
            <NavLink className='m-3 text-lg' to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
        </ul>
      </div>

      {/* contents */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
