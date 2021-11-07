import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage/editUserPage";
const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    // console.log(userId);
    return (
        <>
            {userId ? (
                edit ? (
                    <EditUserPage id={userId} />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
