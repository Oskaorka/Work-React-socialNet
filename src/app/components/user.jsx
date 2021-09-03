import Bookmark from "./bookmark";
import Qualitie from "./qualitie";
const User = ({ users, styleWhite, handleDelete }) => {
  return (
    <>
      {users.map((user) => (
        <tr key={user._id} id={user._id}>
          <td>{user.name}</td>
          <td>{user.profession.name}</td>
          <Qualitie user={user} styleWhite={styleWhite} />
          <td>{user.completedMeetings}</td>
          <td>{user.rate}</td>
          <td>
            <Bookmark />
          </td>
          <td>
            <button onClick={() => handleDelete(user._id)} style={styleWhite}>
              delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};
export default User;
