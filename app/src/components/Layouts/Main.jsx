import Navbar from "@layouts/Navbar";
import Sidebar from "@layouts/Sidebar";
import React, { useState } from "react";
import { useLocation, Route, useHistory } from "react-router-dom";
import { getIsLoggedIn } from "@helpers/session.helper";
import { Col, Container, Row } from "react-bootstrap";

const Main = ({ component, ...props }) => {
    let Component = component;
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const history = useHistory();

    if (!getIsLoggedIn()) {
        history.push("/");
    }

    const location = useLocation();
    let pathname = location.pathname;
    pathname = pathname.split("/");

    let pageType = "";
    if (pathname.includes("company")) {
        pageType = "company";
    } else if (pathname.includes("employee")) {
        pageType = "employee";
    }

    return (
        <Route
            {...props}
            render={(matchProps) => (
                <div
                    className={`main-layout ${
                        toggleSidebar ? "sidebar-collapse" : ""
                    }`}
                >
                    <Sidebar pageType={pageType} />
                    <Navbar
                        pageType={pageType}
                        toggleSidebar={toggleSidebar}
                        setToggleSidebar={setToggleSidebar}
                    />
                    <div className="main-content">
                        <Container fluid>
                            <Row>
                                <Col>
                                    <Component {...matchProps} />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    {/* <footer className="footer">Created by kbrr</footer> */}
                </div>
            )}
        />
    );
};

export default Main;
