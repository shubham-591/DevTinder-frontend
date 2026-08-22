import React, { useState } from 'react'
import UserCard from "./UserCard"
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {

    const [name, setName] = useState(user.name);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);


    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const saveProfile = async () => {
        setError("");
        try {

            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                { name, age, gender, about, photoUrl },
                {
                    withCredentials: true
                }
            )
            dispatch(addUser(res?.data?.data));
            setShowToast(true);

            setTimeout(() => {
                setShowToast(false);
            }, 3000);

        } catch (error) {
            setError(error?.response?.data || "Something went wrong");
        }
    }

    return (
        <>
            <div className="flex justify-center my-10">
                <div className='flex justify-center mx-10'>
                    <div className="card bg-base-300 w-96 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit Profile</h2>
                            <div>
                                <fieldset className="fieldset">
                                    <label className="label" htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="input w-full"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <label className="label" htmlFor="age">Age</label>
                                    <input
                                        type="text"
                                        id="age"
                                        className="input w-full"
                                        placeholder="Age"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                    <label className="label" htmlFor="photoUrl">Photo URL</label>
                                    <input
                                        type="text"
                                        id="photoUrl"
                                        className="input w-full"
                                        placeholder="Photo URL"
                                        value={photoUrl}
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                    />
                                    <label className="label" htmlFor="gender">Gender</label>
                                    <input
                                        type="text"
                                        id="gender"
                                        className="input w-full"
                                        placeholder="Gender"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <label className="label" htmlFor="about">About</label>
                                    <input
                                        type="text"
                                        id="about"
                                        className="input w-full"
                                        placeholder="About"
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                    />
                                </fieldset>
                            </div>
                            <p className='text-red-600'>{error}</p>
                            <div className="card-actions justify-center my-2">
                                <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
                            </div>
                        </div>
                    </div>
                </div>

                <UserCard user={{ name, age, gender, about, photoUrl }} showActions={false} />
            </div>
            {showToast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile saved successfully.</span>
                </div>
            </div>}
        </>
    )
}

export default EditProfile;
