import React from "react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserList = ({
    data
    // bright
}) => {
    // console.log(data);
    return (
        <>
            {/* <a href="#">lolo</a> */}
            {/* {data.map((user) => ( */}
            <Link to="/">{data.name}</Link>
            {/* ))} */}
        </>
    );
};

UserList.propTypes = {
    // styleWhite: PropTypes.object.isRequired,
    // bright: PropTypes.object.isRequired,
    // handleDelete: PropTypes.func.isRequired,
    // onToggleBookMark: PropTypes.func.isRequired,
    // bookmark: PropTypes.bool.isRequired,
    // _id: PropTypes.string.isRequired,
    // name: PropTypes.string.isRequired,
    // qualities: PropTypes.array,
    // profession: PropTypes.object.isRequired,
    // rate: PropTypes.number.isRequired,
    // completedMeetings: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired
};
export default UserList;
