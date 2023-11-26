import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
import {
  Card,
  CardMedia,
  Typography,
} from "@mui/material";
import { FaLock, FaMapMarkerAlt, FaRocket } from "react-icons/fa";

const OurFeatures = () => {
  return (
    <div className="mx-auto max-w-screen-xl">
      <h1 className="text-3xl text-center mt-10 font-bold text-sky-500 mb-5">
        Our Features
      </h1>
      <div className=" grid grid-col-1  lg:grid-cols-3 gap-16 mb-20">
        <Card className="max-w-md mx-auto hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer" sx={{ maxWidth: 400 }}>
          <CardHeader
            
            title={
                <Typography sx={{ fontSize: "2xl", color: "rgb(234 179 8)", fontWeight: "bold" }}>Secure and Insured Parcels</Typography>
            }
            avatar={<FaLock className="text-2xl" />}
          ></CardHeader>

          <CardMedia
            component="img"
            height="194"
            image="/src/assets/feature1.jpg"
            alt="feature one"
          ></CardMedia>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Your parcels are in safe hands with ParcelHub. Our comprehensive
              security measures and insurance coverage safeguard your valuables
              throughout the delivery process.
            </Typography>
          </CardContent>
        </Card>

        <Card className="max-w-md mx-auto hover:shadow-xl transition-transform transform hover:scale-105" sx={{ maxWidth: 400 }}>
          <CardHeader
            title={
                <Typography sx={{ fontSize: "2xl", color: "rgb(234 179 8)", fontWeight: "bold" }}>Swift and Efficient Parcel Delivery</Typography>
            }
            avatar={<FaRocket className="text-xl" />}
          ></CardHeader>

          <CardMedia
            component="img"
            height="194"
            image="/src/assets/f3.jpg"
            alt="feature one"
          ></CardMedia>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Experience lightning-fast parcel delivery with ParcelHub. Our
              optimized logistics network and dedicated delivery team ensure
              your parcels reach their destination swiftly and efficiently.
            </Typography>
          </CardContent>
        </Card>

        <Card className="max-w-md mx-auto hover:shadow-xl transition-transform transform hover:scale-105" sx={{ maxWidth: 400 }}>
          <CardHeader
          
            title={
                <Typography sx={{ fontSize: "2xl", color: "rgb(234 179 8)", fontWeight: "bold" }}>Deliveries Across the Country</Typography>
            }
            avatar={<FaMapMarkerAlt className="text-2xl" />}
          ></CardHeader>

          <CardMedia
            component="img"
            height="194"
            image="/src/assets/feature3.jpg"
            alt="feature one"
          ></CardMedia>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              ParcelHub's extensive network spans the entire nation, reaching
              every corner with ease. Whether you're sending a parcel across
              town or across the country, we've got you covered. .
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OurFeatures;
