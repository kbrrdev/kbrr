import Pagination from "@components/Pagination/Pagination";
import React, { Fragment } from "react";
import { Col, Row, Table } from "react-bootstrap";
import PropTypes from "prop-types";

const DataTable = ({ pagination, children, ...props }) => {
    let firstItem = 1,
        lastItem;

    if (pagination && Object.keys(pagination).length > 0) {
        if (pagination.currentPage > 1) {
            firstItem = (pagination.currentPage - 1) * pagination.pageSize + 1;
        }

        lastItem = firstItem + pagination.countItems - 1;
    }
    return (
        <Fragment>
            {pagination && Object.keys(pagination).length > 0 && (
                <Row className="mb-3">
                    <Col md={6} className="d-flex-ai-c">
                        Showing {firstItem} to {lastItem} of{" "}
                        {pagination.totalItems} entries
                    </Col>
                    <Col md={6}>
                        <Pagination
                            className="float-right mb-0"
                            pagination={pagination}
                        />
                    </Col>
                </Row>
            )}

            <Row>
                <Col>
                    <Table {...props}>{children}</Table>
                </Col>
            </Row>

            {pagination && Object.keys(pagination).length > 0 && (
                <Row>
                    <Col md={6} className="d-flex-ai-c">
                        Showing {firstItem} to {lastItem} of{" "}
                        {pagination.totalItems} entries
                    </Col>
                    <Col md={6}>
                        <Pagination
                            className="float-right mb-0"
                            pagination={pagination}
                        />
                    </Col>
                </Row>
            )}
        </Fragment>
    );
};

DataTable.propTypes = {
    pagination: PropTypes.object,
};

export default DataTable;
