import { useState } from "react";
import validator from "validator";

export const useForm = (initialValues, formSchema) => {
    const [values, setValues] = useState(initialValues);
    const [showError, setShowError] = useState(false);
    const [errors, setErrors] = useState({});

    return [
        // formValues
        values,
        // formErrors
        errors,
        // setFormValues
        (e) => {
            const name = e.target.name,
                value = e.target.value;

            let newValues;

            if (e.target.type === "file") {
                console.log(e.target.files);
                let files = Object.values(e.target.files);

                if (files.length > 0) {
                    files.map((file) =>
                        Object.assign(file, {
                            preview: URL.createObjectURL(file),
                        })
                    );

                    newValues = { [name]: files };
                }
            } else newValues = { [name]: value };

            newValues = Object.assign({}, values, newValues);

            if (showError) {
                let validation = validate(newValues, formSchema);

                setErrors(validation.errors);
            }

            setValues(newValues);
        },
        // isFormValid
        () => {
            let validation = validate(values, formSchema);
            setErrors(validation.errors);

            setShowError(true);

            return validation.valid;
        },
        // updateFormValues
        (newValues) => setValues(newValues),
        // resetErrors
        () => {
            setErrors({});
            setShowError(false);
        },
    ];
};

const validate = (values, schema) => {
    let errors = {},
        isValid = true;

    let defaultMessage = {
        required: "This field is required.",
        password: "Invalid password.",
        email: "Invalid email address.",
        phone: "Invalid mobile number.",
        numeric: "Must only contain numbers",
    };

    Object.keys(schema).map((key) => {
        let value = values[key];
        let valueSchema = schema[key];
        let messages = valueSchema.messages;

        if (valueSchema.required) {
            if (validator.isEmpty(value, { ignore_whitespace: true })) {
                let message =
                    messages && messages.required
                        ? messages.required
                        : defaultMessage.required;
                errors = { ...errors, [key]: message };
            } else if (
                valueSchema.password &&
                !validator.isStrongPassword(value)
            ) {
                let message =
                    messages && messages.password
                        ? messages.password
                        : defaultMessage.password;
                errors = { ...errors, [key]: message };
            } else if (valueSchema.email && !validator.isEmail(value)) {
                let message =
                    messages && messages.email
                        ? messages.email
                        : defaultMessage.email;
                errors = { ...errors, [key]: message };
            } else if (
                valueSchema.phone &&
                !validator.isMobilePhone(value, ["en-PH"])
            ) {
                let message =
                    messages && messages.phone
                        ? messages.phone
                        : defaultMessage.phone;
                errors = { ...errors, [key]: message };
            } else if (valueSchema.numeric && !validator.isNumeric(value)) {
                let message =
                    messages && messages.numeric
                        ? messages.numeric
                        : defaultMessage.numeric;
                errors = { ...errors, [key]: message };
            }
        } else {
            if (!validator.isEmpty(value, { ignore_whitespace: true })) {
                if (
                    valueSchema.password &&
                    !validator.isStrongPassword(value)
                ) {
                    let message =
                        messages && messages.password
                            ? messages.password
                            : defaultMessage.password;
                    errors = { ...errors, [key]: message };
                } else if (valueSchema.email && !validator.isEmail(value)) {
                    let message =
                        messages && messages.email
                            ? messages.email
                            : defaultMessage.email;
                    errors = { ...errors, [key]: message };
                } else if (
                    valueSchema.phone &&
                    !validator.isMobilePhone(value, ["en-PH"])
                ) {
                    let message =
                        messages && messages.phone
                            ? messages.phone
                            : defaultMessage.phone;
                    errors = { ...errors, [key]: message };
                } else if (valueSchema.numeric && !validator.isNumeric(value)) {
                    let message =
                        messages && messages.numeric
                            ? messages.numeric
                            : defaultMessage.numeric;
                    errors = { ...errors, [key]: message };
                }
            }
        }

        return key;
    });

    if (Object.keys(errors).length > 0) isValid = false;

    return { valid: isValid, errors };
};
