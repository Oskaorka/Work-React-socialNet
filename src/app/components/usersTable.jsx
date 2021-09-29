import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";
import UserList from "./userList";
import TimerCount from "./timerCount";

const UserTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    handleDelete,
    styleWhite,
    ...rest
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => <UserList user={user} />
        },
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
                return TimerCount(newNum[0], newNum[1], newNum[2]);
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
