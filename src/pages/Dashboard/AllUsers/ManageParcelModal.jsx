import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageParcelModal = ({ user, onClose, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [deliverymen, setDeliverymen] = useState([]);
  const [selectedDeliveryman, setSelectedDeliveryman] = useState("");
  const [approximateDeliveryDate, setApproximateDeliveryDate] = useState("");

  useEffect(() => {
    const fetchDeliverymen = async () => {
      try {
        const response = await axiosSecure.get("/users?type=deliveryMan");
        setDeliverymen(response.data);
      } catch (error) {
        console.error("Error fetching deliverymen:", error);
      }
    };

    fetchDeliverymen();
  }, [axiosSecure]);

  const handleAssignClick = async () => {
    try {
      const response = await axiosSecure.patch(`/parcelsManage/${user._id}`, {
        bookingStatus: "On The Way",
        deliveryMenId: selectedDeliveryman,
      });

      if (response.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Booking Updated!",
          text: "Parcel is on the way.",
        });

        onClose();
        refetch();
      }
    } catch (error) {
      console.error("Error updating parcel status:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="modal">
      {/* ... (your existing modal content) */}
    </div>
  );
};

export default ManageParcelModal;
