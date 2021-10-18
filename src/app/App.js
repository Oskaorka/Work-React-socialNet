import React from "react";
import { Route, Switch } from "react-router-dom";
// import Navbar from "./components/navBar";
import Navbar from "./components/ui/navBar";
import UserPage from "./layouts/userPage";
import Main from "./layouts/main";
import Login from "./layouts/login";

const App = () => {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route
                    path="/users/:_id?/:edit?"
                    render={(props) => <UserPage {...props} />}
                />
            </Switch>
        </>
    );
};
export default App;
