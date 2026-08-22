import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
    // console.log(user);

    const { _id, name, gender, skills, about, age, photoUrl } = user;
    // console.log(photoUrl);

    const dispatch = useDispatch();

    const [error, setError] = useState("");

    const handleSendRequest = async (status, userId) => {
        try {

            const res = await axios.post(
                BASE_URL + "/request/send/" + status + "/" + userId,
                {},
                {
                    withCredentials: true
                }
            )
            dispatch(removeUserFromFeed(userId));

        } catch (error) {
            setError(error?.response?.data || "Something went wrong");
        }
    }


    return (
        <div className="card bg-blue-400 w-80 shadow-sm">
            <figure>
                <img
                    src={photoUrl}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                {age && gender &&
                    <p>{age + " " + gender}</p>
                }
                <p>{about}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-secondary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
                    <button className="btn btn-primary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
