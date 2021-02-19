import {
    getParamsFromLocation,
    setParamsToUrlString,
} from "@helpers/util.helper";
import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";

const Search = (props) => {
    const [search, setSearch] = useState("");
    const location = useLocation();
    const history = useHistory();

    const handleSearchClick = () => {
        let params = { search };
        if (!search) {
            delete params.search;
        }

        let url = setParamsToUrlString(params, location);
        history.replace(url);
    };

    const handleKeypress = (event) => {
        if (event.key === "Enter") {
            handleSearchClick();
        }
    };

    return (
        <InputGroup>
            <FormControl
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-office"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => handleKeypress(e)}
            />
            <InputGroup.Append>
                <Button onClick={() => handleSearchClick()}>Search</Button>
            </InputGroup.Append>
        </InputGroup>
    );
};

Search.propTypes = {};

export default Search;
