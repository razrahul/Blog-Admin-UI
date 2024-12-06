import React from 'react';
import './UsersPage.scss';
import User from "../../components/user/User"

const UsersPage = () => {
  const users = [
    { name: 'Prahlad Nag', role: 'developer', email: 'nags8513@gmail.com' },
    { name: 'Sourav Nag', role: 'contentwriter', email: 'prahladnag102@gmail.com' },
    { name: 'Mukesh Kumar', role: 'developer', email: 'kumarmukesh852201@gmail.com' },
  ];

  return (
    <div className="users-page">
      <h1>Users</h1>
      <User users={users} />
    </div>
  );
};

export default UsersPage;
