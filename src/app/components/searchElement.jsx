import React from "react";
import TextField from "./common/form/textField";
import PropTypes from "prop-types";
const SearchElement = ({ data, handleSearchQuery }) => {
    // const [data, setData] = useState({ search: "" });
    // const handleSearch = (e) => {
    //     e.preventDefault();
    //     const finde = e.target.value.toLowerCase();
    //     setData((prevState) => ({
    //         ...prevState,
    //         [e.target.name]: finde
    //     }));
    //     const findeUser = users.filter((user) =>
    //         user.name.toLowerCase().match(data.search)
    //             ? user
    //             : console.log("lol")
    //     );
    //     // console.log(rer);
    //     console.log(findeUser);
    //     // setUsers(findeUser);
    //     // finde === ""
    //     //     ? api.users.fetchAll().then((data) => setUsers(data))
    //     //     : console.log("no");
    //     // console.log(data);
    // };
    console.log(data);
    return (
        <form>
            <TextField
                name="search"
                value={data}
                onChange={handleSearchQuery}
            />
        </form>
    );
};
SearchElement.propTypes = {
    handleSearchQuery: PropTypes.func,
    data: PropTypes.object
    // users: PropTypes.array
};
export default SearchElement;
