import { getRates } from "@actions/rate.action";
import DataTable from "@components/DataTable/DataTable";
import {
    faEdit,
    faFileCsv,
    faFileExcel,
    faFilePdf,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    convertIfNull,
    dateConvertIfNull,
    getParamsFromLocation,
    tableItemCounter,
} from "@helpers/util.helper";
import PageTitle from "@layouts/PageTitle";
import React, { Fragment, useEffect, useState } from "react";
import {
    Button,
    ButtonGroup,
    Card,
    Col,
    OverlayTrigger,
    Row,
    Tooltip,
} from "react-bootstrap";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

const Rate = ({ rates }) => {
    let breadcrumbs = [
        { name: "Dashboard", link: "/dashboard" },
        { name: "Rates" },
    ];

    const location = useLocation();

    useEffect(() => {
        getRates(getParamsFromLocation(location));
    }, [location]);

    return (
        <Fragment>
            <PageTitle title="Day/Hour Rates" breadcrumbs={breadcrumbs} />
            <Card>
                <Card.Header className="bg-white">
                    <Row>
                        <Col sm={9}>
                            <ButtonGroup aria-label="Basic example">
                                <Button size="sm" variant="secondary">
                                    <FontAwesomeIcon
                                        icon={faFilePdf}
                                        className="mr-1"
                                    />
                                    PDF
                                </Button>
                                <Button size="sm" variant="secondary">
                                    <FontAwesomeIcon
                                        icon={faFileCsv}
                                        className="mr-1"
                                    />
                                    CSV
                                </Button>
                                <Button size="sm" variant="secondary">
                                    <FontAwesomeIcon
                                        icon={faFileExcel}
                                        className="mr-1"
                                    />
                                    Excel
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <DataTable
                        bordered
                        hover
                        responsive
                        pagination={rates.pagination}
                    >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Day Type</th>
                                <th>Holiday Type</th>
                                <th>Time Type</th>
                                <th>Abbreviation</th>
                                <th>Rate</th>
                                <th>Created by</th>
                                <th>Created on</th>
                                <th>Updated by</th>
                                <th>Updated on</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rates.list.length > 0 ? (
                                rates.list.map((rate, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            {tableItemCounter(
                                                idx,
                                                rates.pagination
                                            )}
                                        </td>
                                        <td>{rate.day_type}</td>
                                        <td>{rate.holiday_type}</td>
                                        <td>{rate.time_type}</td>
                                        <td>{rate.abbreviation}</td>
                                        <td>{rate.rate}</td>
                                        <td>
                                            {convertIfNull(rate.created_by)}
                                        </td>
                                        <td>
                                            {dateConvertIfNull(rate.created_on)}
                                        </td>
                                        <td>
                                            {convertIfNull(rate.updated_by)}
                                        </td>
                                        <td>
                                            {dateConvertIfNull(rate.updated_on)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <th colSpan={11} className="text-center">
                                        No data found
                                    </th>
                                </tr>
                            )}
                        </tbody>
                    </DataTable>
                </Card.Body>
            </Card>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        rates: state.rates,
    };
};

export default connect(mapStateToProps)(Rate);
