import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/requestSlice';

const Requests = () => {

    const requests = useSelector((store) => store.requests);

    const [error, setError] = useState("");
    const dispatch = useDispatch();


    const fetchRequests = async () => {
        try {
            
            const res = await axios.get(
                BASE_URL + "/user/requests/received",
                {
                    withCredentials: true
                }
            )
            console.log(res.data.data);
            
            dispatch(addRequests(res?.data?.data));

        } catch (error) {
            setError(error?.response?.data || "Something went wrong");
        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);

    if(!requests) return;

    if(requests.length === 0) {
        return (
            <h1>No Requests Found</h1>
        )
    }

    return (
        <div className='flex flex-col justify-center items-center my-10'>
            <h1 className='font-semibold text-4xl text-center'>Requests Received</h1>

            {requests.map((request) => {
                const { _id, name, age, gender, about, photoUrl } = request.fromUserId;
                
                return (
                    <div key={_id} className='flex items-center m-4 p-4 rounded-sm bg-base-300 w-1/2'>
                       
                        {/* Image */}
                        <div className='w-36 h-36 shrink-0'>
                            <img className='w-full h-full rounded-full object-cover' src={photoUrl} alt="" />
                        </div>

                        {/* User information */}
                        <div className='text-left mx-4 flex-1 min-w-0'>
                            <h2 className='font-bold text-xl'>{request.fromUserId.name}</h2>
                            {request.fromUserId.age && request.fromUserId.gender &&
                                <p>{request.fromUserId.age + ", " + gender}</p>
                            }
                            <p>{request.fromUserId.about}</p>
                        </div>

                        {/* Buttons */}
                        <div className='flex gap-4 shrink-0 ml-auto'>
                            <button className="btn btn-primary mx-2">Reject</button>
                            <button className="btn btn-secondary mx-2">Accept</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Requests;
