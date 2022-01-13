import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessions,
    getProfession,
    getProfessionsLoadingStatus
} from "../../store/professions";

const Profession = ({ id }) => {
    const profession = useSelector(getProfessions());
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const prof = getProfession(id, profession);
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return "loading ...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
