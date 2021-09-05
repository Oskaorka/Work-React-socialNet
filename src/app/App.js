import React, { useState } from "react";
import api from "./API/index";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

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
        const newUsers = users.filter((user) => {
            if (user._id !== userId) {
                return user;
            }
            return user;
        });
        setUsers(newUsers);
    };
    return (
        <>
            <h1 style={styleMainText}>
                <SearchStatus number={users.length} />
            </h1>
            <Users
                users={users}
                handleDelete={handleDelete}
                styleMainText={styleMainText}
                styleWhite={styleWhite}
            />
        </>
    );
};
export default App;
