import User from "./user";
const Users = ({ users, ...rest }) => {
  const ViewUsersTable = () => {
    return (
      <>
        <table className="table table-info table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <User
              users={users}
              {...rest}
              //   styleWhite={styleWhite}
              //   handleDelete={handleDelete}
            />
          </tbody>
        </table>
      </>
    );
  };
  return <ViewUsersTable />;
};
export default Users;
