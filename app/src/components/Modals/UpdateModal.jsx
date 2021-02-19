import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

const UpdateModal = ({
    itemTitle,
    updateModalState,
    setUpdateModalState,
    handleItemUpdate,
    children,
}) => {
    const onHideModal = () => setUpdateModalState({ item: {}, show: false });
    const onSubmit = () => handleItemUpdate();

    return (
        <Modal
            size="lg"
            show={updateModalState.show}
            onHide={() => onHideModal()}
            backdrop="static"
            centered
        >
            <Modal.Header>
                <Modal.Title>
                    Update <span className="text-primary">{itemTitle}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onHideModal()}>
                    Close
                </Button>
                <Button variant="info" onClick={() => onSubmit()}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

UpdateModal.propTypes = {
    itemTitle: PropTypes.string,
    updateModalState: PropTypes.object.isRequired,
    setUpdateModalState: PropTypes.func.isRequired,
    handleItemUpdate: PropTypes.func.isRequired,
};

export default UpdateModal;
