import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import NavBar from "../pages/Shared/NavBar/NavBar";

const MainLayOut = () => {
  // const location = useLocation();

  return (
    <div>
      {/* <NavBar></NavBar>
            
            <Outlet></Outlet>
            
            <Footer></Footer> */}

      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayOut;
