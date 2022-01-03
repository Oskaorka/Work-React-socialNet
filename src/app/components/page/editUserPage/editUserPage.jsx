import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { validator } from "../../../utils/validator";

import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radio.Field";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useQualities } from "../../../hooks/useQualities";
import { useProfessions } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
    const { userId } = useParams();
    const { updateUser, currentUser } = useAuth();
    const { qualities } = useQualities();
    const { professions } = useProfessions();

    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        licence: true,
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
            .toString(36)
            .substring(7)}.svg`,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        qualities: []
    });
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const [errors, setErrors] = useState({});

    const getQualities = (elements) => {
        const qualitiesQrray = [];
        for (const elem of elements) {
            for (const qualy in qualities) {
                if (elem.value === qualities[qualy]._id) {
                    qualitiesQrray.push(qualities[qualy]._id);
                }
            }
        }
        return qualitiesQrray;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const newData = {
            ...data,
            qualities: getQualities(data.qualities),
            _id: userId
        };
        updateUser(newData);
    };
    const transformData = (data) => {
        return data.map((qual) => ({ label: qual.name, value: qual._id }));
    };

    const validatorConfog = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },

        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => validate(), [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfog);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="container mt-5">
            <BackHistoryButton />
            {userId === currentUser._id && (
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
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                name="profession"
                                options={transformData(professions)}
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
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
                                defaultValue={data.qualities}
                                options={transformData(qualities)}
                                onChange={handleChange}
                                values
                                name="qualities"
                                label="Выберите ваши качесвта"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
// EditUserPage.propTypes = {
//     userDataId: PropTypes.string
// };
export default EditUserPage;
