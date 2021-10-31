import React from "react";
import PropTypes from "prop-types";
const TextAriaField = ({ label, name, value, onChange }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <textarea
                type="text"
                name={name}
                value={value}
                onChange={handleChange}
                className="form-control"
                // id="exampleFormControlTextarea1"
                id={name}
                rows="3"
            ></textarea>
        </div>
    );
};
TextAriaField.propTypes = {
    label: PropTypes.string,
    // type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
    // error: PropTypes.string
};
export default TextAriaField;
