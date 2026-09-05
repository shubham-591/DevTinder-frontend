import React from 'react'
import NavBar from './NavBar'
import { useNavigate, Outlet } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useEffect } from 'react'

const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(
        BASE_URL + "/profile/view",
        {
          withCredentials: true
        }
      );
      dispatch(addUser(res.data));

    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login")
      }

      console.error(error);
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [])

  return (
    // <div>
    //     <NavBar />
    //     <Outlet />
    //     <Footer />
    // </div>
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Body
