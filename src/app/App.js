import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Users from "./layouts/users";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import { ProfessionProvider } from "./hooks/useProfession";
import { QalitiesProvider } from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";
import LogInProvider from "./hooks/useLogIn";

function App() {
    return (
        <div>
            <LogInProvider>
                <AuthProvider>
                    <NavBar />
                    <QalitiesProvider>
                        <ProfessionProvider>
                            <Switch>
                                <Route path="/login/:type?" component={Login} />
                                <Route
                                    path="/users/:userId?/:edit?"
                                    component={Users}
                                />
                                <Route path="/" exact component={Main} />
                                <Redirect to="/" />
                            </Switch>
                        </ProfessionProvider>
                    </QalitiesProvider>
                    <ToastContainer />
                </AuthProvider>
            </LogInProvider>
        </div>
    );
}

export default App;
