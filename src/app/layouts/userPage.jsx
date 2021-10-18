import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../API/index";
import Users from "../components/page/userPage";
import User from "../components/user";
import ChangeUser from "../components/page/changeUser";

const UserPage = () => {
    const [user, setUser] = useState();
    const params = useParams();
    const { _id, edit } = params;
    api.users.getById(_id).then((data) => setUser(data));

    return (
        <>
            {user !== undefined ? (
                edit ? (
                    <ChangeUser user={user} />
                ) : (
                    <User use={user} id={_id} />
                )
            ) : (
                <Users />
            )}{" "}
        </>
    );
};

export default UserPage;
