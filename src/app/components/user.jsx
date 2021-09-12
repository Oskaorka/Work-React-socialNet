import React from "react";
import Bookmark from "./bookmark";
import Quality from "./qualitie";
import PropTypes from "prop-types";

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    styleWhite,
    rate,
    handleDelete,
    bookmark,
    onToggleBookMark
}) => {
    return (
        <>
            <tr key={_id}>
                <td>{name}</td>
                <td>
                    {qualities.map((qual) => (
                        <Quality key={qual._id} {...qual} />
                    ))}
                </td>
                <td>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate} / 5</td>
                <td>
                    <Bookmark
                        onClick={() => onToggleBookMark(_id)}
                        status={bookmark}
                    />
                </td>
                <td>
                    <button
                        onClick={() => handleDelete(_id)}
                        style={styleWhite}
                    >
                        delete
                    </button>
                </td>
            </tr>
        </>
    );
};
User.defaultProps = {
    bookmark: false
};
User.propTypes = {
    styleWhite: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    bookmark: PropTypes.bool.isRequired,
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array,
    profession: PropTypes.object.isRequired,
    rate: PropTypes.number.isRequired,
    completedMeetings: PropTypes.number.isRequired
};
export default User;
