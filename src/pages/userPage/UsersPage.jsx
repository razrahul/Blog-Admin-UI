import React from "react";
import "./UsersPage.scss";
import User from "../../components/user/User";
import img from "../../assets/image/profile.webp";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/action/admin";

const UsersPage = () => {
  const cuetem_users = [
    {
      name: "Prahlad Nag",
      img_url: img,
      role: "developer",
      email: "nags8513@gmail.com",
      number: "+91 9561032056",
      createdAt: "2024-09-13",
    },

    {
      name: "Sourav Nag",
      img_url: img,
      role: "contentwriter",
      email: "prahladnag102@gmail.com",
      number: "+91 9012345785",
      createdAt: "2024-09-13",
    },
    {
      name: "Mukesh Kumar",
      img_url: img,
      role: "developer",
      email: "kumarmukesh852201@gmail.com",
      number: "+91 9165198125",
      createdAt: "2024-09-13",
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { loading, users, error } = useSelector((state) => state.admin);

  // console.log(users)

  return (
    <div className="users-page">
      <h1>Authentic user</h1>
      <User users={users} />
    </div>
  );
};

export default UsersPage;
