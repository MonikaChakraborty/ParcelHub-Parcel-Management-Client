// import useAllParcel from "../../../hooks/useAllParcels";
// import AppUsageChart from "../AppUsageChart/AppUsageChart";

// const Statistics = () => {
//     const [allParcels] = useAllParcel();
//     //   const deliveryMen = allUsers.filter((user) => user.type === "deliveryMan");




//     const appUsageData = allParcels.map((parcel) => ({
//         date: parcel.bookingDate, 
//         booking: (parcel.bookingDate).length
//         // Assuming bookingDate is in the format 'YYYY-MM-DD'
//       }));
//     return (
//         <div>
//             <h2 className="text-4xl text-sky-500">Statistics</h2>

//             <AppUsageChart data={appUsageData} />
//         </div>
//     );
// };

// export default Statistics;

import useAllParcel from "../../../hooks/useAllParcels";
import AppUsageChart from "../AppUsageChart/AppUsageChart";

const Statistics = () => {
    const [allParcels] = useAllParcel();

    const appUsageData = allParcels.reduce((acc, parcel) => {
        const date = parcel.bookingDate;

        // Check if there is an entry for the date in the accumulator
        const existingEntry = acc.find((entry) => entry.date === date);

        if (existingEntry) {
            // If an entry already exists, increment the bookings count
            existingEntry.bookings += 1;
        } else {
            // If no entry exists, create a new entry
            acc.push({ date, bookings: 1 });
        }

        return acc;
    }, []);

    return (
        <div>
            <h2 className="text-4xl text-sky-500">Statistics</h2>
            <AppUsageChart data={appUsageData} />
        </div>
    );
};

export default Statistics;
