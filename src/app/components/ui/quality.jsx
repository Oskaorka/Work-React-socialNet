import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../hooks/useQualities";
const Quality = (id) => {
    const { isLoading, getQualities } = useQualities();
    const { qualities } = id;

    return qualities.map((e) => {
        const t = getQualities(e);

        if (!isLoading) {
            return (
                <span className={"badge m-1 bg-" + t.color} key={e}>
                    {t.name}
                </span>
            );
        } else {
            return "loading  .... ";
        }
    });
};
Quality.propTypes = {
    id: PropTypes.string
};
export default Quality;
