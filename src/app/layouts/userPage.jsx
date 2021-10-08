import React, { useState } from "react";
import Users from "../components/users";
import { useParams } from "react-router-dom";
import api from "../API/index";
import User from "../components/user";

const UserPage = () => {
    const [user, setUser] = useState();
    const params = useParams();
    const { _id } = params;
    api.users.getById(_id).then((data) => setUser(data));

    return <>{user !== undefined ? <User use={user} /> : <Users />} </>;
};

export default UserPage;
