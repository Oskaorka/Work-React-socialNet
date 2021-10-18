import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const UserList = ({ user }) => {
    return (
        <>
            <Link to={`users/${user._id}`}>{user.name}</Link>
        </>
    );
};

UserList.propTypes = {
    user: PropTypes.object.isRequired
};
export default UserList;
