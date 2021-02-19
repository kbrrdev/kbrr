import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { companyRoutes } from "@layouts/sidebarRoutes";
import PropTypes from "prop-types";

const Sidebar = ({ pageType }) => {
    const [activeItem, setActiveItem] = useState([]);
    const [routes, setRoutes] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if (pageType === "company") {
            setRoutes(companyRoutes);
        }
    }, [pageType]);

    const brand = "CPI";
    const user = "Karl Bryan Robles";

    const isItemActive = (name) => {
        let isActive = "";
        if (activeItem.includes(name)) {
            isActive = "active";
        }
        return isActive;
    };

    const toggleItem = (name) => {
        if (activeItem.includes(name)) {
            let newActiveItem = activeItem.filter((item) => item !== name);
            setActiveItem(newActiveItem);
        } else {
            setActiveItem((prevActiveItem) => [...prevActiveItem, name]);
        }
    };

    const activeLink = (linkName) => {
        let isActive = "";

        if (linkName === location.pathname) {
            isActive = "active";
        }

        return isActive;
    };

    return (
        <aside className="main-sidebar elevation-4">
            <Link className="brand-link d-flex-ai-c px-10" to="#">
                <div className="mr-5 logo elevation-3">{brand.charAt(0)}</div>
                {brand}
            </Link>
            <div className="sidebar px-10">
                <div>
                    <div>{user.charAt(0)}</div>
                    <div>
                        <Link to="#">{user}</Link>
                    </div>
                </div>
                <nav>
                    <ul>
                        {routes.map((route, index) => (
                            <Fragment key={index}>
                                <li className="nav-header txt-uppercase">
                                    <Link to="#">{route.title}</Link>
                                </li>
                                {route.items.map((item, key) => (
                                    <Fragment key={key}>
                                        <li
                                            className={`nav-item ${isItemActive(
                                                item.name
                                            )}`}
                                        >
                                            <Link
                                                to={item.link}
                                                className={`mb-1 ${activeLink(
                                                    item.link
                                                )}`}
                                                onClick={() => {
                                                    if (item.items) {
                                                        toggleItem(item.name);
                                                    }
                                                }}
                                            >
                                                {item.icon && (
                                                    <div className="d-flex-cc mr-2">
                                                        <FontAwesomeIcon
                                                            icon={item.icon}
                                                        />
                                                    </div>
                                                )}
                                                <div>{item.name}</div>

                                                {item.items ? (
                                                    <div className="d-flex-cc f-right">
                                                        <FontAwesomeIcon
                                                            icon={faAngleRight}
                                                        />
                                                    </div>
                                                ) : null}
                                            </Link>

                                            {item.items ? (
                                                <ul className="nav-treeview">
                                                    {item.items.map(
                                                        (child, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="nav-item"
                                                            >
                                                                <Link
                                                                    to={
                                                                        child.link
                                                                    }
                                                                    className={`pl-35 mb-1 ${activeLink(
                                                                        child.link
                                                                    )}`}
                                                                >
                                                                    {child.icon && (
                                                                        <div className="d-flex-cc mr-2">
                                                                            <FontAwesomeIcon
                                                                                icon={
                                                                                    child.icon
                                                                                }
                                                                            />
                                                                        </div>
                                                                    )}

                                                                    <div>
                                                                        {
                                                                            child.name
                                                                        }
                                                                    </div>
                                                                </Link>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            ) : null}
                                        </li>
                                    </Fragment>
                                ))}
                                <hr />
                            </Fragment>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

Sidebar.propTypes = {
    pageType: PropTypes.string.isRequired,
};

export default Sidebar;
