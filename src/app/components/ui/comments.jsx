import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../api";
import CommentsUsersList, { AddCommentForm } from "../common/comments";
import { orderBy } from "lodash";

const Comments = ({ userId }) => {
    const [comments, setComments] = useState();
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);
    const handleSubmit = (data) => {
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };
    const handleRemoveComment = (id) => {
        api.comments.remove(id).then((id) => {
            setComments(comments.filter((x) => x._id !== id));
        });
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body d-flex flex-column mb-3">
                        <h2>Comments</h2>
                        <hr />
                        <CommentsUsersList
                            elem={sortedComments}
                            onRemove={handleRemoveComment}
                        />
                    </div>
                </div>
            )}
        </>
    );
};
Comments.propTypes = {
    userId: PropTypes.string
};
export default Comments;
