import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import { useHistory, Link } from "react-router-dom";
import SelectField from "../../common/form/selectField";
import TextAriaField from "../../common/form/textAriaField";
const UserPage = ({ userId }) => {
    const [getUser, setNewUser] = useState({});
    const [data, setData] = useState({
        userId: getUser,
        pageId: userId,
        content: ""
    });
    const [comment, setComment] = useState();
    const [img, setNewImg] = useState(
        `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
            .toString(36)
            .substring(7)}.svg`
    );
    const [user, setUser] = useState();
    const [userComment, setUserComment] = useState();
    const [time, setNewTime] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => setNewUser(data));
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setUserComment(data));
    }, []);
    useEffect(() => {
        api.comments.fetchAll().then((data) => setComment(data));
    }, [comment]);
    const history = useHistory();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    });
    const handleClick = () => {
        history.push("/users");
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.comments.add(data);
        setNewImg(
            `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
                .toString(36)
                .substring(7)}.svg`
        );
        api.comments.fetchAll().then((data) => console.log(data));

        console.log(comment);
        console.log(userComment);
        userComment.map(
            (e) =>
                setNewTime(
                    Math.floor(Date.parse(new Date()) - e.created_at) /
                        (100 * 60)
                ) % 24
        );
    };

    const handleChangeDelete = (id) => {
        return api.comments.remove(id);
    };
    if (user) {
        return (
            <>
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <button
                                        className="
                                    position-absolute
                                    top-0
                                    end-0
                                    btn btn-light btn-sm
                                "
                                    >
                                        <Link
                                            style={{
                                                textDecoration: "none",
                                                color: "grey"
                                            }}
                                            role="button"
                                            to={`users/${userId}/edit`}
                                        >
                                            <i className="bi bi-gear"></i>
                                        </Link>
                                    </button>
                                    <div
                                        className="
                                    d-flex
                                    flex-column
                                    align-items-center
                                    text-center
                                    position-relative
                                "
                                    >
                                        <img
                                            // src="https://avatars.dicebear.com/api/avataaars/qweqwdas.svg"
                                            src={img}
                                            className="rounded-circle"
                                            width="150"
                                        />
                                        <div className="mt-3">
                                            <h4>{user.name}</h4>
                                            <p className="text-secondary mb-1">
                                                {user.profession.name}
                                            </p>
                                            <div className="text-muted">
                                                <i
                                                    className="
                                                bi bi-caret-down-fill
                                                text-primary
                                            "
                                                    role="button"
                                                ></i>
                                                <i
                                                    className="
                                                bi bi-caret-up
                                                text-secondary
                                            "
                                                    role="button"
                                                ></i>
                                                <span className="ms-2">
                                                    {user.rate}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card mb-3">
                                <div
                                    className="
                                card-body
                                d-flex
                                flex-column
                                justify-content-center
                                text-center
                            "
                                >
                                    <h5 className="card-title">
                                        <span>Qualities</span>
                                    </h5>
                                    <p className="card-text">
                                        <Qualities qualities={user.qualities} />
                                    </p>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card mb-3">
                                    <div
                                        className="
                                    card-body
                                    d-flex
                                    flex-column
                                    justify-content-center
                                    text-center
                                "
                                    >
                                        <h5 className="card-title">
                                            <span>Completed meetings</span>
                                        </h5>
                                        <h1 className="display-1">
                                            {user.completedMeetings}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <form onSubmit={handleSubmit}>
                                <div className="card mb-2">
                                    <div className="card-body">
                                        <div>
                                            <h2>New comment</h2>
                                            <div className="mb-4">
                                                <SelectField
                                                    options={getUser}
                                                    onChange={handleChange}
                                                    defaultOption="выбери пользователя"
                                                    name="userId"
                                                />
                                            </div>
                                            <TextAriaField
                                                label="сообщение"
                                                name="content"
                                                onChange={handleChange}
                                                value={data.content}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-sm bg-primary text-white ms-auto p-2 bd-highlight"
                                        >
                                            Опубликовать
                                        </button>
                                    </div>
                                </div>
                                {userComment.map(
                                    (elem) =>
                                        elem && (
                                            <>
                                                <div
                                                    key={elem._id}
                                                    className="card mb-3"
                                                >
                                                    <div className="card-body d-flex flex-column mb-3">
                                                        <h2>
                                                            Comments{elem._id}
                                                        </h2>
                                                        <hr />
                                                        <div className="bg-light card-body mb-3">
                                                            <div className="row">
                                                                <div className="col">
                                                                    <div className="d-flex flex-start">
                                                                        <img
                                                                            // src="https://avatars.dicebear.com/api/avataaars/qweqasdas.svg"
                                                                            src={
                                                                                img
                                                                            }
                                                                            className="
                                                                rounded-circle
                                                            shadow-1-strong
                                                            me-3
                                                "
                                                                            alt="avatar"
                                                                            width="65"
                                                                            height="65"
                                                                        />
                                                                        <div
                                                                            className="
                                                        flex-grow-1 flex-shrink-1
                                                        "
                                                                        >
                                                                            <div className="mb-4">
                                                                                <div
                                                                                    className="
                                                                        d-flex
                                                            justify-content-between
                                                            align-items-center
                                                            "
                                                                                >
                                                                                    <p className="mb-1">
                                                                                        {
                                                                                            data.pageId
                                                                                        }
                                                                                        <span className="small">
                                                                                            &nbsp;
                                                                                            5
                                                                                            {
                                                                                                time
                                                                                            }
                                                                                            минут
                                                                                            назад
                                                                                        </span>
                                                                                    </p>
                                                                                    <button
                                                                                        onClick={() =>
                                                                                            handleChangeDelete(
                                                                                                elem._id
                                                                                            )
                                                                                        }
                                                                                        type="button"
                                                                                        className="
                                                                            btn btn-sm
                                                                text-primary
                                                                d-flex
                                                                align-items-center
                                                            "
                                                                                    >
                                                                                        <i
                                                                                            className="
                                                                                bi bi-x-lg
                                                                "
                                                                                        ></i>
                                                                                    </button>
                                                                                </div>
                                                                                <p className="small mb-0">
                                                                                    {
                                                                                        elem.content
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                )}
                            </form>
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={handleClick}>Все Пользователи</button>
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
