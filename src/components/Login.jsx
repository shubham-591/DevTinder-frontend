import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [email, setEmail] = useState("mark@gmail.com");
  const [password, setPassword] = useState("Mark@123");
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
      console.error(error);
      // console.log(error.response.data);
      // console.log(error.response.status);
    }
  }

  return (
    <div className='flex justify-center mt-40'>
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset">
              <label className="label" htmlFor="email">Email ID</label>
              <input 
                type="email" 
                id="email" 
                className="input" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="label" htmlFor="pwd">Password</label>
              <input 
                type="password" 
                id="pwd" className="input" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;