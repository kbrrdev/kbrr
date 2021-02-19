import {
    faCogs,
    faDollarSign,
    faSearch,
    faUsers,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "@actions/user.action";
import { Button } from "react-bootstrap";

const Navbar = ({ pageType, toggleSidebar, setToggleSidebar }) => {
    let history = useHistory();

    return (
        <header className="navbar d-flex-jc-sb d-flex-ai-c px-10 py-10">
            <nav>
                {/* <button
                    onClick={() => setToggleSidebar(!toggleSidebar)}
                    className="pr-25"
                >
                    Toggle
                </button> */}

                <ul className="d-flex">
                    <li className="px-15 py-10 nav-item">
                        <Link to="#">Payroll</Link>
                    </li>
                    <li className="px-15 py-10 nav-item">
                        <Link to="#">Employee</Link>
                    </li>
                    <li className="px-15 py-10 nav-item">
                        <Link to="#">Company</Link>
                    </li>
                </ul>
            </nav>
            <nav className="d-flex-ai-c">
                <Button variant="link" type="button" onClick={() => logout()}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                </Button>
            </nav>
        </header>
    );
};

Navbar.propTypes = {
    toggleSidebar: PropTypes.bool.isRequired,
    setToggleSidebar: PropTypes.func.isRequired,
    pageType: PropTypes.string.isRequired,
};

export default Navbar;
