import React from 'react'

const UserCard = ({user}) => {
    // console.log(user);

    const { name, gender, skills, about, age, photoUrl } = user;
    console.log(photoUrl);
    
    
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
                    <button className="btn btn-secondary">Ignore</button>
                    <button className="btn btn-primary">Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
