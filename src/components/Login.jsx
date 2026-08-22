import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {

    try {
      const res = await axios.post(
        BASE_URL + "/login", {
        email,
        password
      },
        {
          withCredentials: true
        }
      );
      // console.log(res.data); 
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
      console.error(error);
    }
  }

  const handleSignUp = async () => {
    try {
      
      const res = await axios.post(
        BASE_URL + "/signUp",
        {name, gender, email, password},
        {
          withCredentials: true
        }
      )
      dispatch(addUser(res.data.data));
      return navigate("/profile");

    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "SignUp"}
          </h2>
          <div>
            <fieldset className="fieldset">
              {!isLoginForm && <>
                <label className="label" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="input w-full"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label className="label" htmlFor="gender">Gender</label>
                <input
                  type="text"
                  id="gender"
                  className="input w-full"
                  placeholder="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                /></>}
              <label className="label" htmlFor="email">Email ID</label>
              <input
                type="email"
                id="email"
                className="input w-full"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="label" htmlFor="pwd">Password</label>
              {/* <input 
                type="password" 
                id="pwd" className="input" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /> */}
              {/* <div className="join">
                <input
                  type={showPassword ? "text" : "password"}
                  id="pwd"
                  className="input join-item"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="btn join-item"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div> */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="pwd"
                  className="input w-full pr-12"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </fieldset>
          </div>
          <p className='text-red-600'>{error}</p>
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>
              {isLoginForm ? "Login" : "SignUp"}
            </button>
          </div>
          <p className='cursor-pointer m-auto py-2 text-blue-600' onClick={() => setIsLoginForm((value) => !value)}>
            {isLoginForm ? "New User? SignUp Here" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login;