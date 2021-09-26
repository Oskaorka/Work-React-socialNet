import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import UserList from "./userList";

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

    // console.log(UserList);
    // console.log(<UserList />);
    return (
        <>
            <tbody>
                {data.map((item) => (
                    <tr key={item._id}>
                        {/* {console.log(item.name)} */}
                        {Object.keys(columns).map((column) => (
                            <td style={bright} key={column}>
                                {renderContent(item, column) === item.name ? (
                                    <UserList data={item} bright={bright} />
                                ) : (
                                    renderContent(item, column)
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
            {/* <UserList /> */}
        </>
    );
};
TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableBody;
