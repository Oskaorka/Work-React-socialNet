import React, { useState, useEffect } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../API/index";
import SearchStatus from "./searchStatus";

const Users = ({ users: allUsers, styleMainText, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();

    const pageSize = 4;

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const objectsEqual = (obj1, obj2) =>
        Object.keys(obj1).length === Object.keys(obj2).length &&
        Object.keys(obj1).every((p) => obj1[p] === obj2[p]);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const filteredUsers = selectedProf
        ? allUsers.filter((user) => objectsEqual(user.profession, selectedProf))
        : allUsers;
    // const filteredUsers = selectedProf
    //     ? allUsers.filter((user) => user.profession === selectedProf)
    //     : allUsers;
    // console.log(filteredUsers);
    const count = filteredUsers.length;
    const users = paginate(filteredUsers, currentPage, pageSize);

    const clearFilter = () => {
        setSelectedProf();
    };
    // console.log(selectedProf);
    return (
        <div className="d-flex align-items-center justify-content-center">
            {professions && (
                <div className="d-fllex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button className="btn btn-secondary" onClick={clearFilter}>
                        Все профессии
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <h1 style={styleMainText}>
                    <SearchStatus number={count} />
                </h1>
                {count > 0 && (
                    <table className="table table-info table-striped table-hover">
                        <thead>
                            <tr style={{ textAlign: "center" }}>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Профессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Сроки</th>
                                <th scope="col">Избранное</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <User {...rest} {...user} key={user._id} />
                            ))}
                        </tbody>
                    </table>
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
};
Users.propTypes = {
    users: PropTypes.array.isRequired,
    styleMainText: PropTypes.object.isRequired
};
export default Users;
