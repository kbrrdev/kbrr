import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";

const FileInput = ({
    formGroupClassName = "",
    labelClassname = "",
    label = false,
    value = "",
    text = false,
    error = false,
    ...props
}) => {
    const ref = useRef(null);
    let thumbs = "";

    if (value && Array.isArray(value) && value.length > 0) {
        thumbs = value.map((file) => (
            <div className="thumb d-flex-cc" key={file.name}>
                <img src={file.preview} className="img" alt={file.name} />
            </div>
        ));
    }

    useEffect(() => {
        return () => {
            if (value && Array.isArray(value) && value.length > 0) {
                // Make sure to revoke the data uris to avoid memory leaks
                value.forEach((file) => URL.revokeObjectURL(file.preview));
            }
        };
    }, [value]);

    return (
        <Form.Group className="file-input">
            {label && (
                <Form.Label className={`mr-15 ${labelClassname}`}>
                    {label}
                </Form.Label>
            )}
            <Form.Control type="file" ref={ref} {...props} />
            <Button onClick={() => ref.current.click()}>Choose Image</Button>
            {text && <Form.Text>{text}</Form.Text>}
            {error && <Form.Feedback type="invalid">{error}</Form.Feedback>}
            <aside className="thumbs-container">{thumbs}</aside>
        </Form.Group>
    );
};

FileInput.propTypes = {};

export default FileInput;
