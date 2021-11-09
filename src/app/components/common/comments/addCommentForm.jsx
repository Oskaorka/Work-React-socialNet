import React, { useState, useEffect } from "react";
import SelectField from "../form/selectField";
import TextAriaField from "../form/textAriaField";
import api from "../../../api";
import { validator } from "../../../utils/ validator";
import PropTypes from "prop-types";
const initialData = { userId: "", content: "" };
const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfog = {
        userId: {
            isRequired: {
                message: "Выберите от чьего имени вы хотите отправить сообщение"
            }
        },
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfog);

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        api.users.fetchAll().then(setUsers);
    }, []);
    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };
    const arrayOfUsers =
        users &&
        Object.keys(users).map((userId) => ({
            name: users[userId].name,
            value: users[userId]._id
        }));
    return (
        <>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <SelectField
                        options={arrayOfUsers}
                        onChange={handleChange}
                        defaultOption="выбери пользователя"
                        name="userId"
                        value={data.userId}
                        error={errors.userId}
                    />
                </div>
                <TextAriaField
                    label="сообщение"
                    name="content"
                    onChange={handleChange}
                    value={data.content}
                    error={errors.content}
                />
                <button
                    type="submit"
                    className="btn btn-sm bg-primary text-white ms-auto p-2 bd-highlight"
                >
                    Опубликовать
                </button>
            </form>
        </>
    );
};
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};
export default AddCommentForm;
