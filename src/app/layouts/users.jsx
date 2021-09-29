import React, { useState, useEffect } from "react";
import Pagination from "../components/pagination";
import { paginate } from "../utils/paginate";
import GroupList from "../components/groupList";
import api from "../API/index";
import SearchStatus from "../components/searchStatus";
import UserTable from "../components/usersTable";
import _ from "lodash";

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 4;

    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleToggleBookMark = (id) => {
        setUsers(
            users.filter((user) => {
                if (user._id === id) {
                    user.bookmark = !user.bookmark;
                    return user;
                }
                return user;
            })
        );
    };
    const styleMainText = {
        textAlign: "center",
        width: "28vw",
        margin: "15px auto",
        fontSize: "26px"
    };

    const styleWhite = {
        color: "white",
        margin: "8px",
        borderRadius: "5px",
        padding: "4px",
        background: "#DC3545"
    };
    const handleDelete = (userId) => {
        const newUsers = users.filter((user) => user._id !== userId);
        setUsers(newUsers);
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users;

        const count = filteredUsers.length;
        const sortUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedProf();
        };
        return (
            <div className="d-flex align-items-center justify-content-center">
                {professions && (
                    <div className="d-fllex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary"
                            onClick={clearFilter}
                        >
                            Все профессии
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <h1 style={styleMainText}>
                        <SearchStatus number={count} />
                    </h1>
                    {count > 0 && (
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            handleDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                            styleMainText={styleMainText}
                            styleWhite={styleWhite}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading";
};

export default Users;
