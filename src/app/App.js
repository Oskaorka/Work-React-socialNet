import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/navBar";
import UserPage from "./components/userPage";
import Main from "./layouts/main";
import Login from "./layouts/login";

const App = () => {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route
                    path="/users/:_id?"
                    component={UserPage}
                    render={(props) => <UserPage {...props} />}
                />
            </Switch>
        </>
    );
};
export default App;
