import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Breadcrumb } from "react-bootstrap";

const PageTitle = ({ title, breadcrumbs = [] }) => {
    return (
        <Container fluid>
            <div className="py-15 d-flex-jc-sb d-flex-ai-c">
                <h3>{title}</h3>
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <Breadcrumb>
                        {breadcrumbs.map((item, idx) =>
                            idx === breadcrumbs.length - 1 ? (
                                <Breadcrumb.Item key={idx} active>
                                    {item.name}
                                </Breadcrumb.Item>
                            ) : (
                                <Breadcrumb.Item
                                    key={idx}
                                    linkAs={Link}
                                    linkProps={{ to: item.link }}
                                >
                                    {item.name}
                                </Breadcrumb.Item>
                            )
                        )}
                    </Breadcrumb>
                )}
            </div>
        </Container>
    );
};

PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
    breadcrumbs: PropTypes.array,
};

export default PageTitle;
