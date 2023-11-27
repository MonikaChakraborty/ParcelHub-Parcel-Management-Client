// import image from '../../assets/login1.jpg'
import { useContext } from 'react';
import image from '../../assets/login2.png'
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialLogin from './SocialLogin';

const Login = () => {

  const {signIn} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  
  console.log('State in the location login page', location.state);

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          Swal.fire({
            title: "User Login Successful",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
            },
          });

          navigate(from, { replace: true });
        })
        .catch(error => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "email Or password does not match!",
           
          });
        })
    }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          
          <img className='h-[70vh]' src={image} alt="" />
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <h1 className="text-3xl mt-5 text-center font-bold">Login now!</h1>

          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email" name='email'
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password" name='password'
                placeholder="password"
                className="input input-bordered"
                required
              />
              {/* <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
            </div>
            <div className="form-control mt-6">
            
              <input className="btn btn-primary" type="submit" value="Login" />
            </div>
          </form>
          <p className='text-center p-5'><small>New here? <Link className='text-primary font-bold' to="/signUp">Create an account</Link></small></p>
          <SocialLogin></SocialLogin>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
