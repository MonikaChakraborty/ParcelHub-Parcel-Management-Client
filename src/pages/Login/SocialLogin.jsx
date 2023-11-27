import { FcGoogle } from "react-icons/fc";

import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();


    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(result => {
            // const userType = "user";
            console.log(result.user);

            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
                type: 'user'
            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
                console.log(res.data);
                navigate('/');
            })
        })
    }
    
    return (
        <div className="p-6">
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn btn-block">
                    <FcGoogle className="text-4xl "></FcGoogle>
                    <p>Continue with Google</p>
                    
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;