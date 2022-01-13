import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { getIsLoggedIn } from "../../store/users";
import { useSelector } from "react-redux";
// import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    // const { currentUser } = useAuth;
    // console.log(currentUser);
    console.log(isLoggedIn);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isLoggedIn) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
                return Component ? <Component {...props} /> : children;
            }}
        />
    );
};
ProtectedRoute.propTypes = {
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    component: PropTypes.func
};
export default ProtectedRoute;
