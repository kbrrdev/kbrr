import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

const DeleteModal = ({
    itemName,
    deleteModalState,
    setDeleteModalState,
    handleItemDelete,
}) => {
    const onHideModal = () => setDeleteModalState({ item: {}, show: false });
    const onSubmit = () => handleItemDelete();

    return (
        <Modal
            size="md"
            show={deleteModalState.show}
            onHide={() => onHideModal()}
            backdrop="static"
        >
            <Modal.Header>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete{" "}
                <span className="text-danger h6">{itemName}</span>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onHideModal()}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => onSubmit()}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

DeleteModal.propTypes = {
    itemName: PropTypes.string,
    deleteModalState: PropTypes.object.isRequired,
    setDeleteModalState: PropTypes.func.isRequired,
    handleItemDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
