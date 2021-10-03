import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(item);
            }
            return component;
        }
        return _.get(item, columns[column].path);
    };
    const bright = {
        borderRight: "1px solid #7e9298",
        textAlign: "center"
    };
    return (
        <>
            <tbody>
                {data.map((item) => (
                    // <tr key={item._id} style={{ background: "tomato" }}>
                    <tr key={item._id} style={{ background: "#afc0db" }}>
                        {Object.keys(columns).map((column) => (
                            <td style={bright} key={column}>
                                {renderContent(item, column)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </>
    );
};
TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    // date: PropTypes.number.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableBody;
