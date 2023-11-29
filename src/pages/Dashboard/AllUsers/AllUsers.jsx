import useAllParcels from "../../../hooks/useAllParcels";

import useAllUsers from "../../../hooks/useAllUsers";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [parcels, refetch] = useAllParcels();
  const [allUsers] = useAllUsers();

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

                {/* Approximate Delivery Date */}
                <td>{user.phoneNumber}</td>

                  {/* number of parcel booked by the user */}
                  <td></td>

                  {/* total spent amount by the user */}
                  <td></td>

            
                <td>
                  <button className="btn bg-orange-500  text-xl text-yellow-300">
                   
                  </button>
                </td>
                <td>
                  <button className="btn bg-sky-500  text-xl text-white">
                  
                  </button>
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
