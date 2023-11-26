import banner from '../../../assets/banner3.jpg';

const Banner = () => {
    return (
        <div className='relative'>
            <div>
                <img className='w-full' src={banner} alt="" />
            </div>
            <div className="absolute top-1 md:top-1/3 md:left-1/2 lg:left-1/2 transform md:-translate-x-[300px] lg:-translate-x-[550px]">
                <h1 className="lg:text-4xl text-xl font-bold mb-2 text-sky-500 md:w-full w-60">Delivering Excellence, Every Parcel, <br /> Every Time</h1>
                <p className="text-lg text-yellow-600 font-extrabold mb-4">Your Parcels, Our Priority</p>

                <div>
                    {/* Search bar */}
                    <input
                        type="text"
                        placeholder="Search for parcels..."
                        className="lg:px-4 px-2 lg:py-2 w-40 lg:w-72 text-gray-500 border rounded-md focus:outline-none"
                    />
                    <button className="ml-2 px-2 lg:px-4 lg:py-2 bg-sky-500 text-white rounded-md">Search</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
