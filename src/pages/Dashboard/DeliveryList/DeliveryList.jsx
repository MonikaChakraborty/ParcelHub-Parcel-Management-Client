import { useContext } from "react";
import useDeliveryMan from "../../../hooks/useDeliveryMan";
import useParcel from "../../../hooks/useParcel";
import { AuthContext } from "../../../providers/AuthProvider";
import useAllParcel from "../../../hooks/useAllParcels";
import { FaLocationDot } from "react-icons/fa6";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { MdCancel } from "react-icons/md";

const DeliveryList = () => {
  const { user } = useContext(AuthContext);

  const [allParcels, refetch] = useAllParcel();
  const users = allParcels.filter((parcels) => parcels.deliveryManEmail === user.email);

  // const handleCancel = async (id, status) => {
  //   if (status === "delivered") {
  //     const result = await Swal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, cancel it!",
  //     });

  //     if (result.isConfirmed) {
  //       try {
  //         const response = await axiosSecure.patch(`/deliveryParcelsCancel/${id}`, {
  //           bookingStatus: "cancelled",
  //         });

  //         if (response.data.modifiedCount > 0) {
  //           Swal.fire({
  //             icon: "success",
  //             title: "Booking Cancelled!",
  //             text: "The parcel has been cancelled.",
  //           });

  //           refetch();
  //         }
  //       } catch (error) {
  //         console.error("Error cancelling booking:", error);
  //         Swal.fire({
  //           icon: "error",
  //           title: "Oops...",
  //           text: "Something went wrong!",
  //         });
  //       }
  //     }
  //   } else {
  //     Swal.fire({
  //       icon: "info",
  //       title: "Booking Not Cancelled",
  //       text: 'You can only cancel bookings with status "delivered".',
  //     });
  //   }
  // };

  const handleCancel = async (id) => {
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
        const response = await axiosSecure.patch(`/deliveryParcelsCancel/${id}`, {
          bookingStatus: "cancelled",
        });
  
        if (response.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Booking Cancelled!",
            text: "The parcel has been cancelled.",
          });
  
          refetch();
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
  };
  

  return (
    <div>
      {/* <h1>{users.length}</h1> */}
      <h1 className="text-4xl mb-8">Delivery List</h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>

             
              <th>Booked User's Name</th>
              <th>Receiver's Name</th>
              <th>Booked User's Phone</th>
              <th>Requested Delivery Date</th>
              <th>Approximate Delivery Date</th>
              <th>Recievers phone number</th>
              <th>Receivers Address</th>
              <th>View Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="font-bold">{item.name}</div>
                </td>
                <td>{item.receiverName}</td>
                <td>{item.phoneNumber}</td>
                
                <td>{item.requestedDeliveryDate}</td>
                <td>{item.approximateDeliveryDate}</td>
                <td>{item.receiverNumber}</td>
                <td>{item.deliveryAddress}</td>
                <td><button className="btn"><FaLocationDot></FaLocationDot></button></td>
                <td>
                  <button
                    onClick={() => handleCancel(item._id, item.bookingStatus)}
                    className="btn bg-red-500  text-xl text-white"
                  >
                    <MdCancel></MdCancel>
                  </button>
                </td>

                {/* Approximate Delivery Date */}

                {/* Delivery Men ID */}

                {/* <td>
                 <Link to={`/dashboard/updateParcel/${item._id}`}>
                 <button className="btn bg-yellow-500  text-xl" disabled={item.bookingStatus !== 'pending'}><MdOutlineEdit></MdOutlineEdit></button>
                 </Link>
                </td> */}

               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveryList;
