import { useContext } from "react";
import useDeliveryMan from "../../../hooks/useDeliveryMan";
import useParcel from "../../../hooks/useParcel";
import { AuthContext } from "../../../providers/AuthProvider";
import useAllParcel from "../../../hooks/useAllParcels";
import { FaLocationDot } from "react-icons/fa6";

const DeliveryList = () => {
  const { user } = useContext(AuthContext);

  const [allParcels] = useAllParcel();
  const users = allParcels.filter((parcels) => parcels.deliveryManEmail === user.email);


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
