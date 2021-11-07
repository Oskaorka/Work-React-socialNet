import React, { useState, useEffect } from "react";
import api from "../../api";
import SelectField from "../common/form/selectField";
import TextAriaField from "../common/form/textAriaField";
import PropTypes from "prop-types";
import CommentUsers from "./commentsUsers";
const Comments = ({ userId }) => {
    const [getUser, setNewUser] = useState({});
    const [data, setData] = useState({
        userId: getUser,
        pageId: userId,
        content: ""
    });

    const [img, setNewImg] = useState(
        `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
            .toString(36)
            .substring(7)}.svg`
    );

    const [comment, setComment] = useState();
    const [userComment, setUserComment] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => setNewUser(data));
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setUserComment(data));
    }, [userComment]);
    useEffect(() => {
        api.comments.fetchAll().then((data) => setComment(data));
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(img);
        api.comments.add(data);
        console.log(userComment);
        console.log(comment);
        setNewImg(
            `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
                .toString(36)
                .substring(7)}.svg`
        );
        api.comments.fetchAll().then((data) => console.log(data));
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="card mb-2">
                    <div className="card-body">
                        {/* <div> */}
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
                        {/* </div> */}
                        <button
                            type="submit"
                            className="btn btn-sm bg-primary text-white ms-auto p-2 bd-highlight"
                        >
                            Опубликовать
                        </button>
                    </div>
                </div>
            </form>
            {userComment &&
                userComment.map(
                    (elem) =>
                        elem && (
                            <div key={elem._id} className="card mb-3">
                                <CommentUsers
                                    elem={elem}
                                    data={data.userId}
                                    img={img}
                                />
                            </div>
                        )
                )}
        </>
    );
};
Comments.propTypes = {
    userId: PropTypes.string
};
export default Comments;
