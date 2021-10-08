import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
    const [showpassword, setShowpassword] = useState(false);
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    const toggleShowPasswor = () => {
        setShowpassword((prevstate) => !prevstate);
    };
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input
                    type={showpassword ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={getInputClasses()}
                />
                {type === "password" && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPasswor}
                    >
                        <i
                            className={
                                "bi bi-eye" + (showpassword ? "-slash" : "")
                            }
                        ></i>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};
TextField.defaultProps = { type: "text" };
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func
};

export default TextField;
