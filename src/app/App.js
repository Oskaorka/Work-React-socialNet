import React from "react";
// import { Route, Switch } from "react-router";
import { Route, Switch } from "react-router-dom";
// import api from "./API/index";
import Navbar from "./components/navBar";
import Users from "./layouts/users";
import Main from "./layouts/main";
import Login from "./layouts/login";
// import UserList from "./components/userList";

const App = () => {
    return (
        <>
            <Navbar />
            {/* <UserList /> */}
            {/* <Users />; */}
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/users" component={Users} />
                <Route path="/" component={Main} />
            </Switch>
        </>
    );
};
export default App;
