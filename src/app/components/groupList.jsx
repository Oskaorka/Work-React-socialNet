import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    // console.log(Object.keys(items));
    // console.log(items);
    console.log(selectedItem);
    return (
        <ul className="list-group">
            {Object.keys(items).map((item) => (
                <li
                    key={items[item][valueProperty]}
                    className={
                        "list-group-item" +
                        (items[item] === selectedItem ? " active" : "")
                    }
                    onClick={() => onItemSelect(items[item])}
                    role="button"
                >
                    {items[item][contentProperty]}
                </li>
            ))}
        </ul>
    );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
    // selectedItem: {}
};
GroupList.propTypes = {
    items: PropTypes.object.isRequired,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object.isRequired
};
export default GroupList;