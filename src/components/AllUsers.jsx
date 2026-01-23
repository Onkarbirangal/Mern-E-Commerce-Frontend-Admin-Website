import React, { useContext } from 'react'
import AppContext from '../context/AppCotext'
const AllUsers = () => {
    const {allUsers} = useContext(AppContext)
  return (
    <>
      <div className="container my-5 text-center"> 
      <button className='btn btn-warning' style={{fontWeight:'bold'}}>Register User = {allUsers?.length}</button>
        {allUsers?.map((user) => (
          <div key={user._id} className="bg-dark p-2 my-4">
            <h2>{user.name}</h2>
            <h3>{user.email}</h3>
            <p>{user.createdAt}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default AllUsers