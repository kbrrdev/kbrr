import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Pagination } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import {
    getParamsFromLocation,
    setParamsToUrlString,
} from "@helpers/util.helper";

const CustomPagination = ({ pagination, ...props }) => {
    const location = useLocation();
    const history = useHistory();

    const handlePaginationClick = (page) => {
        let params = getParamsFromLocation(location);

        params = Object.assign({}, { ...params, page: page });

        let url = setParamsToUrlString(params, location);
        history.replace(url);
    };

    return (
        <Fragment>
            {pagination && Object.keys(pagination).length > 0 && (
                <Pagination {...props}>
                    {pagination.totalPages <= 9 && (
                        <Fragment>
                            <Pagination.Prev
                                disabled={pagination.currentPage === 1}
                                onClick={() =>
                                    handlePaginationClick(
                                        pagination.currentPage - 1
                                    )
                                }
                            >
                                Previous
                            </Pagination.Prev>
                            {[...Array(pagination.totalPages)].map(
                                (value, idx) => (
                                    <Pagination.Item
                                        key={idx}
                                        active={
                                            pagination.currentPage === idx + 1
                                        }
                                        onClick={() =>
                                            handlePaginationClick(idx + 1)
                                        }
                                    >
                                        {idx + 1}
                                    </Pagination.Item>
                                )
                            )}
                            <Pagination.Next
                                disabled={
                                    pagination.currentPage ===
                                    pagination.totalPages
                                }
                                onClick={() =>
                                    handlePaginationClick(
                                        pagination.currentPage + 1
                                    )
                                }
                            >
                                Next
                            </Pagination.Next>
                        </Fragment>
                    )}
                    {pagination.totalPages > 8 && (
                        <Fragment>
                            <Pagination.Prev
                                disabled={pagination.currentPage === 1}
                                onClick={() =>
                                    handlePaginationClick(
                                        pagination.currentPage - 1
                                    )
                                }
                            >
                                Previous
                            </Pagination.Prev>
                            <Pagination.Item
                                onClick={() => handlePaginationClick(1)}
                                active={pagination.currentPage === 1}
                            >
                                1
                            </Pagination.Item>
                            {pagination.currentPage > 5 ? (
                                <Pagination.Ellipsis disabled />
                            ) : (
                                <Pagination.Item
                                    onClick={() => handlePaginationClick(2)}
                                    active={pagination.currentPage === 2}
                                >
                                    2
                                </Pagination.Item>
                            )}
                            {[...Array(5)].map((value, idx) => {
                                let pageIdx;
                                console.log(pagination.currentPage);

                                if (
                                    pagination.currentPage >
                                    pagination.totalPages - 5
                                ) {
                                    pageIdx = pagination.totalPages - 6 + idx;
                                } else if (
                                    pagination.currentPage < 3 ||
                                    pagination.currentPage < 6
                                ) {
                                    pageIdx = idx + 3;
                                } else {
                                    pageIdx = pagination.currentPage - 2 + idx;
                                }

                                return (
                                    <Pagination.Item
                                        key={idx}
                                        active={
                                            pagination.currentPage === pageIdx
                                        }
                                        onClick={() =>
                                            handlePaginationClick(pageIdx)
                                        }
                                    >
                                        {pageIdx}
                                    </Pagination.Item>
                                );
                            })}
                            {pagination.currentPage <
                            pagination.totalPages - 4 ? (
                                <Pagination.Ellipsis disabled />
                            ) : (
                                <Pagination.Item
                                    onClick={() =>
                                        handlePaginationClick(
                                            pagination.totalPages - 1
                                        )
                                    }
                                    active={
                                        pagination.currentPage ===
                                        pagination.totalPages - 1
                                    }
                                >
                                    {pagination.totalPages - 1}
                                </Pagination.Item>
                            )}
                            <Pagination.Item
                                onClick={() =>
                                    handlePaginationClick(pagination.totalPages)
                                }
                                active={
                                    pagination.currentPage ===
                                    pagination.totalPages
                                }
                            >
                                {pagination.totalPages}
                            </Pagination.Item>
                            <Pagination.Next
                                disabled={
                                    pagination.currentPage ===
                                    pagination.totalPages
                                }
                                onClick={() =>
                                    handlePaginationClick(
                                        pagination.currentPage + 1
                                    )
                                }
                            >
                                Next
                            </Pagination.Next>
                        </Fragment>
                    )}
                    {/* <Pagination.First>First</Pagination.First>
                            <Pagination.Prev>Previous</Pagination.Prev>
                            <Pagination.Item>{1}</Pagination.Item>
                            <Pagination.Ellipsis />

                            <Pagination.Item>{10}</Pagination.Item>
                            <Pagination.Item>{11}</Pagination.Item>
                            <Pagination.Item active>{12}</Pagination.Item>
                            <Pagination.Item>{13}</Pagination.Item>
                            <Pagination.Item disabled>{14}</Pagination.Item>

                            <Pagination.Ellipsis />
                            <Pagination.Item>{20}</Pagination.Item>
                            <Pagination.Next>Next</Pagination.Next>
                            <Pagination.Last>Last</Pagination.Last> */}
                </Pagination>
            )}
        </Fragment>
    );
};

CustomPagination.propTypes = {
    pagination: PropTypes.object,
};

export default CustomPagination;
