import useParcel from "../../../hooks/useParcel";
import { MdOutlineEdit } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { FaRegStar } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const Parcels = () => {
  const [parcel, refetch] = useParcel();
  const axiosSecure = useAxiosSecure();
  const totalPrice = parcel.reduce((total, item) => total + item.price, 0);

  const [filterStatus, setFilterStatus] = useState("all"); // Initial filter status


  const handleCancel = async (id, status) => {
    if (status === "pending") {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
      });

      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.patch(`/parcelsCancel/${id}`, {
            bookingStatus: "cancelled",
          });

          if (response.data.modifiedCount > 0) {
            Swal.fire({
              icon: "success",
              title: "Booking Cancelled!",
              text: "Your parcel has been cancelled.",
            });

            refetch(filterStatus);
          }
        } catch (error) {
          console.error("Error cancelling booking:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "Booking Not Cancelled",
        text: 'You can only cancel bookings with status "pending".',
      });
    }
  };

  const filteredParcel = parcel.filter((item) => {
    if (filterStatus === "all") {
      return true; // Show all parcels
    } else {
      return item.bookingStatus === filterStatus;
    }
  });
  return (
    <div>
      <div className="flex justify-evenly mb-8">
        <h2 className="text-3xl">My Parcels</h2>
        <h2 className="text-3xl">Total Parcels: {parcel.length}</h2>
        <h2 className="text-3xl">Total Price: {totalPrice}</h2>

        
      </div>

      <div className="flex justify-center mb-10 text-xl">
          <label htmlFor="bookingStatus">Filter by Booking Status: </label>
          <select
            id="bookingStatus"
            onChange={(e) => setFilterStatus(e.target.value)}
            value={filterStatus}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="on the way">On the Way</option>
            <option value="delivered">Delivered</option>
            {/* Add more options based on your booking status values */}
          </select>
        </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel Type</th>
              <th>
                Requested <br /> Delivery Date
              </th>
              <th>
                Approximate <br /> Delivery Date
              </th>
              <th>Booking Date</th>
              <th>Delivery Men ID</th>
              <th>Booking Status</th>
              <th>Update</th>
              <th>Cancel</th>
              <th>Review</th>
              <th>Pay</th>
            </tr>
          </thead>
          <tbody>
            {filteredParcel.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="font-bold">{item.parcelType}</div>
                </td>
                <td>{item.requestedDeliveryDate}</td>

                {/* Approximate Delivery Date */}
                <td>{item.approximateDeliveryDate}</td>

                <td>{item.bookingDate}</td>

                {/* Delivery Men ID */}
                <td>{item.deliveryManId}</td>

                <td>{item.bookingStatus}</td>
                {/* <td>
                 <Link to={`/dashboard/updateParcel/${item._id}`}>
                 <button className="btn bg-yellow-500  text-xl" disabled={item.bookingStatus !== 'pending'}><MdOutlineEdit></MdOutlineEdit></button>
                 </Link>
                </td> */}

                <td>
                  {item.bookingStatus === "pending" ? (
                    <Link to={`/dashboard/updateParcel/${item._id}`}>
                      <button className="btn bg-yellow-500 text-xl">
                        <MdOutlineEdit></MdOutlineEdit>
                      </button>
                    </Link>
                  ) : (
                    <button className="btn bg-yellow-500 text-xl" disabled>
                      <MdOutlineEdit></MdOutlineEdit>
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleCancel(item._id, item.bookingStatus)}
                    className="btn bg-red-500  text-xl text-white"
                  >
                    <MdCancel></MdCancel>
                  </button>
                </td>
                <td>
                  <button className="btn bg-orange-500  text-xl text-yellow-300">
                    <FaRegStar></FaRegStar>
                  </button>
                </td>
                <td>
                  <button className="btn bg-sky-500  text-xl text-white">
                    <MdAttachMoney></MdAttachMoney>
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


export default Parcels;
