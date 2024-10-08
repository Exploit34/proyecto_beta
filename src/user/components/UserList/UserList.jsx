import React from "react";

function UserList({ users }) {
  if (!users) return null;

  const fullName = (user) => `${user.firstName} ${user.lastName}`;

  return (
    <div className="usersList">
      {users.map((user) => (
        <div className="user" key={user._id}>
          <img src={user.image} alt={fullName(user)} />
          <h2>{fullName(user)}</h2>
        </div>
      ))}
    </div>
  );
}

export default UserList;
