import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/ validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/MultiSelectField";
import { useHistory, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../api";

const EditUserPage = () => {
    const { userId } = useParams();
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [isLoading, setIsLoading] = useState(false);
    const [qualities, setQualities] = useState({});
    const [professions, setProfession] = useState([]);
    const [errors, setErrors] = useState({});
    const getProfessionById = (id) => {
        for (const prof in professions) {
            const profData = professions[prof];
            if (profData._id === id) return profData;
        }
    };
    const getQualities = (elements) => {
        const qualitiesQrray = [];
        for (const elem of elements) {
            for (const qualy in qualities) {
                if (elem.value === qualities[qualy]._id) {
                    qualitiesQrray.push(qualities[qualy]);
                }
            }
        }
        return qualitiesQrray;
    };
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        api.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then((data) => history.push(`/users/${data._id}`));
        console.log(data);
        history.replace(`/users/${userId}`);
    };
    useEffect(() => {
        setIsLoading(true);
        api.users.getById(userId).then(({ profession, ...data }) =>
            setData((prevState) => ({
                ...prevState,
                ...data,
                profession: profession._id
            }))
        );
        api.qualities.fetchAll().then((data) => setQualities(data));
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfog);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const history = useHistory();
    const returnAllUsers = () => {
        history.replace(`/users/${userId}`);
        // console.log(isLoading);
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4 position-relative">
                    <button
                        className="btn btn-primary my-2 mr-2"
                        onClick={returnAllUsers}
                    >
                        назад
                    </button>
                    {!isLoading && Object.keys(professions).length > 0 ? (
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
                    ) : (
                        <p className="position-absolute top-50 start-50">
                            Loading...
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
EditUserPage.propTypes = { id: PropTypes.string };
export default EditUserPage;
