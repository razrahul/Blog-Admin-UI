import React from 'react'
import './User.scss'
import Button from "../buttom/Buttom"

 function User({users}) {

    // console.log(users);
    const handleConfirm = () => {
      alert("Confirmed!");
    };
  
    const handleCancel = () => {
      alert("Cancelled!");
    };
    
  return (
    <div>
      <div className="user-list">
        {users.map((user, index) => (
          <>
         <div className='user-contant'>
          <div className='user-img'>
            <img src={user.img_url} alt={user.name} />
          </div>
         <div className="user-card" key={index}>
            <h3>{user.name}</h3>
            <p>{user.role}</p>
            <p>{user.email}</p>
            <p>{user.phone} </p>
            <p>{user.date} </p>
          </div>
          <div className="user-auth">
            <Button onConfirm={handleConfirm} onCancel={handleCancel}>
             Public
            </Button>
            <Button onConfirm={handleConfirm} onCancel={handleCancel}>
            Verify
            </Button>
            <Button onConfirm={handleConfirm} onCancel={handleCancel}>
            unblock
            </Button>
          </div>
         </div>
          </>
        ))}
      </div>
    </div>
  )
}


export default User;