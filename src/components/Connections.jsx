import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {

    const connections = useSelector((store) => store.connections);
    // console.log(connections[0]);
    
    const dispatch = useDispatch();

    const [error, setError] = useState("");

    const fetchConnections = async () => {
        try {
            
            const res = await axios.get(
                BASE_URL + "/user/connections",
                {
                    withCredentials: true
                }
            )
            console.log(res.data.data);
            dispatch(addConnections(res.data.data));

        } catch (error) {
            setError(error?.response?.data || "Something went wrong");
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);
 
    if(!connections) return;

    if(connections.length === 0) {
        return <h1>No connections found</h1>
    }

    return (
        <div className='flex flex-col justify-center items-center my-10'>
            <h1 className='font-semibold text-4xl text-center'>Connections</h1>

            {connections.map((connection) => {
                // console.log(connection.toUserId.name);
                const { _id, name, age, gender, about, photoUrl } = connection.toUserId;
                
                return (
                    <div key={_id} className='flex m-4 p-4 rounded-sm bg-base-300 w-1/2'>
                        <div>
                            <img className='w-32 h-32 rounded-full' src={photoUrl} alt="" />
                        </div>
                        <div className='text-left mx-4'>
                            <h2 className='font-bold text-xl'>{connection.toUserId.name}</h2>
                            {connection.toUserId.age && connection.toUserId.gender &&
                                <p>{connection.toUserId.age + ", " + gender}</p>
                            }
                            <p>{connection.toUserId.about}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Connections;
