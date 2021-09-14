import React from "react";
import Bookmark from "./bookmark";
import Quality from "./qualitie";
import PropTypes from "prop-types";
const bright = {
    // borderRight: "1px solid #665c5c"
    // borderRight: "1px solid #21252978"
    borderRight: "1px solid #7e9298",
    textAlign: "center"
};
const getTimeOut = (year, mounth, day) => {
    // const d = {
    //     1: "день",
    //     2: "дня",
    //     5: "дней"
    // };

    const dateEndTime = Date.parse(new Date(year, mounth - 1, day));
    const dateCurrentTime = Date.parse(new Date());
    const getTime = dateEndTime - dateCurrentTime;
    const deadline = getTime / (24 * 60 * 60 * 1000);
    const hours = Math.floor((getTime / (1000 * 60 * 60)) % 24);
    // console.log(hours);
    // console.log(deadline);
    const timer = (time) => {
        if (time === 1) {
            return `${time} день`;
        }
        if (time > 1 && time < 5) {
            return `${time} дня`;
        }
        if (time > 4 || (25 && time < 21)) {
            return `${time} дней`;
        }
    };
    // console.log(getTime);
    // console.log(deadline);
    // console.log(td());
    // console.log(hours);
    return deadline > 0 && deadline < 1
        ? hours + " часов"
        : timer(Math.floor(deadline));
};
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
                <td style={bright}>{name}</td>
                <td style={bright}>
                    {qualities.map((qual) => (
                        <Quality key={qual._id} {...qual} />
                    ))}
                </td>
                <td style={bright}>{profession.name}</td>
                <td style={bright}>{completedMeetings}</td>
                <td style={bright}>{rate} / 5</td>
                <td style={bright}>{getTimeOut(2021, 9, 29)}</td>
                <td style={bright}>
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
