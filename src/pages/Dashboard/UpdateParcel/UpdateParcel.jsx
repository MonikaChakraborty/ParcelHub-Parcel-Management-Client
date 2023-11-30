import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdOutlineEdit } from "react-icons/md";
import useParcel from "../../../hooks/useParcel";
import { useEffect, useState } from "react";

const UpdateParcel = () => {
  const {phoneNumber, parcelType, parcelWeight, receiverName, receiverNumber, requestedDeliveryDate, latitude, longitude, deliveryAddress, _id} = useLoaderData();

  const axiosSecure = useAxiosSecure();

  const [, refetch] = useParcel();
  const { register, handleSubmit, reset, control } = useForm();
  const updatedParcelWeight = useWatch({
    control,
    name: "parcelWeight",
  });
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  useEffect(() => {
   if (updatedParcelWeight === "1") {
      setCalculatedPrice(50);
    } else if (updatedParcelWeight === "2") {
      setCalculatedPrice(100);
    } else {
      setCalculatedPrice(150);
    }
  }, [updatedParcelWeight]);

  const onSubmit = async (data) => {
    // const bookingDate = new Date();
    //   console.log(typeof(price));
    const parcelItem = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      parcelType: data.parcelType,
      parcelWeight: data.parcelWeight,
      receiverName: data.receiverName,
      receiverNumber: data.receiverNumber,
      requestedDeliveryDate: data.requestedDeliveryDate,
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
      deliveryAddress: data.deliveryAddress,
      price: calculatedPrice,
    //   bookingDate: bookingDate.toLocaleDateString("en-GB"),
    };
    // console.log(parcelItem);
    axiosSecure.patch(`/parcels/${_id}`, parcelItem).then((res) => {
      console.log(res.data);

      if (res.data.modifiedCount > 0) {
        Swal.fire({loader: () => fetch('https://parcel-management-server-wheat.vercel.app/users'),
          position: "top-end",
          icon: "success",
          title: "Your Parcel is Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

//   console.log(item);

  return (
    <div>
      <div>
        <h2 className="text-4xl rounded-md text-sky-500 ">Update Your Parcel Information</h2>

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-8">
              {/* Phone Number */}
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Phone Number*</span>
                </label>
                <input
                  type="text"
                  defaultValue={phoneNumber}
                  required
                  placeholder="Phone Number"
                  {...register("phoneNumber", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Parcel Type */}
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Parcel Type*</span>
                </label>
                <input
                  type="text"
                  defaultValue={parcelType}
                  required
                  placeholder="Parcel Type"
                  {...register("parcelType", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div className="flex gap-8">
              {/* Parcel Weight */}
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Parcel Weight*</span>
                </label>
                <input
                  type="number"
                  required
                  defaultValue={parcelWeight}
                  placeholder="Parcel Weight (in kg)"
                  {...register("parcelWeight", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Receiver's Name */}
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Receiver's Name*</span>
                </label>
                <input
                  type="text"
                  required
                  defaultValue={receiverName}
                  placeholder="Receiver's Name"
                  {...register("receiverName", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div className="flex gap-8">
              {/* Receiver's Phone Number */}
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Receiver's Phone Number*</span>
                </label>
                <input
                  type="text"
                  defaultValue={receiverNumber}
                  required
                  placeholder="Receiver's Phone Number"
                  {...register("receiverNumber", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Requested Delivery Date */}
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Requested Delivery Date*</span>
                </label>
                <input
                  type="Date"
                  defaultValue={requestedDeliveryDate}
                  required
                  placeholder=""
                  {...register("requestedDeliveryDate", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div className="flex gap-8">
              {/* Delivery Address Latitude */}
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Delivery Address Latitude*</span>
                </label>
                <input
                  type="text"
                  required
                  defaultValue={latitude}
                  placeholder="Delivery Address Latitude"
                  {...register("latitude", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Delivery Address Longitude */}
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">
                    Delivery Address Longitude*
                  </span>
                </label>
                <input
                  type="text"
                  required
                  defaultValue={longitude}
                  placeholder="Delivery Address Longitude"
                  {...register("longitude", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Parcel Delivery Address */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Parcel Delivery Address*</span>
              </label>
              <input
                type="text"
                required
                defaultValue={deliveryAddress}
                placeholder="Parcel Delivery Address"
                {...register("deliveryAddress", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            {/* Price */}
            <div className="form-control my-6">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="text"
                value={calculatedPrice}
                {...register("price")}
                className="input input-bordered w-full"
              />
            </div>

            <button className="btn">
              Update <MdOutlineEdit className=""></MdOutlineEdit>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateParcel;
