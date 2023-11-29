import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllParcel = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: allParcels = [] } = useQuery({
        queryKey: ['allParcels'],
        queryFn: async() => {
            const res = await axiosSecure.get('/allParcels')
            return res.data;
        }
    })


    return [allParcels, refetch]
};


export default useAllParcel;