import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {

  const feed = useSelector((store) => store.feed);
  // console.log(feed);
  
  const dispatch = useDispatch();

  const getFeed = async () => {
    if(feed) return;
    
    try {
      const res = await axios.get(
        BASE_URL + "/user/feed", 
        {
          withCredentials: true,
        }
      );
      dispatch(addFeed(res.data));
      // console.log(res.data.data[0]._id);
      

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  if(!feed) return;

  if(feed.data.length <= 0) {
    return (
      <h1 className='flex justify-center font-semibold text-4xl my-10'>No New Users Found</h1>
    )
  }

  return (
    feed && (
      <div className='flex justify-center my-10'>
        <UserCard user={feed.data[0]} />
      </div>
    )
  )
}

export default Feed;
