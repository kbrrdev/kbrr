import React, { Fragment, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Form, Modal } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { uploadAssets } from "../../actions/asset.action";
import { getUser } from "../../helpers/session.helper";
import { connect } from "../../helpers/api.helper";

const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
};

const activeStyle = {
    borderColor: "#2196f3",
};

const acceptStyle = {
    borderColor: "#00e676",
};

const rejectStyle = {
    borderColor: "#ff1744",
};

const AssetManager = (props) => {
    const [show, setShow] = useState(false);
    const [files, setFiles] = useState();
    const [progress, setProgess] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop: (accedptedFiles) => {
            setFiles(accedptedFiles);
        },
    });

    useEffect(() => {
        console.log(files);
    }, [files]);

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragReject, isDragAccept]
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        files.map((file, idx) => {
            uploadFile(idx, file);
        });

        // {
        //     onUploadProgress: (ProgressEvent) => {
        //         let progress =
        //             Math.round(
        //                 (ProgressEvent.loaded / ProgressEvent.total) * 100
        //             ) + "%";

        //         setProgess(progress);
        //     },
        // }
    };

    const uploadFile = (index, file) => {
        let formData = new FormData();
        formData.append("file", files[index]);

        const user = getUser();
        formData.append("company_id", user.company_id);
        formData.append("created_by", `${user.first_name} ${user.last_name}`);

        return connect().post("/assets/", formData);
    };

    return (
        <Fragment>
            <Button variant="primary" onClick={handleShow}>
                Launch static backdrop modal
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Form
                    onSubmit={(e) => handleSubmit(e)}
                    encType="multipart/form-data"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Asset Manager</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div {...getRootProps({ style })}>
                            <input
                                onChange={(e) => setFiles(e.target.values)}
                                {...getInputProps()}
                            />
                            <p>
                                Drag 'n' drop some files here, or click to
                                select files
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Upload
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Fragment>
    );
};

AssetManager.propTypes = {};

export default AssetManager;
