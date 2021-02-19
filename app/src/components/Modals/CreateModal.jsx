import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import AssetManager from "../AssetManager/AssetManager";

const CreateModal = ({
    title,
    showCreateModal,
    setShowCreateModal,
    handleItemCreate,
    children,
}) => {
    return (
        <Modal
            size="lg"
            show={showCreateModal}
            onHide={() => setShowCreateModal(false)}
            backdrop="static"
            centered
        >
            <Modal.Header>
                <Modal.Title>Create {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <AssetManager />
                <Button
                    variant="secondary"
                    onClick={() => setShowCreateModal(false)}
                >
                    Close
                </Button>
                <Button onClick={() => handleItemCreate()}>Create</Button>
            </Modal.Footer>
        </Modal>
    );
};

CreateModal.propTypes = {
    title: PropTypes.string,
    showCreateModal: PropTypes.bool.isRequired,
    setShowCreateModal: PropTypes.func.isRequired,
    handleItemCreate: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default CreateModal;
