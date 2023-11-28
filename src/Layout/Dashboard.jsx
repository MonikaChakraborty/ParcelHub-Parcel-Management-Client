import { NavLink, Outlet } from "react-router-dom";
import { FaBook, FaHome, FaList, FaUser, FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaPeopleGroup } from "react-icons/fa6";


const Dashboard = () => {

  const isAdmin = true;

  return (
    <div className="flex">
      {/* sidebar */}
      <div className="w-64 min-h-screen bg-yellow-500 p-4">
        <ul className="menu p-2">

          {
            isAdmin ? <>
            
            <li>
            <NavLink className='m-3 text-lg' to="/dashboard/allParcels">
             <FaList></FaList>
              All Parcels
            </NavLink>
          </li>

          <li>
            <NavLink className='m-3 text-lg' to="/dashboard/allUsers">
              <FaUsers></FaUsers>
              All Users
            </NavLink>
          </li>

          <li>
            <NavLink className='m-3 text-lg' to="/dashboard/allDeliveryMen">
            <FaPeopleGroup></FaPeopleGroup>
              All Delivery Men
            </NavLink>
          </li>

          <li>
            <NavLink className='m-3 text-lg' to="/dashboard/statistics">
             
              Statistics
            </NavLink>
          </li>


            </>
            :
            <>
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
            </>


          }
          

          {/* Home */}
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
