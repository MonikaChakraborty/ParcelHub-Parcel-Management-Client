import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useParcel = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const { refetch, data: parcel = [] } = useQuery({
        queryKey: ['parcel', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data;
        }
    })

    return [parcel, refetch]
};

export default useParcel;