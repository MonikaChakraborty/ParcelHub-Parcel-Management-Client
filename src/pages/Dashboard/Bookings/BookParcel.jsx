import { FaBook } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useParcel from "../../../hooks/useParcel";


const BookParcel = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useParcel();
    const { register, handleSubmit, reset, control } = useForm();
    const parcelWeight = useWatch({
      control,
      name: "parcelWeight",
      defaultValue: "",
    });
    const [calculatedPrice, setCalculatedPrice] = useState(0);
  
    useEffect(() => {
      if (parcelWeight === "") {
        setCalculatedPrice(0);
      }else if (parcelWeight === '1'){
        setCalculatedPrice(50)
      }else if (parcelWeight === '2') {
        setCalculatedPrice(100);
      } else {
        setCalculatedPrice(150);
      }
    }, [parcelWeight]);
  
    const onSubmit = async (data) => {
   
      const bookingDate = new Date();
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
        bookingStatus: 'pending',
        price: calculatedPrice,
        bookingDate: bookingDate.toLocaleDateString('en-GB'),
      };
      // console.log(parcelItem);
      axiosSecure.post('/parcels', parcelItem)
      .then(res => {
        console.log(res.data);

        if(res.data.insertedId){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Parcel is Booked",
            showConfirmButton: false,
            timer: 1500
          });
          refetch();
        }
      })
      
    };
    
  return (
    <div>
      <h2 className="text-4xl rounded-md text-sky-500 ">Book a Parcel</h2>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-8">
            {/* name */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                readOnly
                defaultValue={user.displayName}
                placeholder=""
                {...register("name")}
                className="input input-bordered w-full"
              />
            </div>

            {/* Email */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                readOnly
                defaultValue={user.email}
                placeholder=""
                {...register("email", 
                // { required: true }
                )}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="flex gap-8">
            {/* Phone Number */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Phone Number*</span>
              </label>
              <input
                type="text"
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
                placeholder="Delivery Address Latitude"
                {...register("latitude", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            {/* Delivery Address Longitude */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Delivery Address Longitude*</span>
              </label>
              <input
                type="text"
                
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
              {...register(
                "price"
              )}
              className="input input-bordered w-full"
            />
          </div>

          <button className="btn">
            Book <FaBook className=""></FaBook>
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookParcel;
