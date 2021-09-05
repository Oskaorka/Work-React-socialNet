import React from "react";
import PropTypes from "prop-types";
const Qualitie = ({ user, styleWhite }) => {
    const tagTd1 = () => {
        <td>
            <span
                style={styleWhite}
                className={"bg-" + user.qualities[0].color}
            >
                {user.qualities[0].name}
            </span>
        </td>;
    };
    const tagTd2 = () => {
        <td>
            {user.qualities.map((e) => (
                <span
                    key={e.name}
                    style={styleWhite}
                    className={"bg-" + e.color}
                >
                    {e.name + " "}
                </span>
            ))}
        </td>;
    };
    return <>{user.qualities.length === 1 ? tagTd1() : tagTd2()}</>;
};
Qualitie.propTypes = {
    user: PropTypes.object.isRequired,
    styleWhite: PropTypes.object.isRequired
};
export default Qualitie;
