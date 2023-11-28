import useParcel from "../../../hooks/useParcel";
import { MdOutlineEdit } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { FaRegStar } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";



const Parcels = () => {
  const [parcel, refetch] = useParcel();
  const axiosSecure = useAxiosSecure();
  const totalPrice = parcel.reduce((total, item) => total + item.price, 0);

  const handleCancel = async(id, status) => {


  if (status === 'pending') {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    });

    if (result.isConfirmed) {
      // Send request to cancel booking and update status
      try {
        // Assuming you have an API endpoint for canceling a booking
        const response = await axiosSecure.patch(`/parcelsCancel/${id}`, { bookingStatus: 'cancelled' });

        if (response.data.modifiedCount > 0) {
          Swal.fire({
            icon: 'success',
            title: 'Booking Cancelled!',
            text: 'Your parcel has been cancelled.',
          });

          // Optionally, you can update the local state or refetch the data
          refetch();
          
        } 
        
      } 
      
      catch (error) {
        console.error('Error cancelling booking:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    }
  } 
  else {
    Swal.fire({
      icon: 'info',
      title: 'Booking Not Cancelled',
      text: 'You can only cancel bookings with status "pending".',
    });
  }
};
  return (
    <div>
      <div className="flex justify-evenly mb-8">
        <h2 className="text-4xl">My Parcels</h2>
        <h2>Total Parcels: {parcel.length}</h2>
        <h2>Total Price: {totalPrice}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel Type</th>
              <th>Requested Delivery Date</th>
              <th>Approximate Delivery Date</th>
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
            {parcel.map((item, index) => (
              <tr key={item._id}>
                <th>
                  {index+1}
                </th>
                <td>
                  <div className="font-bold">{item.parcelType}</div>
                </td>
                <td>{item.requestedDeliveryDate}</td>
                <td></td>
                <td>{item.bookingDate}</td>
                <td></td>
                <td>{item.bookingStatus}</td>
                <td>
                 <Link to={`/dashboard/updateParcel/${item._id}`}>
                 <button className="btn bg-yellow-500  text-xl" disabled={item.bookingStatus !== 'pending'}><MdOutlineEdit></MdOutlineEdit></button>
                 </Link>
                </td>
                <td>
                  <button onClick={() => handleCancel(item._id, item.bookingStatus)} className="btn bg-red-500  text-xl text-white"><MdCancel></MdCancel></button>
                </td>
                <td>
                  <button className="btn bg-orange-500  text-xl text-yellow-300"><FaRegStar></FaRegStar></button>
                </td>
                <td>
                  <button className="btn bg-sky-500  text-xl text-white"><MdAttachMoney></MdAttachMoney></button>
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
