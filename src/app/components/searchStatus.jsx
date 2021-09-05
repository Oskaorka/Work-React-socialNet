import React from "react";
import PropTypes from "prop-types";
const SearchStatus = ({ number }) => {
    if (number === 0) {
        return (
            <span className="badge bg-danger">никто с тобой не тусанет</span>
        );
    }
    if (number > 1 && number < 5) {
        return (
            <span className="badge bg-primary">
                {number} человека тусанут с тобой сегодня
            </span>
        );
    }
    return (
        <span className="badge bg-primary">
            {number} человек тусанет с тобой сегодня
        </span>
    );
};
SearchStatus.propTypes = { number: PropTypes.number.isRequired };
export default SearchStatus;
