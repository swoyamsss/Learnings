const Users = ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{JSON.stringify(user)}</li>
      ))}
    </ul>
  );
};

export default Users;
