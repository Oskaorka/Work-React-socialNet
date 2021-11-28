import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import qualityService from "../services/qualityService";

const QualitiesContext = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContext);
};
export const QalitiesProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [qualities, setQuality] = useState([]);
    const [error, setError] = useState(null);
    // console.log(children);
    useEffect(() => {
        getQualityList();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    }
    // console.log(qualities);
    function getQualities(id) {
        // console.log(id);
        return qualities.find((q) => q._id === id);
    }
    async function getQualityList() {
        try {
            const { content } = await qualityService.get();
            // console.log(content);
            setQuality(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    return (
        <QualitiesContext.Provider
            value={{ isLoading, qualities, getQualities }}
        >
            {children}
        </QualitiesContext.Provider>
    );
};
QalitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
