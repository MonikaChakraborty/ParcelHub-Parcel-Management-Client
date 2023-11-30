import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
    const axiosPublic = useAxiosPublic();

    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     fetch('http://localhost:5000/menu')
    //     .then(res => res.json())
    //     .then(data => {
    //         setMenu(data);
    //         setLoading(false);

    //     })
    // }, [])

    const {data: stats = [], isPending: loading, refetch} = useQuery({
        queryKey: ['stats'],
        queryFn: async() => {
            const res = await axiosPublic.get('/stats');
            return res.data;
        }
    })

    return [stats, loading, refetch]
}

export default useMenu;