import React, { useState } from "react";
import PropTypes from "prop-types";
import api from "../../api";
const CommentUsers = ({ elem, img }) => {
    const [time] = useState(
        Math.floor((Date.parse(new Date()) - elem.created_at) / 1000 / 60) % 60
    );

    const handleChangeDelete = (id) => {
        // console.log(new Date(1633573058520));
        return api.comments.remove(id);
    };
    return (
        <div className="card-body d-flex flex-column mb-3">
            <h2>Comments{}</h2>
            <hr />
            <div className="bg-light card-body mb-3">
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-start">
                            <img
                                // src={`https://avatars.dicebear.com/api/avataaars/${(
                                //     Math.random() + 1
                                // )
                                //     .toString(36)
                                //     .substring(7)}.svg`}
                                // src="https://avatars.dicebear.com/api/avataaars/qweqasdas.svg"
                                src={img}
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
                                            {elem.userId === {}
                                                ? (elem.userId = "name")
                                                : elem.userId}
                                            {/* {data.userId} */}
                                            {/* {elem.userId} */}
                                            <span className="small">
                                                &nbsp;
                                                {time}
                                                &nbsp; минут назад
                                            </span>
                                        </p>
                                        <button
                                            onClick={() =>
                                                handleChangeDelete(elem._id)
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
                                    <p className="small mb-0">{elem.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
CommentUsers.propTypes = {
    elem: PropTypes.object,
    // content: PropTypes.string,
    // data: PropTypes.string,
    img: PropTypes.string
};
export default CommentUsers;
