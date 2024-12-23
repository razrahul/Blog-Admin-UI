import React from "react";
import "./User.scss";
import img from "../../assets/image/profile.webp";
import { formatDate } from "../../Utils/formatDate ";
import ConfirmButton from "../conformationButtom/Button";
import { useDispatch } from "react-redux";
import { updateUserVerification, updateUserBlock, deleteUser } from "../../redux/action/admin";

function User({ users }) {
  // console.log(users);
 

  const dispatch = useDispatch();

  const handledelete = (userId) => {
    console.log("delete", userId);
    dispatch(deleteUser(userId));
    alert("User Deleted!")
  };

  const handleVerfication = (userId,verfy) => {
      console.log(userId,verfy)
      dispatch(updateUserVerification(userId));
      alert(`${verfy ? "User Not Verfied!":" User Verifrd!"}`)
    };

  const handleBlock = (userId, Ide) => {
    console.log(userId,Ide)
    dispatch(updateUserBlock(userId));
    alert(`${Ide ? "User Unblocked!":"User Blocked!"}`)
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
              <ConfirmButton
                onConfirm={() => handledelete(user._id)}
                title="Delete User"
                description={`Are you sure you want to Delete User: "${user && user.name }"?`}
                buttonClass="delete"
              >
                Delete
              </ConfirmButton>
              <ConfirmButton
                onConfirm={() => handleVerfication(user._id,user.isVerified)}
                title="Verfication User"
                description={`Are you sure you want to Update Verfication  "${user && user.isVerified? "Not Verify": "Verify"  }"?`}
                buttonClass="verify"
              >
                {user && user.isVerified ? "Verify" : "Not Verify"}
              </ConfirmButton>
              <ConfirmButton
                onConfirm={() => handleBlock(user._id,user.isblocked)}
                // title="Block User"
                title={user && user.isblocked ? "UnBlock User" : "Block USer"}
                description={`Are you sure you want to  "${user && user.isblocked? "unBlock": "Block"  }"  the user:  ${user.name} ?`}
                buttonClass="block"
              >
                {user && user.isblocked ? "Block" : "unBlock"}
              </ConfirmButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
