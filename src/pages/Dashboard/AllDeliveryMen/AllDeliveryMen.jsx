import useAllUsers from "../../../hooks/useAllUsers";

const AllDeliveryMen = () => {
    const [allUsers] = useAllUsers();
    const userDeliveryMan = allUsers.filter((user) => user.type === "deliveryMan");


    return (
        <div>
            <h2 className="text-4xl">Total Delivery Men: {userDeliveryMan.length}</h2>
        </div>
    );
};

export default AllDeliveryMen;