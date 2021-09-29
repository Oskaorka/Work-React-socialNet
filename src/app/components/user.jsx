import React from "react";
import PropTypes from "prop-types";
import TimerCount from "./timerCount";
const User = ({ use }) => {
    const newNum = use.time.split(",");
    return (
        <div
            style={{
                width: "40%",
                margin: "0 auto",
                boxShadow: "2px 2px 10px red",
                textAlign: "center"
            }}
        >
            <h1 style={{ background: "#732458", margin: "0", padding: "10px" }}>
                Имя {use.name}
            </h1>
            <h2 style={{ background: "#e26bed", margin: "0", padding: "10px" }}>
                Профессия {use.profession.name}
            </h2>
            <h3 style={{ background: "#f78888", margin: "0", padding: "10px" }}>
                Качества {use.qualities.map((qual) => qual.name + ", ")}
            </h3>
            <h4 style={{ background: "#77bec7", margin: "0", padding: "10px" }}>
                Встретился {use.completedMeetings} раз
            </h4>
            <h5
                style={{
                    background: "#1cbd37fb",
                    margin: "0",
                    padding: "10px"
                }}
            >
                Рейтинг {use.rate}
            </h5>
            <h3
                style={{
                    background: "#869091e8",
                    margin: "0",
                    padding: "10px"
                }}
            >
                Сроки {TimerCount(newNum[0], newNum[1], newNum[2])}
            </h3>
        </div>
    );
};

User.propTypes = {
    use: PropTypes.object.isRequired
};
export default User;
