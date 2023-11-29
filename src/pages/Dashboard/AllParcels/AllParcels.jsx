import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAllParcels from "../../../hooks/useAllParcels";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useForm } from "react-hook-form";
import useAllUsers from "../../../hooks/useAllUsers";
import Swal from "sweetalert2";
import { useState } from "react";

// import { Modal, ModalHeader } from "reactstrap";

const AllParcels = () => {
  const axiosSecure = useAxiosSecure();
  const [allParcels, refetch] = useAllParcels();
  const [allUsers] = useAllUsers();
  const userDeliveryMan = allUsers.filter(
    (user) => user.type === "deliveryMan"
  );
  const { register, handleSubmit, reset, control } = useForm();
  const [currentParcelId, setCurrentParcelId] = useState(null);

  const openModal = (parcelId) => {
    setCurrentParcelId(parcelId);
    document.getElementById(parcelId).showModal();
  };


  const onSubmit = async(data) => {
    const parcelItem = {
      bookingStatus: data.bookingStatus,
      deliveryManId: data.deliveryManId,
      approximateDeliveryDate: data.approximateDeliveryDate,
    };


    // axiosSecure.patch(`/updateParcels/${allParcels._id}`, parcelItem).then((res) => {
    //     console.log(res.data);
  
    //     if (res.data.modifiedCount > 0) {
    //       Swal.fire({
    //         position: "top-end",
    //         icon: "success",
    //         title: "Your Parcel is Updated",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //       refetch();
    //     }
    //   });

    try {
        const parcelResult = await axiosSecure.patch(
          `/updateParcels/${currentParcelId}`,
          parcelItem
        );
        console.log('Sending PATCH request for parcel ID:', data.parcelId);
  
        console.log(parcelResult.data);
        // You can handle success, show a message, or update state as needed.
      } catch (error) {
        console.error("Error updating parcel:", error);
        // Handle error: show a message, log, or update state as needed.
      }

   
  };
  return (
    <div>
      <div className="flex justify-evenly mb-8">
        <h2 className="text-4xl">Total User: {allParcels.length}</h2>
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
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button
            className="btn"
            onClick={() => openModal(parcel._id)}
          >
                    Manage
                  </button>
                  <dialog
                    id={parcel._id}
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <form onSubmit={handleSubmit(onSubmit)}>
                      <input
                type="hidden"
                {...register("parcelId")}
                value={currentParcelId}
              />
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Delivery Man ID</span>
                          </label>
                          <select
                            {...register("deliveryManId", { required: true })}
                            placeholder="Select Delivery Man ID"
                            className="select select-bordered"
                          >
                            <option value="" disabled selected>
                              Select Delivery Man ID
                            </option>
                            {/* <option value="">User</option>
                              <option value="">Delivery Man</option> */}
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

                        <div className="form-control w-full my-6">
                          <label className="label">
                            <span className="label-text">
                              Approximate Delivery Date
                            </span>
                          </label>
                          <input
                            type="Date"
                            placeholder=""
                            {...register("approximateDeliveryDate")}
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
                            defaultValue={parcel.bookingStatus}
                            {...register("bookingStatus")}
                            className="input input-bordered w-full"
                          />
                        </div>

                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Assign</button>

                        <p className="py-4">
                          Press ESC key or click the button below to close
                        </p>
                      </form>
                      <div className="modal-action"></div>
                      <form>
                        <button className="btn">Close</button>
                      </form>
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
