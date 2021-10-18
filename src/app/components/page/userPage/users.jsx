import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import api from "../../../API/index";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../usersTable";
import _ from "lodash";

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [dataQuery, setDataQuery] = useState("");
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 8;

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
    const styleSearchInput = {
        border: "none",
        boxShadow: "0px 0px 20px #a1c5ff",
        borderRadius: "15px",
        margin: "2em 0",
        // outlineColor:"#a1c5ff""
        padding: "0.5em 2em",
        outlineColor: "#a1c5ff"
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
    const handleSearchQuery = (e) => {
        // preventDefault();
        setSelectedProf(undefined);
        setDataQuery(e.target.value);
        // console.log(e.target.value);
        // const finde = e.target.value.toLowerCase();
        // setData((prevState) => ({
        //     ...prevState,
        //     [e.target.name]: finde
        // }));
        // const findeUser = users.filter((user) =>
        //     user.name.toLowerCase().match(data.search)
        //         ? user
        //         : console.log("lol")
        // );
        // // console.log(rer);
        // setUsers(findeUser);
        // finde === ""
        //     ? api.users.fetchAll().then((data) => setUsers(data))
        //     : console.log("no");
        // console.log(data);
    };
    if (users) {
        // const filteredUsers = selectedProf;
        const filteredUsers = dataQuery
            ? users.filter(
                  (user) =>
                      user.name
                          .toLowerCase()
                          .indexOf(dataQuery.toLowerCase()) !== -1
              )
            : selectedProf
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
                    {/* <SearchElement
                        onChange={handleSearchQuery}
                        data={dataQuery.value}
                        // users={users}
                    /> */}
                    <input
                        style={styleSearchInput}
                        type="text"
                        data={dataQuery.value}
                        onChange={handleSearchQuery}
                    />
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
