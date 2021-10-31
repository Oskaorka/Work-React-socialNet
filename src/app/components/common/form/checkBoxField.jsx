import React from "react";
import ProppTypes from "prop-types";
const CheckBoxField = ({ name, value, onChange, children, error }) => {
    const handleChange = () => {
        onChange({ name: name, value: !value });
    };
    const getInputClasses = () => {
        return "form-check-input" + (error ? " is-invalid" : "");
    };
    return (
        <div className="form-check mb-4">
            <input
                className={getInputClasses()}
                type="checkbox"
                value=""
                onChange={handleChange}
                id={name}
                checked={value}
            />
            <label className="form-check-label" htmlFor={name}>
                {children}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
CheckBoxField.propTypes = {
    name: ProppTypes.string,
    value: ProppTypes.bool,
    onChange: ProppTypes.func,
    children: ProppTypes.oneOfType([
        ProppTypes.arrayOf(ProppTypes.node),
        ProppTypes.node
    ]),
    error: ProppTypes.string
};
export default CheckBoxField;
