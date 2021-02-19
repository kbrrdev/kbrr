import { login } from "@actions/user.action";
import TextInput from "@components/TextInput/TextInput";
import { useForm } from "@helpers/form.helper";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const Login = ({ user }) => {
    const passwordRef = useRef(null);
    const history = useHistory();
    const [isFailedLogin, setIsFailedLogin] = useState(false);

    if (
        user &&
        Object.keys(user).length > 0 &&
        user.hasOwnProperty("accessToken")
    ) {
        history.replace("/company/details");
    }

    const initialValues = {
        email: "",
        password: "",
    };

    const formSchema = {
        email: {
            required: true,
            email: true,
        },
        password: {
            required: true,
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

    const handleSubmit = () => {
        if (!isFormValid()) return;

        login(formValues)
            .then((res) => {
                if (res.value.data && res.value.data.accessToken) {
                    if (history.action === "REPLACE") {
                        history.goBack();
                    } else {
                        history.replace("/company/details");
                    }
                }
            })
            .catch((err) => {
                if (err.message === "Request failed with status code 400") {
                    setIsFailedLogin("Invalid email or password.");
                } else if (
                    err.message === "Request failed with status code 500"
                ) {
                    setIsFailedLogin("Server error. Try again later.");
                }
            });
    };

    return (
        <div className="d-flex-cc login-page">
            <div className="login-container">
                <div className="py-20 px-20 card">
                    <div className="text-center pt-15 pb-30">
                        <Link className="h4 font-weight-bold" to="#">
                            Admin
                        </Link>
                    </div>
                    {isFailedLogin && (
                        <div className="text-center">
                            <small className="text-danger">
                                {isFailedLogin}
                            </small>
                        </div>
                    )}
                    <TextInput
                        name="email"
                        value={formValues.email}
                        onChange={(e) => setFormValue(e)}
                        placeholder="Email"
                        error={formErrors.email}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") passwordRef.current.focus();
                        }}
                    />
                    <TextInput
                        ref={passwordRef}
                        name="password"
                        value={formValues.password}
                        onChange={(e) => setFormValue(e)}
                        placeholder="Password"
                        type="password"
                        error={formErrors.password}
                        onKeyPress={(e) => {
                            if (e.key === "Enter" && e.target.value)
                                handleSubmit();
                        }}
                    />
                    <div>
                        <Link className="mb-10 float-right" to="#">
                            Forgot Password?
                        </Link>
                    </div>
                    <Button block onClick={() => handleSubmit()}>
                        Log in
                    </Button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(Login);
