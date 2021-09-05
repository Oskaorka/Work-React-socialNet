import React, { useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const users = paginate(allUsers, currentPage, pageSize);

    const ViewUsersTable = () => {
        return (
            <>
                <table className="table table-info table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <User user={user} {...rest} key={user._id} />
                        ))}
                    </tbody>
                </table>
                <Pagination
                    itemsCount={allUsers.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </>
        );
    };
    return <ViewUsersTable />;
};
Users.propTypes = { users: PropTypes.object.isRequired };
export default Users;
