import React from "react";
import "./User.scss";
import Button from "../buttom/Buttom";
import img from "../../assets/image/profile.webp";
import {formatDate} from "../../Utils/formatDate ";

function User({ users }) {
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
          <div key={user._id} className="user-contant">
            <div className="user-img">
              {user.avatar && user.avatar.public_id ? (
                <img src={user.avatar.url} alt={user.name} />
              ) : (
                <img src={img} alt={user.name} />
              )}
            </div>
            <div className="user-card" key={index}>
              <h3>{user.name}</h3>
              <p>{user.role}</p>
              <p>{user.email}</p>
              <p>+91 {user.number} </p>
              <p>{formatDate(user.createdAt)} </p>
            </div>
            <div className="user-auth">
              <Button onConfirm={handleConfirm} onCancel={handleCancel}>
                {user.isview}
              </Button>
              <Button onConfirm={handleConfirm} onCancel={handleCancel}>
                {user && user.isVerified ? "Verify" : "Not Verify"}
              </Button>
              <Button onConfirm={handleConfirm} onCancel={handleCancel}>
                {user && user.isblocked ? "Block" : "unblock"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
