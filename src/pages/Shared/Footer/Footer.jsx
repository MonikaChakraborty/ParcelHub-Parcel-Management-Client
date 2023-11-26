import logo from "../../../assets/logo1.png";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-800 text-white p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="ParcelHub Logo" className="w-16 mr-4" />
            <div>
              <p className="text-lg font-bold">ParcelHub</p>
              <p className="text-sm">Delivering Excellence, Every Time</p>
              <div className="text-center flex gap-5 mt-3 text-2xl hover:transition">
                <FaFacebook className="hover:text-blue-500  transition duration-300 ease-in-out cursor-pointer"></FaFacebook>
                <FaTwitter className="hover:text-sky-300  transition duration-300 ease-in-out cursor-pointer"></FaTwitter>
                <FaInstagram className="hover:text-pink-600  transition duration-300 ease-in-out cursor-pointer"></FaInstagram>
              </div>
            </div>
          </div>

          <div className="md:text-left text-center md:mt-0 mt-5">
            <p className="text-sm mb-2  uppercase">Contact us</p>
            <p className="text-sm text-center">123 Street, Cityville, Country</p>
            <p className="text-sm flex items-center">
              <AiOutlineMail className="mr-2" />
              info@parcelhub.com
            </p>

            <p className="text-sm flex items-center">
              <FiPhone className="mr-2" />
              +123 456 7890
            </p>
          </div>
        </div>
        <hr className="my-4 border-gray-600" />
        <div className="text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} ParcelHub. All rights reserved.
          </p>
          <p className="text-xs mt-2">
            <a href="#privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <span className="mx-2 text-gray-400">|</span>
            <a href="#terms" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
