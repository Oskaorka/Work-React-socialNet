import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import api from "../../API/index";
import { validator } from "../../utils/validator";

const ChangeUser = ({ user }) => {
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [qualities, setQualities] = useState({});
    const [professions, setProfessions] = useState();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        professions
            ? setProfessions(professions)
            : api.professions.fetchAll().then((data) => setProfessions(data));

        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
    const validatorConfig = {
        // name: {
        //     isRequired: {
        //         message: "error name"
        //     },
        //     isName: {
        //         message: "min 5 symbol"
        //     }
        // },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен не корректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из  восьми символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выбирите вашу профессию"
            }
        },
        licence: {
            isRequired: {
                message:
                    "вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        validate();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);

        api.users.update(_id, data);
    };
    const params = useParams();
    const { _id } = params;
    const history = useHistory();
    const returnAllUsers = () => {
        history.replace(`/users/${_id}`);
    };
    return (
        <div className="container mt-5">
            <button onClick={returnAllUsers}>Back</button>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow-lg p-4 rounded">
                    <form onSubmit={handleSubmit}>
                        <h1>{user.name}</h1>
                        <h1>{data.profession}</h1>
                        <h1>{data.name}</h1>
                        <h1>{isValid}</h1>
                        <TextField
                            name="name"
                            label="Имя"
                            value={data.name}
                            onChange={handleChange}
                        />
                        <TextField
                            name="email"
                            label="Электронная почта"
                            value={data.email}
                            error={errors.email}
                            onChange={handleChange}
                        />
                        <SelectField
                            options={professions}
                            onChange={handleChange}
                            defaultOption="Choose..."
                            // error={errors.profession}
                            value={data.profession}
                            label="выберите вашу профессию"
                        />
                        <RadioField
                            options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" },
                                { name: "Other", value: "other" }
                            ]}
                            value={data.sex}
                            name="sex"
                            onChange={handleChange}
                            label="Выберите ваши пол"
                        />
                        <MultiSelectField
                            options={qualities}
                            onChange={handleChange}
                            name="qualities"
                            label="Выберите ваши качества"
                        />
                        <button
                            type="submit"
                            // disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto m2"
                        >
                            сохранить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
ChangeUser.propTypes = {
    user: PropTypes.object
};
export default ChangeUser;
