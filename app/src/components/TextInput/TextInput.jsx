import React from "react";
import { Form } from "react-bootstrap";

const TextInput = React.forwardRef(
    (
        {
            formGroupClassName = "",
            labelClassname = "",
            label = false,
            text = false,
            error = false,
            ...props
        },
        ref
    ) => {
        return (
            <Form.Group className={formGroupClassName}>
                {label && (
                    <Form.Label className={labelClassname}>{label}</Form.Label>
                )}
                <Form.Control isInvalid={error} {...props} ref={ref} />
                {text && <Form.Text>{text}</Form.Text>}
                {error && <Form.Feedback type="invalid">{error}</Form.Feedback>}
            </Form.Group>
        );
    }
);

export default TextInput;
