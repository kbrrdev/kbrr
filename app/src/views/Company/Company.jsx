import { findCompany, updateCompany } from "@actions/company.action";
import TextInput from "@components/TextInput/TextInput";
import FileInput from "@components/FileInput/FileInput";
import { useForm } from "@helpers/form.helper";
import PageTitle from "@layouts/PageTitle";
import React, { Fragment, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";

const Company = ({ user, company }) => {
    let breadcrumbs = [
        { name: "Dashboard", link: "/company/offices" },
        { name: "Company Details", link: "#" },
    ];

    let initialValues = {
        address: "",
        business_category: "",
        city: "",
        country: "",
        created_by: "",
        created_on: "",
        deleted_on: "",
        email: "",
        fax: "",
        hdmf: "",
        logo: "",
        mobile: "",
        name: "",
        organization_type: "",
        province: "",
        rdo: "",
        sss: "",
        telephone: "",
        telephone_extension: "",
        tin: "",
        trade_name: "",
        updated_by: "",
        updated_on: "",
        website: "",
        zip_code: "",
    };

    const formSchema = {
        name: {
            required: true,
        },
        trade_name: {
            required: true,
        },
        organization_type: {
            required: true,
        },
        mobile: {
            phone: true,
        },
    };

    const [
        formValues,
        formErrors,
        setFormValue,
        isFormValid,
        updateFormValues,
    ] = useForm(initialValues, formSchema);

    useEffect(() => {
        findCompany(user.company_id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(company);
        updateFormValues(company);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [company]);

    const submitForm = () => {
        if (!isFormValid()) return;

        updateCompany(formValues, company.id);
        console.log(formValues);
    };

    return (
        <Fragment>
            <PageTitle title="Company Details" breadcrumbs={breadcrumbs} />
            <Form>
                <Card>
                    <Card.Header>
                        <p>
                            Basic information about your company. The Company
                            Logo you upload here will be visible in the top left
                            corner of the navigation bar as well as your
                            payslips.
                        </p>
                    </Card.Header>
                    <Card.Body>
                        <div className="mb-30">
                            <h5>Company Information</h5>
                            <hr />
                            <Row>
                                <Col md={6}>
                                    <TextInput
                                        label="Business Name"
                                        name="name"
                                        value={formValues.name}
                                        onChange={setFormValue}
                                        placeholder="Business Name"
                                        error={formErrors.name}
                                    />
                                    <TextInput
                                        label="Trade Name"
                                        name="trade_name"
                                        value={formValues.trade_name}
                                        onChange={setFormValue}
                                        placeholder="Trade Name"
                                        error={formErrors.trade_name}
                                    />
                                    <TextInput
                                        label="Organization Type"
                                        as="select"
                                        name="organization_type"
                                        value={formValues.organization_type}
                                        onChange={setFormValue}
                                        placeholder="Organization Type"
                                        error={formErrors.organization_type}
                                        custom
                                    >
                                        <option value="private">Private</option>
                                        <option value="government">
                                            Government
                                        </option>
                                        <option value="non-profit">
                                            Non-profit
                                        </option>
                                    </TextInput>
                                </Col>
                                <Col md="6">
                                    <FileInput
                                        label="Logo"
                                        name="logo"
                                        accept="image/png,image/jpeg"
                                        value={formValues.logo}
                                        onChange={setFormValue}
                                        error={formErrors.logo}
                                    />
                                </Col>
                            </Row>
                        </div>

                        <div className="mb-30">
                            <h5>Business Address</h5>
                            <hr />
                            <Row>
                                <Col md={6}>
                                    <TextInput
                                        label="Address"
                                        name="address"
                                        value={formValues.address}
                                        onChange={setFormValue}
                                        placeholder="Address"
                                        error={formErrors.address}
                                    />
                                    <TextInput
                                        label="City"
                                        name="city"
                                        value={formValues.city}
                                        onChange={setFormValue}
                                        placeholder="City"
                                        error={formErrors.city}
                                    />
                                </Col>
                                <Col md={6}>
                                    <TextInput
                                        label="Country"
                                        name="country"
                                        value={formValues.country}
                                        onChange={setFormValue}
                                        placeholder="Country"
                                        error={formErrors.country}
                                    />
                                    <TextInput
                                        label="Zip Code"
                                        name="zip_code"
                                        value={formValues.zip_code}
                                        onChange={setFormValue}
                                        placeholder="Zip Code"
                                        error={formErrors.zip_code}
                                    />
                                </Col>
                            </Row>
                        </div>

                        <div className="mb-30">
                            <h5>Contact Information</h5>
                            <hr />
                            <Row>
                                <Col md={6}>
                                    <TextInput
                                        label="Email"
                                        name="email"
                                        value={formValues.email}
                                        onChange={setFormValue}
                                        placeholder="Email"
                                        error={formErrors.email}
                                    />
                                    <TextInput
                                        label="Telephone"
                                        name="telephone"
                                        value={formValues.telephone}
                                        onChange={setFormValue}
                                        placeholder="Telephone"
                                        error={formErrors.telephone}
                                    />
                                    <TextInput
                                        label="Fax"
                                        name="fax"
                                        value={formValues.fax}
                                        onChange={setFormValue}
                                        placeholder="Fax"
                                        error={formErrors.fax}
                                    />
                                </Col>
                                <Col md={6}>
                                    <TextInput
                                        label="Website"
                                        name="website"
                                        value={formValues.website}
                                        onChange={setFormValue}
                                        placeholder="Website"
                                        error={formErrors.website}
                                    />
                                    <TextInput
                                        label="Telephone Extension"
                                        name="telephone_extension"
                                        value={formValues.telephone_extension}
                                        onChange={setFormValue}
                                        placeholder="Telephone Extension"
                                        error={formErrors.telephone_extension}
                                    />
                                    <TextInput
                                        label="Mobile"
                                        name="mobile"
                                        value={formValues.mobile}
                                        onChange={setFormValue}
                                        placeholder="Mobile"
                                        error={formErrors.mobile}
                                    />
                                </Col>
                            </Row>
                        </div>

                        <div>
                            <h5>Government Registration</h5>
                            <hr />
                            <Row>
                                <Col md={6}>
                                    <TextInput
                                        label="Business Category"
                                        name="business_category"
                                        value={formValues.business_category}
                                        onChange={setFormValue}
                                        placeholder="Business Category"
                                        error={formErrors.business_category}
                                        as="select"
                                        custom
                                    >
                                        <option value="regular">Regular</option>
                                        <option value="household">
                                            Household
                                        </option>
                                    </TextInput>
                                    <TextInput
                                        label="RDO"
                                        name="rdo"
                                        value={formValues.rdo}
                                        onChange={setFormValue}
                                        placeholder="RDO"
                                        error={formErrors.rdo}
                                    />
                                    <TextInput
                                        label="HDMF"
                                        name="hdmf"
                                        value={formValues.hdmf}
                                        onChange={setFormValue}
                                        placeholder="HDMF"
                                        error={formErrors.hdmf}
                                    />
                                </Col>
                                <Col md={6}>
                                    <TextInput
                                        label="TIN"
                                        name="tin"
                                        value={formValues.tin}
                                        onChange={setFormValue}
                                        placeholder="TIN"
                                        error={formErrors.tin}
                                    />
                                    <TextInput
                                        label="SSS"
                                        name="sss"
                                        value={formValues.sss}
                                        onChange={setFormValue}
                                        placeholder="SSS"
                                        error={formErrors.sss}
                                    />
                                    <TextInput
                                        label="PhilHealth"
                                        name="philhealth"
                                        value={formValues.philhealth}
                                        onChange={setFormValue}
                                        placeholder="PhilHealth"
                                        error={formErrors.philhealth}
                                    />
                                </Col>
                            </Row>
                        </div>

                        <div className="f-right">
                            <Button variant="secondary" className="mr-1">
                                Cancel
                            </Button>
                            <Button onClick={submitForm}>Save</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Form>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        company: state.company,
    };
};

export default connect(mapStateToProps)(Company);
