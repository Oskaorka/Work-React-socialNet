import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/ validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/MultiSelectField";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import api from "../../../api";

const EditUserPage = ({ id }) => {
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [qualities, setQualities] = useState({});
    const [professions, setProfession] = useState();
    const [errors, setErrors] = useState({});
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfog = {
        name: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isName: {
                message: "Email введен некорректно"
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfog);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        Object.values(professions).map((e) =>
            e._id === data.profession ? (data.profession = e) : null
        );
        Object.values(qualities).map((qual) =>
            data.qualities.map((e) =>
                e.value === qual._id ? data.qualities.push(qual) : null
            )
        );
        // добавляется в верхнем выражении лишнее(в qualities)
        api.users.update(id, data);
        // returnAllUsers();
    };

    const history = useHistory();
    const returnAllUsers = () => {
        history.replace(`/users/${id}`);
    };
    return (
        <div className="container mt-5">
            <button onClick={returnAllUsers}>назад</button>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <SelectField
                            options={professions}
                            label="выбери свою профессию"
                            value={data.profession}
                            error={errors.profession}
                            onChange={handleChange}
                            defaultOption="Choose..."
                            name="profession"
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
                            label="Выберите ваш пол"
                        />
                        <MultiSelectField
                            options={qualities}
                            onChange={handleChange}
                            name="qualities"
                            label="Выберите ваши качества"
                        />

                        <button
                            type="submit"
                            disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Сохранить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
EditUserPage.propTypes = { id: PropTypes.string };
export default EditUserPage;
