// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useAllParcels from "../../../hooks/useAllParcels";
// import { useForm } from "react-hook-form";
// import useAllUsers from "../../../hooks/useAllUsers";
// import Swal from "sweetalert2";
// import { useState } from "react";

// const AllParcels = () => {
//   const axiosSecure = useAxiosSecure();
//   const [allParcels, refetch] = useAllParcels();
//   const [allUsers] = useAllUsers();
//   const userDeliveryMan = allUsers.filter((user) => user.type === "deliveryMan");
//   const { register, handleSubmit, reset, control } = useForm();
//   const [currentParcelId, setCurrentParcelId] = useState(null);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   const openModal = (parcelId) => {
//     setCurrentParcelId(parcelId);
//     document.getElementById(parcelId).showModal();
//   };

//   const onSubmit = async (data) => {
//     const parcelItem = {
//       deliveryManId: data.deliveryManId,
//       deliveryManEmail: data.deliveryManEmail,
//       approximateDeliveryDate: data.approximateDeliveryDate,
//       bookingStatus: data.bookingStatus,
//     };

//     try {
//       const parcelResult = await axiosSecure.patch(
//         `/updateParcels/${currentParcelId}`,
//         parcelItem
//       );

//       if (parcelResult.data.modifiedCount > 0) {
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "Your Parcel is Updated",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         refetch();
//       }

//       console.log("Sending PATCH request for parcel ID:", currentParcelId);
//       console.log(parcelResult.data);
//     } catch (error) {
//       console.error("Error updating parcel:", error);
//     }
//   };

//   const handleStartDateChange = (e) => {
//     setStartDate(e.target.value);
//   };

//   const handleEndDateChange = (e) => {
//     setEndDate(e.target.value);
//   };

//   const handleSearch = async () => {
//     try {
//       const formattedStartDate = startDate ? new Date(startDate).toISOString().split('T')[0] : '';
//       const formattedEndDate = endDate ? new Date(endDate).toISOString().split('T')[0] : '';

//       const result = await axiosSecure.get(`/allParcels?startDate=${formattedStartDate}&endDate=${formattedEndDate}`);
//       refetch(result.data);
//     } catch (error) {
//       console.error('Error fetching parcels:', error);
//     }
//   };

//   return (
//     <div>
//      <div className="flex justify-evenly mb-8">
//         <h2 className="text-4xl">Total Parcels: {allParcels.length}</h2>
//       </div>

//       <div className="flex justify-evenly mb-8">
//         <div className="form-control">
//           <label className="label">
//             <span className="label-text">Start Date</span>
//           </label>
//           <input
//             type="date"
//             value={startDate}
//             onChange={handleStartDateChange}
//             className="input input-bordered w-full"
//           />
//         </div>
//         <div className="form-control">
//           <label className="label">
//             <span className="label-text">End Date</span>
//           </label>
//           <input
//             type="date"
//             value={endDate}
//             onChange={handleEndDateChange}
//             className="input input-bordered w-full"
//           />
//         </div>
//         <button className="btn" onClick={handleSearch}>
//           Search
//         </button>
//       </div>


//       <div className="overflow-x-auto">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>User's Name</th>
//               <th>User's Phone Number</th>
//               <th>Booking Date</th>
//               <th>requestedDeliveryDate</th>
//               <th>Cost</th>
//               <th>Status</th>
//               <th>Manage</th>
//             </tr>
//           </thead>
//           <tbody>
//             {allParcels.map((parcel, index) => (
//               <tr key={parcel._id}>
//                 <th>{index + 1}</th>
//                 <td>
//                   <div className="font-bold">{parcel.name}</div>
//                 </td>
//                 <td>{parcel.phoneNumber}</td>
//                 <td>{parcel.bookingDate}</td>
//                 <td>{parcel.requestedDeliveryDate}</td>
//                 <td>{parcel.price}</td>
//                 <td>{parcel.bookingStatus}</td>
//                 <td>
//                   <button className="btn" onClick={() => openModal(parcel._id)}>
//                     Manage
//                   </button>
//                   <dialog
//                     id={parcel._id}
//                     className="modal modal-bottom sm:modal-middle"
//                   >
//                     <div className="modal-box">
//                       {currentParcelId !== null && (
//                         <form onSubmit={handleSubmit(onSubmit)}>
//                           <input
//                             type="hidden"
//                             {...register("parcelId")}
//                             value={currentParcelId}
//                           />
//                           <div className="form-control">
//                             <label className="label">
//                               <span className="label-text">
//                                 Delivery Man ID
//                               </span>
//                             </label>
//                             <select
//                               {...register("deliveryManId", { required: true })}
//                               defaultValue={parcel.deliveryManId || ""}
//                               className="select select-bordered"
//                             >
//                               <option value="" disabled>
//                                 Select Delivery Man ID
//                               </option>
//                               {userDeliveryMan.map((deliveryMan) => (
//                                 <option
//                                   className="text-black"
//                                   key={deliveryMan._id}
//                                   value={deliveryMan._id}
//                                 >
//                                   {deliveryMan.name} ({deliveryMan._id})
//                                 </option>
//                               ))}
//                             </select>
//                           </div>


//                           {/* delivery man email */}

//                           <div className="form-control">
//                             <label className="label">
//                               <span className="label-text">
//                                 Delivery Man Email
//                               </span>
//                             </label>
//                             <select
//                               {...register("deliveryManEmail", { required: true })}
//                               defaultValue={parcel.deliveryManEmail || ""}
//                               className="select select-bordered"
//                             >
//                               <option value="" disabled>
//                                 Select Delivery Man Email
//                               </option>
//                               {userDeliveryMan.map((deliveryMan) => (
//                                 <option
//                                   className="text-black"
//                                   key={deliveryMan.email}
//                                   value={deliveryMan.email}
//                                 >
//                                   {deliveryMan.email}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>

//                           <div className="form-control w-full my-6">
//                             <label className="label">
//                               <span className="label-text">
//                                 Approximate Delivery Date
//                               </span>
//                             </label>
//                             <input
//                               type="Date"
//                               placeholder=""
//                               {...register("approximateDeliveryDate")}
//                               className="input input-bordered w-full"
//                             />
//                           </div>

//                           <div className="form-control w-full my-6">
//                             <label className="label">
//                               <span className="label-text">
//                                 Update Booking Status
//                               </span>
//                             </label>
//                             <input
//                               type="text"
//                               defaultValue={parcel.bookingStatus}
//                               {...register("bookingStatus")}
//                               className="input input-bordered w-full"
//                             />
//                           </div>

//                           <button className="btn" type="submit">
//                             Assign
//                           </button>

//                           <p className="py-4">
//                             Press ESC key or click the button below to close
//                           </p>
//                         </form>
//                       )}
//                       <div className="modal-action">
//                         <button
//                           className="btn"
//                           onClick={() => document.getElementById(parcel._id).close()}
//                         >
//                           Close
//                         </button>
//                       </div>
//                     </div>
//                   </dialog>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllParcels;


import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAllParcels from "../../../hooks/useAllParcels";
import { useForm } from "react-hook-form";
import useAllUsers from "../../../hooks/useAllUsers";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const AllParcels = () => {
  const [singleParcel, setSingleParecl] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [allParcels, refetch] = useAllParcels();
  const [allUsers] = useAllUsers();
  const userDeliveryMan = allUsers.filter((user) => user.type === "deliveryMan");
  const { register, handleSubmit, control, formState:{errors}, setValue} = useForm();
  console.log(errors);
  const [currentParcelId, setCurrentParcelId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const openModal = (parcelId) => {
    setCurrentParcelId(parcelId);
    document.getElementById(parcelId).showModal();
  };

  // useEffect(()=> {
  //   console.log(singleParcel);
  //   if(singleParcel){
  //     setValue("deliveryManId", singleParcel.deliveryManId)
  //     setValue("deliveryManEmail", singleParcel.deliveryManEmail)
  //   }
  // }, [singleParcel])

  const onSubmit = async (data) => {
    const parcelItem = {
      deliveryManId: data.deliveryManId,
      deliveryManEmail: data.deliveryManEmail,
      approximateDeliveryDate: data.approximateDeliveryDate,
      bookingStatus: data.bookingStatus,
    };

    console.log(data);
    try {
      const parcelResult = await axiosSecure.patch(`/updateParcels/${currentParcelId}`, parcelItem);

      if (parcelResult.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Parcel is Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }

      console.log("Sending PATCH request for parcel ID:", currentParcelId);
      console.log(parcelResult.data);
    } catch (error) {
      console.error("Error updating parcel:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const formattedStartDate = startDate ? new Date(startDate).toISOString().split('T')[0] : '';
      console.log(formattedStartDate);
      const formattedEndDate = endDate ? new Date(endDate).toISOString().split('T')[0] : '';
      
      console.log(formattedEndDate);
      const result = await axiosSecure.get(`/allParcels?startDate=${formattedStartDate}&endDate=${formattedEndDate}`);
      // refetch(result.data);
      console.log(result);
    } catch (error) {
      console.error('Error fetching parcels:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-evenly mb-8">
        <h2 className="text-4xl">Total Parcels: {allParcels.length}</h2>
      </div>

      <div className="flex justify-evenly mb-8">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Start Date</span>
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">End Date</span>
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <button className="btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
        <thead>
            <tr>
              <th>#</th>
              <th>User's Name</th>
              <th>User's Phone Number</th>
              <th>Booking Date</th>
              <th>requestedDeliveryDate</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
          {allParcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="font-bold">{parcel.name}</div>
                </td>
                <td>{parcel.phoneNumber}</td>
                <td>{parcel.bookingDate}</td>
                <td>{parcel.requestedDeliveryDate}</td>
                <td>{parcel.price}</td>
                <td>{parcel.bookingStatus}</td>
                <td>
                  <button className="btn" onClick={() => {
                    openModal(parcel._id)
                    setSingleParecl(parcel)
                  }}>
                    Manage
                  </button>
                  <dialog
                    id={parcel._id}
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      {currentParcelId !== null && (
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <input
                            type="hidden"
                            {...register("parcelId")}
                            value={currentParcelId}
                          />
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">
                                Delivery Man ID
                              </span>
                            </label>
                            <select onChange={(e) => {
                                  setValue("deliveryManId", e.target.value)
                                  
                                }}
                             
                              defaultValue={parcel.deliveryManId || ""}
                              className="select select-bordered"
                            >
                              <option value="" disabled>
                                Select Delivery Man ID
                              </option>
                              {userDeliveryMan.map((deliveryMan) => (
                                <option
                                
                                  className="text-black"
                                  key={deliveryMan._id}
                                  value={deliveryMan._id}
                                >
                                  {deliveryMan.name} ({deliveryMan._id})
                                </option>
                              ))}
                            </select>
                          </div>


                          {/* delivery man email */}

                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">
                                Delivery Man Email
                              </span>
                            </label>
                            <select onChange={(e) => setValue("deliveryManEmail", e.target.value)}
                             
                              defaultValue={parcel.deliveryManEmail || ""}
                              className="select select-bordered"
                            >
                              <option value="" disabled>
                                Select Delivery Man Email
                              </option>
                              {userDeliveryMan.map((deliveryMan) => (
                                <option 
                                  className="text-black"
                                  key={deliveryMan.email}
                                  value={deliveryMan.email}
                                >
                                  {deliveryMan.email}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="form-control w-full my-6">
                            <label className="label">
                              <span className="label-text">
                                Approximate Delivery Date
                              </span>
                            </label>
                            <input
                              type="Date"
                              placeholder=""
                              onChange={(e) => {
                                setValue("approximateDeliveryDate", e.target.value)
                                
                              }}
                              // {...register("approximateDeliveryDate")}
                              className="input input-bordered w-full"
                            />
                          </div>

                          <div className="form-control w-full my-6">
                            <label className="label">
                              <span className="label-text">
                                Update Booking Status
                              </span>
                            </label>
                            <input
                              type="text"
                              // defaultValue={parcel.bookingStatus}
                              onChange={(e) => {
                                setValue("bookingStatus", e.target.value)
                                
                              }}
                              // {...register("bookingStatus")}
                              className="input input-bordered w-full"
                            />
                          </div>

                          <button className="btn" >
                            Assign
                          </button>

                          <p className="py-4">
                            Press ESC key or click the button below to close
                          </p>
                        </form>
                      )}
                      <div className="modal-action">
                        <button
                          className="btn"
                          onClick={() => document.getElementById(parcel._id).close()}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllParcels;

