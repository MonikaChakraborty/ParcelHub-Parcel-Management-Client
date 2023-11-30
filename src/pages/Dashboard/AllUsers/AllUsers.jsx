import Swal from "sweetalert2";
import useAllParcels from "../../../hooks/useAllParcels";

import useAllUsers from "../../../hooks/useAllUsers";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUser } from "react-icons/fa";
import { MdMan } from "react-icons/md";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [parcels] = useAllParcels();
  const [allUsers, refetch] = useAllUsers();

  // count the number of parcels booked by a user
  const countParcels = (email) => {
    return parcels.filter((parcel) => parcel.email === email).length;
  };

  const totalCost = (email) => {
    return parcels
      .filter((parcel) => parcel.email === email)
      .reduce((total, item) => total + item.price, 0);
  };

  const getUserType = (email) => {
    const user = allUsers.find((user) => user.email === email);
    return user ? user.type : null;
  };

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`allUsers/admin/${user.email}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleMakeDeliveryMan = (user) => {
    axiosSecure.patch(`allUsers/deliveryMan/${user.email}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is a Delivery Man Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // const countParcelsByUser = (userId) => {
  //   return allParcels.filter((parcel) => parcel.userId === userId).length;
  // };

  // const userDeliveryMan = allUsers.filter(
  //   (user) => user.type === "deliveryMan"
  // );

  return (
    <div>
      <div className="flex justify-evenly mb-8">
        <h2 className="text-4xl">Total User: {parcels.length}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>User's Name</th>

              <th>Phone Number</th>
              <th>Number of Parcel Booked</th>
              <th>Total Spent Amount</th>
              <th>Make Delivery Man</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="font-bold">{user.name}</div>
                </td>

                <td>{user.phoneNumber}</td>

                <td className="text-center">{countParcels(user.email)}</td>

                <td className="text-center">{totalCost(user.email)}</td>

                <td>
                  {getUserType(user.email) === "deliveryMan" ? (
                    <div className="text-lg font-bold text-orange-500 ">
                      Delivery Man
                    </div>
                  ) : (
                    <button
                      onClick={() => handleMakeDeliveryMan(user)}
                      className="btn bg-orange-500 text-xl text-yellow-300"
                    >
                      <MdMan></MdMan>
                    </button>
                  )}
                </td>

                <td>
                  {getUserType(user.email) === "admin" ? (
                    <div className="text-lg font-bold text-orange-500 ">
                      Admin
                    </div>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn bg-orange-500  text-xl text-yellow-300"
                    >
                      <FaUser></FaUser>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
