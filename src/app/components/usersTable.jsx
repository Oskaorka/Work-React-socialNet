import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";
const UserTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    handleDelete,
    styleWhite,
    ...rest
}) => {
    const getTimeOut = (year, mounth, day) => {
        const dateEndTime = Date.parse(new Date(year, mounth - 1, day));
        const dateCurrentTime = Date.parse(new Date());
        const getTime = dateEndTime - dateCurrentTime;
        const deadline = getTime / (24 * 60 * 60 * 1000);
        const hours = Math.floor((getTime / (1000 * 60 * 60)) % 24);
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
        return deadline > 0 && deadline < 1
            ? hours + " часов"
            : timer(Math.floor(deadline));
    };
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился раз"
        },
        rate: { path: "rate", name: "Оценка" },
        time: {
            path: "time",
            name: "Сроки",
            component: (user) => {
                const newNum = user.time.split(",");
                return getTimeOut(newNum[0], newNum[1], newNum[2]);
            }
        },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    onClick={() => onToggleBookMark(user._id)}
                    status={user.bookmark}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => handleDelete(user._id)}
                    style={styleWhite}
                >
                    delete
                </button>
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    styleWhite: PropTypes.object.isRequired
};

export default UserTable;
