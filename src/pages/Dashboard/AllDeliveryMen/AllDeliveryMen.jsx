// import useAllParcel from "../../../hooks/useAllParcels";
// import useAllUsers from "../../../hooks/useAllUsers";

// const AllDeliveryMen = () => {
//   const [allUsers] = useAllUsers();
//   const [allParcels, refetch] = useAllParcel();

//   // Filter users based on the type being "deliveryMan"
//   const deliveryMen = allUsers.filter((user) => user.type === "deliveryMan");

//   return (
//     <div>
//       <h2 className="text-4xl">Total Delivery Men: {deliveryMen.length}</h2>

//       <div className="overflow-x-auto">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Delivery Man's Name</th>
//               <th>Phone Number</th>
//               {/* Additional headers as needed */}
//             </tr>
//           </thead>
//           <tbody>
//             {deliveryMen.map((user, index) => {
//               // Find the parcels associated with the current delivery man
//               const parcels = allParcels.filter((parcel) => parcel.email === user.email);

//               return (
//                 <tr key={user._id}>
//                   <th>{index + 1}</th>
//                   <td>
//                     <div className="font-bold">{user.name}</div>
//                   </td>
//                   <td>{user.phoneNumber}</td>
//                   {/* Additional cells with user information */}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllDeliveryMen;


import useAllParcel from "../../../hooks/useAllParcels";
import useAllUsers from "../../../hooks/useAllUsers";

const AllDeliveryMen = () => {
  const [allUsers] = useAllUsers();
  const [allParcels, refetch] = useAllParcel();

  // Filter users based on the type being "deliveryMan"
  const deliveryMen = allUsers.filter((user) => user.type === "deliveryMan");

  return (
    <div>
      <h2 className="text-4xl">Total Delivery Men: {deliveryMen.length}</h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Delivery Man's Name</th>
              <th>Phone Number</th>
              <th>Number of Parcel Delivered</th>
              {/* Additional headers as needed */}
            </tr>
          </thead>
          <tbody>
            {deliveryMen.map((user, index) => {
              // Find the parcels associated with the current delivery man
              const parcels = allParcels.filter((parcel) => parcel.email === user.email);

              const deliveredParcels = allParcels.filter((parcel) => parcel.deliveryManEmail === "delivered").length;

              return (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="font-bold">{user.name}</div>
                  </td>
                  <td>{parcels.length > 0 ? parcels[0].phoneNumber : 'N/A'}</td>
                  <td>{deliveredParcels}</td>

                  {/* Additional cells with user information */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDeliveryMen;
