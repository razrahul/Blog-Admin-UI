import React from 'react'
import './User.scss'

 function User({users}) {

    console.log(users);
    
  return (
    <div>
      <div className="user-list">
        {users.map((user, index) => (
          <div className="user-card" key={index}>
            <h3>{user.name}</h3>
            <p>{user.role}</p>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}


export default User;