import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Button, Form, FormControl, FormGroup, ControlLabel, HelpBlock, Row, Col, Checkbox, Tab, Nav, NavItem } from 'react-bootstrap';
import { NormalizeUserForm, NormalizeDriverForm, NormalizeCustomerForm } from '../../NormalizeObjects';

import { CreateUser } from '../../Actions/Users.actions';

import { TextboxRender, SelectRender, InputListRender, CheckboxRender, TextareaRender, DateTimeRender } from '../ReduxFormRender';

const validate = values => {
    const errors = {};

    if (!values.Username) errors.Username = 'Required';
    if (values.Username && values.Username.length > 30) errors.Username = 'Max 30 Characters';
    // TODO: Add Validation for UserType
    if (!values.Password) errors.Password = 'Required';
    if (values.Password && values.Password < 6) errors.Password = 'Minimum 6 Characters';
    if (!values.ConfirmPassword) errors.ConfirmPassword = 'Required';
    if (values.ConfirmPassword && values.ConfirmPassword !== values.Password) errors.ConfirmPassword = 'Passwords Do Not Match';
    if (values.FirstName && values.FirstName.length > 100) errors.FirstName = 'Max 100 Characters';
    if (values.LastName && values.LastName.length > 100) errors.LastName = 'Max 100 Characters';
    if (values.Company && values.Company.length > 100) errors.Company = 'Max 100 Characters';
    if (values.Address1 || values.Address2 || values.City || values.State || values.PostalCode) {
        if (values.City && values.City.length > 60) errors.City = 'Max 60 Characters';
        if (values.City && !values.State) errors.State = 'Required';
        if (values.State && values.State.length > 30) errors.State = 'Max 30 Characters';
        if (values.PostalCode && values.PostalCode.length > 15) errors.PostalCode = 'Max 15 Characters';
    }
    if (values.OperatingLocation || values.DriverLicenseNumber || values.DriverLicenseState ||
        values.DriverLicenseExpiration || values.HourlyRate || values.DailyRate || values.SprintRate) {
        if (!values.OperatingLocation) errors.OperatingLocation = 'Required';
    }
    if (values.DefaultAddon || values.DefaultPackageType || values.ImportConversion || values.LabelTemplate || values.LateDelivery) {
        if (!values.DefaultPackageType) errors.DefaultPackageType = 'Required';
    }

    return errors;
}

let UserForm = ({ handleSubmit, CreateUser, submitting, users, operatingLocations, countries }) => {
    const createUser = values => {
        let userExists = false;
        users.forEach(user => {
            if (user.Username === values.Username) {
                return false;
            }
        });
        const userData = NormalizeUserForm(values);
        const driverData = values.DefaultPackageType && NormalizeDriverForm(values);
        const customerData = values.OperatingLocation && NormalizeCustomerForm(values);

        CreateUser({
            User: userData,
            Driver: driverData,
            Customer: customerData,
            Password: values.Password
        });
    }

    console.log("User Form Render");

    return (
        <form onSubmit={handleSubmit(createUser)}>
            <Button type="submit" bsStyle="success" className="pull-right">Submit</Button>
            <Button type="reset" bsStyle="default" className="pull-right">Reset</Button>
            <Tab.Container id="userForm" defaultActiveKey="authorize">
                <Row className="clearfix">
                    <Col xs={12}>
                        <Nav bsStyle="tabs">
                            <NavItem eventKey="authorize">Authorize</NavItem>
                            <NavItem eventKey="contact">Contact</NavItem>
                            <NavItem eventKey="driver">Driver</NavItem>
                            <NavItem eventKey="customer">Customer</NavItem>
                            <NavItem eventKey="incidents">Incidents</NavItem>
                            <NavItem eventKey="reviews">Reviews</NavItem>
                        </Nav>
                    </Col>
                    <Col xs={12}>
                        <Tab.Content className="margin-top" animation>
                            <Tab.Pane eventKey="authorize">
                                <Row>
                                    <Field name="Username" label="Username" colWidths={{ sm: 4 }} component={TextboxRender} tabIndex="1" />
                                    <Field name="UserType" label="User Type" colWidths={{ sm: 4 }} component={SelectRender} tabIndex="2">
                                        <option value="">Select a User Type...</option>
                                    </Field>
                                </Row>
                                <Row>
                                    <Field name="Password" label="Password" colWidths={{ sm: 4 }} component={TextboxRender} type="password" tabIndex="3" />
                                    <Field name="ConfirmPassword" label="Confirm Password" colWidths={{ sm: 4 }} component={TextboxRender} type="password" tabIndex="4" />
                                </Row>
                                <Row>
                                    <Field name="Administrator" label="Administrator" colWidths={{ xs: 4, sm: 2 }} component={CheckboxRender} tabIndex="5" />
                                    <Field name="Superuser" label="Superuser" colWidths={{ xs: 4, sm: 2 }} component={CheckboxRender} tabIndex="6" />
                                    <Field name="FullClientAccess" label="Full Client Access" colWidths={{ xs: 4, sm: 3 }} component={CheckboxRender} tabIndex="7" />
                                </Row>
                                <Row>
                                    <Field name="Locked" label="Locked" colWidths={{ xs: 4, sm: 2 }} component={CheckboxRender} tabIndex="8" />
                                    <Field name="Inactive" label="Inactive" colWidths={{ xs: 4, sm: 2 }} component={CheckboxRender} tabIndex="9" />
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="contact">
                                <Row>
                                    <Col sm={7}>
                                        <Row>
                                            <Field name="FirstName" label="First Name" colWidths={{ sm: 6 }} component={TextboxRender} tabIndex="10" />
                                            <Field name="LastName" label="Last Name" colWidths={{ sm: 6 }} component={TextboxRender} tabIndex="11" />
                                        </Row>
                                        <Row>
                                            <Field name="Address1" label="Address 1" colWidths={{ xs: 12 }} component={TextboxRender} tabIndex="12" />
                                            <Field name="Address2" label="Address 2" colWidths={{ xs: 12 }} component={TextboxRender} tabIndex="13" />
                                            <Field name="City" label="City" colWidths={{ sm: 5 }} component={TextboxRender} tabIndex="14" />
                                            <Field name="State" label="State" colWidths={{ xs: 4, sm: 3 }} component={TextboxRender} tabIndex="15" />
                                            <Field name="PostalCode" label="Postal Code" colWidths={{ xs: 8, sm: 4 }} component={TextboxRender} tabIndex="16" />
                                            <Field name="Country" label="Country" colWidths={{ sm: 6 }} component={SelectRender} tabIndex="17">
                                                {countries.map(country =>
                                                    <option key={country.CountryID} value={country.CountryID}>{country.Name}</option>
                                                )}
                                            </Field>
                                        </Row>
                                    </Col>
                                    <Col sm={5}>
                                        <Row>

                                            <Field name="Company" label="Company" colWidths={{ xs: 12 }} component={TextboxRender} tabIndex="11" />
                                            <FieldArray
                                                name="PhoneNumbers"
                                                headers={[
                                                    { name: 'PhoneNumber', label: 'Phone Number', component: TextboxRender },
                                                    { name: 'Type', label: 'Type', component: TextboxRender }
                                                ]}
                                                colWidths={{ xs: 12 }}
                                                component={InputListRender}
                                                tabIndex="18"
                                            />
                                            <FieldArray
                                                name="EmailAddresses"
                                                headers={[{ name: 'EmailAddresses', label: 'Email Addresses', component: TextboxRender }]}
                                                colWidths={{ xs: 12 }}
                                                component={InputListRender}
                                                tabIndex="19"
                                            />
                                        </Row>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="driver">
                                <Row>
                                    <Field name="OperatingLocation" label="Operating Location" colWidths={{ sm: 6 }} component={SelectRender} tabIndex="20">
                                        <option value="">Select a Operating Location...</option>
                                    </Field>
                                </Row>
                                <Row>
                                    <Field name="EndDate" label="End Date" colWidths={{ sm: 4 }} component={TextboxRender} tabIndex="21" />
                                </Row>
                                <Row>
                                    <Field name="DriverLicenseNumber" label="Driver License Number" colWidths={{ sm: 6 }} component={TextboxRender} tabIndex="25" />
                                </Row>
                                <Row>
                                    <Field name="DriverLicenseState" label="Driver License State" colWidths={{ sm: 4 }} component={SelectRender} tabIndex="26">
                                        <option value="">Select a Driver License State...</option>
                                    </Field>
                                </Row>
                                <Row>
                                    <Field name="DriverLicenseExpiration" label="Driver License Expiration" colWidths={{ sm: 4 }} component={DateTimeRender} dateFormat="MM/DD/YYYY" timeFormat={false} tabIndex="27" />
                                </Row>
                                <Row>
                                    <Field name="HourlyRate" label="Hourly Rate" colWidths={{ xs: 4, sm: 3 }} component={TextboxRender} tabIndex="28" />
                                    <Field name="DailyRate" label="Daily Rate" colWidths={{ xs: 4, sm: 3 }} component={TextboxRender} tabIndex="29" />
                                    <Field name="SprintRate" label="Sprint Rate" colWidths={{ xs: 4, sm: 3 }} component={TextboxRender} tabIndex="30" />
                                </Row>
                                <Row>
                                    <FieldArray
                                        name="WeekdayRates"
                                        headers={[
                                            { name: 'Weekday', label: 'Weekday', component: SelectRender },
                                            { name: 'PercentIncrease', label: 'Percent Increase', component: TextboxRender },
                                            { name: 'DailyRate', label: 'Daily Rate', component: TextboxRender },
                                            { name: 'SprintRate', label: 'Sprint Rate', component: TextboxRender }
                                        ]}
                                        colWidths={{ sm: 9 }}
                                        component={InputListRender}
                                        tabIndex="31"
                                    />
                                </Row>
                                <Row>
                                    <Field name="MaxWeight" label="Max Weight" colWidths={{ sm: 3 }} component={TextboxRender} tabIndex="31" />
                                </Row>
                                <Row>
                                    <Field name="OwnVehicle" label="Own Vehicle" colWidths={{ sm: 3 }} component={CheckboxRender} tabIndex="32" />
                                </Row>
                                <Row>
                                    <Field name="DefaultVehicle" label="Default Vehicle" colWidths={{ sm: 4 }} component={SelectRender} tabIndex="32">
                                        <option value="">Select a Default Vehicle...</option>

                                    </Field>
                                </Row>
                                <Row>
                                    <label>Image</label>
                                    <input type="file" />
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="customer">
                                <Row>
                                    <Field name="DefaultAddon" label="Default Addon" colWidths={{ sm: 4 }} component={SelectRender} tabIndex="32">
                                        <option value="">Select a Default Addon...</option>
                                    </Field>
                                    <Field name="DefaultPackageType" label="Default Package Type" colWidths={{ sm: 4 }} component={SelectRender} tabIndex="33">
                                        <option value="">Select a Default Package Type...</option>
                                    </Field>
                                </Row>
                                <Row>
                                    <Field name="ImportConversion" label="Import Conversion" colWidths={{ sm: 8 }} component={TextareaRender} tabIndex="34" />
                                </Row>
                                <Row>
                                    <Field name="LabelTemplate" label="Label Template" colWidths={{ sm: 8 }} component={TextboxRender} tabIndex="35" />
                                </Row>
                                <Row>
                                    <Field name="LateDelivery" label="SLA Late Delivery" colWidths={{ sm: 4 }} component={DateTimeRender} dateFormat={false} timeFormat="hh:mm A" defaultValue="1970/01/01 20:00:00" tabIndex="36" />
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="incidents">
                            // TODO: Add Incidents Form
                            </Tab.Pane>
                            <Tab.Pane eventKey="reviews">
                            // TODO: Add Reviews Form
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </form>
    );
}

UserForm = reduxForm({
    form: 'UserForm',
    validate
})(UserForm);

UserForm.displayName = 'User Form';

UserForm.propTypes = {

};

const mapStateToProps = state => ({
    users: state.users.all,
    operatingLocations: state.operatingLocations.all,
    countries: state.addresses.countries
});

const mapDispatchToProps = {
    CreateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);