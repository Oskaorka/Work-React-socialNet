import React from "react";
import Bookmark from "./bookmark";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";

const User = ({ user, styleWhite, handleDelete }) => {
    return (
        <>
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
                    <button
                        onClick={() => handleDelete(user._id)}
                        style={styleWhite}
                    >
                        delete
                    </button>
                </td>
            </tr>
        </>
    );
};
User.propTypes = {
    user: PropTypes.object.isRequired,
    styleWhite: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired
};
export default User;
