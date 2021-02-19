import { getOffices } from "@actions/office.action";
import DataTable from "@components/DataTable/DataTable";
import CreateModal from "@components/Modals/CreateModal";
import DeleteModal from "@components/Modals/DeleteModal";
import TextInput from "@components/TextInput/TextInput";
import PropTypes from "prop-types";
import {
    faEdit,
    faPlusCircle,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "@helpers/form.helper";
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
    Card,
    Col,
    OverlayTrigger,
    Row,
    Tooltip,
} from "react-bootstrap";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import {
    createOffice,
    deleteOffice,
    updateOffice,
} from "../actions/office.action";
import UpdateModal from "../components/Modals/UpdateModal";
import Search from "../components/Search/Search";

const Office = ({ offices }) => {
    const location = useLocation();

    let breadcrumbs = [
        { name: "Dashboard", link: "/dashboard" },
        { name: "Offices", link: "#" },
    ];

    const initialModal = {
        show: false,
        item: {},
    };

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [updateModalState, setUpdateModalState] = useState(initialModal);
    const [deleteModalState, setDeleteModalState] = useState(initialModal);

    let initialValues = {
        name: "",
        description: "",
    };

    const formSchema = {
        name: {
            required: true,
            messages: {
                required: "Office name is required.",
            },
        },
    };

    const [
        formValues,
        formErrors,
        setFormValue,
        isFormValid,
        updateFormValues,
        resetErrors,
    ] = useForm(initialValues, formSchema);

    useEffect(() => {
        getOffices(getParamsFromLocation(location));
    }, [location]);

    const handleCreateClick = () => {
        setShowCreateModal(true);
        updateFormValues(initialValues);
        resetErrors();
    };

    const onDeleteClick = (item) => setDeleteModalState({ show: true, item });

    const handleUpdateClick = (item) => {
        setUpdateModalState({ modal: true, item });
        updateFormValues(item);
        resetErrors();
    };

    const handleItemCreate = () => {
        if (!isFormValid()) return;

        createOffice(formValues).then(() => {
            getOffices(getParamsFromLocation(location)).then(() => {
                setShowCreateModal(false);
            });
        });
    };

    const handleItemUpdate = () => {
        if (!isFormValid()) return;

        if (formValues === updateModalState.item)
            return setUpdateModalState(initialModal);

        updateOffice(formValues, updateModalState.item.id).then(() => {
            getOffices(getParamsFromLocation(location)).then(() => {
                setUpdateModalState(initialModal);
            });
        });
    };

    const handleItemDelete = () => {
        deleteOffice(deleteModalState.item.id).then(() => {
            getOffices(getParamsFromLocation(location)).then(() => {
                setDeleteModalState(initialModal);
            });
        });
    };

    const formContent = (
        <Row>
            <Col md={6}>
                <TextInput
                    label="Office Name"
                    name="name"
                    value={formValues.name}
                    onChange={(e) => setFormValue(e)}
                    placeholder="Office Name"
                    error={formErrors.name}
                />
            </Col>
            <Col md={6}>
                <TextInput
                    label="Description"
                    name="description"
                    value={formValues.description}
                    onChange={(e) => setFormValue(e)}
                    placeholder="Description"
                    error={formErrors.description}
                />
            </Col>
        </Row>
    );

    return (
        <Fragment>
            <PageTitle title="Offices" breadcrumbs={breadcrumbs} />
            <Card>
                <Card.Header className="bg-white">
                    <Row>
                        <Col md={9}>
                            <Button
                                className="mr-3"
                                onClick={() => handleCreateClick()}
                            >
                                <FontAwesomeIcon
                                    icon={faPlusCircle}
                                    className="mr-1"
                                />
                                Create
                            </Button>
                        </Col>
                        <Col md={3}>
                            <Search />
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <DataTable
                        bordered
                        hover
                        responsive
                        pagination={offices.pagination}
                    >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Actions</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Created by</th>
                                <th>Created on</th>
                                <th>Updated by</th>
                                <th>Updated on</th>
                            </tr>
                        </thead>
                        <tbody>
                            {offices.list.length > 0 ? (
                                offices.list.map((office, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            {tableItemCounter(
                                                idx,
                                                offices.pagination
                                            )}
                                        </td>
                                        <td>
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip
                                                        id={`tooltip-${idx}-edit`}
                                                    >
                                                        Edit
                                                    </Tooltip>
                                                }
                                            >
                                                <Button
                                                    className="mr-1"
                                                    variant="info"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleUpdateClick(
                                                            office
                                                        )
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                    />
                                                </Button>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip
                                                        id={`tooltip-${idx}-delete`}
                                                    >
                                                        Delete
                                                    </Tooltip>
                                                }
                                            >
                                                <Button
                                                    className="mr-1"
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() =>
                                                        onDeleteClick(office)
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                    />
                                                </Button>
                                            </OverlayTrigger>
                                        </td>
                                        <td>{office.name}</td>
                                        <td>
                                            {convertIfNull(office.description)}
                                        </td>
                                        <td>
                                            {convertIfNull(office.created_by)}
                                        </td>
                                        <td>
                                            {dateConvertIfNull(
                                                office.created_on
                                            )}
                                        </td>
                                        <td>
                                            {convertIfNull(office.updated_by)}
                                        </td>
                                        <td>
                                            {dateConvertIfNull(
                                                office.updated_on
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <th colSpan={8} className="text-center">
                                        No data found
                                    </th>
                                </tr>
                            )}
                        </tbody>
                    </DataTable>
                </Card.Body>
            </Card>

            <CreateModal
                title="Office"
                showCreateModal={showCreateModal}
                setShowCreateModal={setShowCreateModal}
                handleItemCreate={handleItemCreate}
            >
                {formContent}
            </CreateModal>

            <UpdateModal
                itemTitle={updateModalState.item.name}
                updateModalState={updateModalState}
                setUpdateModalState={setUpdateModalState}
                handleItemUpdate={handleItemUpdate}
            >
                {formContent}
            </UpdateModal>

            <DeleteModal
                itemName={deleteModalState.item.name}
                deleteModalState={deleteModalState}
                setDeleteModalState={setDeleteModalState}
                handleItemDelete={handleItemDelete}
            />
        </Fragment>
    );
};

Office.propTypes = { offices: PropTypes.object };

const mapStateToProps = (state) => {
    return {
        offices: state.offices,
    };
};

export default connect(mapStateToProps)(Office);
