import { NavLink, Outlet } from "react-router-dom";
import { FaBook, FaList } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";


const Dashboard = () => {
  return (
    <div className="flex">
      {/* sidebar */}
      <div className="w-64 min-h-screen bg-yellow-500">
        <ul className="menu p-4">
         

          <li>
            <NavLink to="/dashboard/bookParcel">
             <FaBook></FaBook>
              Book a Parcel
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/parcels">
              <FaList></FaList>
              My Parcels
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/profile">
             <CgProfile></CgProfile>
              My Profile
            </NavLink>
          </li>
        </ul>
      </div>

      {/* contents */}
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
