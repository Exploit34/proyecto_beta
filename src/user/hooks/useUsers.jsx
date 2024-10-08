import React, { useState, useEffect } from "react";

export const useUsers = () => {
  const [users, setUsers] = useState([]);

  let fetchUsers = () => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    refetchUsers: fetchUsers,
  };
};
