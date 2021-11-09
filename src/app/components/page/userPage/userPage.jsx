import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { useHistory } from "react-router-dom";
import UserCard from "../../ui/userCard";
import MeetingsCard from "../../ui/meetingsCard";
import QualitiesCard from "../../ui/qualitiesCard";
import Comments from "../../ui/comments";
const UserPage = ({ userId }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const history = useHistory();

    const handleClick = () => {
        history.push("/users");
    };

    if (user) {
        return (
            <>
                <div className="container">
                    <div className="row gutters-sm">
                        <div>
                            <button
                                className="btn btn-primary mb-3"
                                onClick={handleClick}
                            >
                                Все Пользователи
                            </button>
                        </div>
                        <div className="col-md-4 mb-3">
                            <UserCard user={user} />
                            <QualitiesCard data={user.qualities} />
                            <MeetingsCard value={user.completedMeetings} />
                        </div>
                        <div className="col-md-8">
                            <Comments userId={userId} />
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
