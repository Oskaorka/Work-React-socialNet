import React from "react";
import PropTypes from "prop-types";
import TimerCount from "./timerCount";
import { Link } from "react-router-dom";
const User = ({ use, id }) => {
    const newNum = use.time.split(",");
    return (
        <div
            style={{
                width: "40%",
                margin: "0 auto",
                boxShadow: "2px 2px 10px black",
                textAlign: "center",
                background: "#869091e8"
            }}
        >
            <h1
                style={{
                    color: "#732458",
                    margin: "0",
                    padding: "10px",
                    textShadow: "2px 2px 12px #ffffff,-2px -2px 10px red"
                }}
            >
                Имя {use.name}
            </h1>
            <h2
                style={{
                    color: "#e26bed",
                    margin: "0",
                    padding: "10px",
                    textShadow: "2px 2px 10px  black,-2px -2px 12px #ffffff"
                }}
            >
                Профессия {use.profession.name}
            </h2>
            <h3
                style={{
                    color: "#f78888",
                    margin: "0",
                    padding: "10px",
                    textShadow: "-2px -2px 10px #ffffff,2px 2px 10px black"
                }}
            >
                Качества {use.qualities.map((qual) => qual.name + ", ")}
            </h3>
            <h4
                style={{
                    color: "#77bec7",
                    margin: "0",
                    padding: "10px",
                    textShadow: "-2px -2px 10px #ffffff,2px 2px 10px black"
                }}
            >
                Встретился {use.completedMeetings} раз
            </h4>
            <h5
                style={{
                    color: "#1cbd37fb",
                    margin: "0",
                    padding: "10px",
                    textShadow: "2px 2px 10px black"
                }}
            >
                Рейтинг {use.rate}
            </h5>
            <h3
                style={{
                    color: "#869091e8",
                    margin: "0",
                    padding: "10px",
                    textShadow: "2px 2px 10px black"
                }}
            >
                Сроки {TimerCount(newNum[0], newNum[1], newNum[2])}
            </h3>
            <Link role="button" className="btn btn-info m-3" to={`${id}/edit`}>
                изменить
            </Link>
        </div>
    );
};

User.propTypes = {
    use: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
};
export default User;
