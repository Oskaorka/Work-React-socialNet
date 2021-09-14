import React, { useState, useEffect } from "react";
import api from "./API/index";
import Users from "./components/users";

const App = () => {
    const [users, setUsers] = useState();
    // setUsers(users.);
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    // console.log(users);
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
    return (
        <>
            {users && (
                <Users
                    users={users}
                    handleDelete={handleDelete}
                    styleMainText={styleMainText}
                    styleWhite={styleWhite}
                    onToggleBookMark={handleToggleBookMark}
                />
            )}
        </>
    );
};
export default App;
