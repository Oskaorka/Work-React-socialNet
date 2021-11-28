import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import professionService from "../services/professionService";
import { toast } from "react-toastify";

const ProfessionContext = React.createContext();

export const useProfessions = () => {
    return useContext(ProfessionContext);
};
export const ProfessionProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [professions, setProfession] = useState([]);
    const [error, setError] = useState(null);
    // console.log(professions);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    useEffect(() => {
        getProfessionsList();
    }, []);
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    }
    function getProfession(id) {
        return professions.find((p) => p._id === id);
        // console.log(id);
    }
    async function getProfessionsList() {
        try {
            const { content } = await professionService.get();
            // console.log(content);
            setProfession(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    return (
        <ProfessionContext.Provider
            value={{ isLoading, professions, getProfession }}
        >
            {children}
        </ProfessionContext.Provider>
    );
};
ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
// export default ProfessionProvider;
