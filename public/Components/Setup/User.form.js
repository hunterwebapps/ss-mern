import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Button, Form, FormControl, FormGroup, ControlLabel, HelpBlock, Row, Col, Checkbox, Tab, Nav, NavItem } from 'react-bootstrap';
import { NormalizeUserForm, NormalizeDriverForm, NormalizeCustomerForm } from '../../NormalizeObjects';

import { CreateUser, UpdateUser } from '../../Modules/Users/Users.actions';

import { TextboxRender, SelectRender, InputListRender, CheckboxRender, TextareaRender, DateTimeRender, AddressRender } from '../ReduxFormRender';

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

class UserForm extends React.Component {
    constructor() {
        super();
        this.state = {
            editInitialized: false,
            editUser: null
        }
    }
    
    componentWillUpdate() {
        if (this.props.id && !this.state.editInitialized) {
            const editUser = this.props.users.find(user => user._id === this.props.id);
            const initializeUser = {
                ...editUser,
                ...(editUser && editUser.Contact),
                ...(editUser && editUser.Contact && editUser.Contact.Address),
                ...(editUser && editUser.Driver),
                ...(editUser && editUser.Customer)
            }
            if (editUser) {
                this.props.initialize(initializeUser);
            }
            this.setState({ editInitialized: true, editUser });
        }
    }

    createUser = values => {
        if (!this.props.id) {
            let userExists = false;
            this.props.users.forEach(user => {
                if (user.Username === values.Username) {
                    return false;
                }
            });
        }

        const userData = {
            Username: values.Username,
            Password: values.Password,
            EmailAddress: values.EmailAddresses.filter(email => email.EmailAddress)[0].EmailAddress,
            Contact: {
                Nickname: values.Nickname,
                Address: {
                    FirstName: values.FirstName,
                    LastName: values.LastName,
                    JobTile: values.JobTitle,
                    Company: values.Company,
                    Address1: values.Address1,
                    Address2: values.Address2,
                    City: values.City,
                    State: values.State,
                    PostalCode: values.PostalCode,
                    Country: values.Country,
                    Timezone: values.Timezone,
                    PhoneNumbers: values.PhoneNumbers.map(number => ({
                        PhoneNumber: number.PhoneNumber,
                        Type: number.Type
                    })),
                    EmailAddresses: values.EmailAddresses.map(email => email.EmailAddress)
                },
                Website: values.Website,
                BirthDate: values.BirthDate,
                Avatar: values.Avatar
            },
            //Groups: [
            //    values.Administrator  
            //]
            Administrator: values.Administrator,
            Superuser: values.Superuser,
            FullClientAccess: values.FullClientAccess
        };

        if (values.OperatingLocation) {
            userData.Driver = {
                OperatingLocation: values.OperatingLocation,
                StartDate: values.StartDate,
                EndDate: values.EndDate,
                MaxWeight: values.MaxWeight,
                DriverLicense: {
                    Number: values.DriverLicenseNumber,
                    State: values.DriverLicenseState,
                    Expiration: values.DriverLicenseExpiration
                },
                PayRate: {
                    PerSprint: values.SprintRate,
                    PerHour: values.HourlyRate,
                    PerDay: values.DailyRate
                },
                WeekdayRates: values.WeekdayRates.map(day => ({
                    Weekday: day.Weekday,
                    Percent: day.PercentIncrease,
                    PerSprint: day.SprintRate,
                    PerDay: day.DailyRate
                })),
                Vehicle: values.DefaultVehicle
            }
        }

        if (values.DefaultPackageType) {
            userData.Customer = {
                DefaultAddon: values.DefaultAddon,
                DefaultPackageType: values.DefaultPackageType,
                ImportConversion: values.ImportConversion,
                LabelTemplate: values.LabelTemplate
            }
        }

        if (this.state.editInitialized) {
            this.props.UpdateUser(Object.assign(userData, this.state.editUser));
        } else {
            this.props.CreateUser(userData);
        }
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.createUser)}>
                <Button type="submit" bsStyle="success" className="pull-right">Submit</Button>
                <Button type="reset" bsStyle="default" className="pull-right">Reset</Button>
                <Tab.Container id="userForm" defaultActiveKey="user">
                    <Row className="clearfix">
                        <Col xs={12}>
                            <Nav bsStyle="tabs">
                                <NavItem eventKey="user">User</NavItem>
                                <NavItem eventKey="driver">Driver</NavItem>
                                <NavItem eventKey="customer">Customer</NavItem>
                                <NavItem eventKey="incidents">Incidents</NavItem>
                                <NavItem eventKey="reviews">Reviews</NavItem>
                            </Nav>
                        </Col>
                        <Col xs={12}>
                            <Tab.Content className="margin-top" animation>
                                <Tab.Pane eventKey="user">
                                    <Row>
                                        <Field
                                            name="Username"
                                            label="Username"
                                            colWidths={{ sm: 4 }}
                                            component={TextboxRender}
                                            autoFocus
                                        />
                                        <Field
                                            name="Password"
                                            label="Password"
                                            colWidths={{ sm: 4 }}
                                            component={TextboxRender}
                                            type="password"
                                        />
                                        <Field
                                            name="ConfirmPassword"
                                            label="Confirm Password"
                                            colWidths={{ sm: 4 }}
                                            component={TextboxRender}
                                            type="password"
                                        />
                                    </Row>
                                    <Row>
                                        <Field
                                            name="Administrator"
                                            label="Administrator"
                                            colWidths={{ xs: 4, sm: 2 }}
                                            component={CheckboxRender}
                                        />
                                        <Field
                                            name="Superuser"
                                            label="Superuser"
                                            colWidths={{ xs: 4, sm: 2 }}
                                            component={CheckboxRender}
                                        />
                                        <Field
                                            name="FullClientAccess"
                                            label="Full Client Access"
                                            colWidths={{ xs: 4, sm: 3 }}
                                            component={CheckboxRender}
                                        />
                                        <Field
                                            name="Locked"
                                            label="Locked"
                                            colWidths={{ xs: 4, sm: 2 }}
                                            component={CheckboxRender}
                                        />
                                        <Field
                                            name="Inactive"
                                            label="Inactive"
                                            colWidths={{ xs: 4, sm: 2 }}
                                            component={CheckboxRender}
                                        />
                                    </Row>
                                    <Row>
                                        <Field
                                            name="Nickname"
                                            label="Nickname"
                                            colWidths={{ sm: 3 }}
                                            component={TextboxRender}
                                        />
                                        <Field
                                            name="BirthDate"
                                            label="Birth Date"
                                            colWidths={{ sm: 3 }}
                                            component={DateTimeRender}
                                            timeFormat={false}
                                            dateFormat="MM/DD/YYYY"
                                        />
                                        <Col sm={10}>
                                            <AddressRender countries={this.props.countries} timezones={this.props.timezones} />
                                        </Col>
                                        <Field
                                            name="Website"
                                            label="Website"
                                            colWidths={{ sm: 6 }}
                                            component={TextboxRender}
                                        />
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="driver">
                                    <Row>
                                        <Field
                                            name="OperatingLocation"
                                            label="Operating Location"
                                            colWidths={{ sm: 6 }}
                                            component={SelectRender}
                                        >
                                            <option value="">Select an Operating Location...</option>
                                            {this.props.operatingLocations.map(location =>
                                                <option key={location._id} value={location._id}>
                                                    {`${location.Code} - ${location.Contact.Address.City}`}
                                                </option>
                                            )}
                                        </Field>
                                    </Row>
                                    <Row>
                                        <Field
                                            name="EndDate"
                                            label="End Date"
                                            colWidths={{ sm: 4 }}
                                            component={TextboxRender}
                                        />
                                    </Row>
                                    <Row>
                                        <Field
                                            name="DriverLicenseNumber"
                                            label="Driver License Number"
                                            colWidths={{ sm: 6 }}
                                            component={TextboxRender}
                                        />
                                    </Row>
                                    <Row>
                                        <Field
                                            name="DriverLicenseState"
                                            label="Driver License State"
                                            colWidths={{ sm: 4 }}
                                            component={SelectRender}
                                        >
                                            <option value="">Select a Driver License State...</option>
                                        </Field>
                                    </Row>
                                    <Row>
                                        <Field
                                            name="DriverLicenseExpiration"
                                            label="Driver License Expiration"
                                            colWidths={{ sm: 4 }}
                                            component={DateTimeRender}
                                            dateFormat="MM/DD/YYYY"
                                            timeFormat={false}
                                        />
                                    </Row>
                                    <Row>
                                        <Field
                                            name="HourlyRate"
                                            label="Hourly Rate"
                                            colWidths={{ xs: 4, sm: 2 }}
                                            component={TextboxRender}
                                        />
                                        <Field
                                            name="DailyRate"
                                            label="Daily Rate"
                                            colWidths={{ xs: 4, sm: 2 }}
                                            component={TextboxRender}
                                        />
                                        <Field
                                            name="SprintRate"
                                            label="Sprint Rate"
                                            colWidths={{ xs: 4, sm: 2 }}
                                            component={TextboxRender}
                                        />
                                    </Row>
                                    <Row>
                                        <FieldArray
                                            name="WeekdayRates"
                                            headers={[
                                                {
                                                    name: 'Weekday',
                                                    label: 'Weekday',
                                                    component: SelectRender,
                                                    options: [
                                                        '',
                                                        'Monday',
                                                        'Tuesday',
                                                        'Wednesday',
                                                        'Thursday',
                                                        'Friday',
                                                        'Saturday',
                                                        'Sunday'
                                                    ].map(day => <option key={day} value={day}>{day}</option>)
                                                },
                                                {
                                                    name: 'PercentIncrease',
                                                    label: 'Percent Increase',
                                                    component: TextboxRender
                                                },
                                                {
                                                    name: 'DailyRate',
                                                    label: 'Daily Rate',
                                                    component: TextboxRender
                                                },
                                                {
                                                    name: 'SprintRate',
                                                    label: 'Sprint Rate',
                                                    component: TextboxRender
                                                }
                                            ]}
                                            colWidths={{ sm: 9 }}
                                            component={InputListRender}
                                            tabIndex="31"
                                        />
                                    </Row>
                                    <Row>
                                        <Field
                                            name="MaxWeight"
                                            label="Max Weight"
                                            colWidths={{ sm: 3 }}
                                            component={TextboxRender}
                                        />
                                    </Row>
                                    <Row>
                                        <Field
                                            name="DefaultVehicle"
                                            label="Default Vehicle"
                                            colWidths={{ sm: 4 }}
                                            component={SelectRender}
                                        >
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
                                        <Field
                                            name="DefaultAddon"
                                            label="Default Addon"
                                            colWidths={{ sm: 4 }}
                                            component={SelectRender}
                                        >
                                            <option value="">Select a Default Addon...</option>
                                            {this.props.addons.map(addon =>
                                                <option key={addon._id} value={addon._id}>
                                                    {addon.Description}
                                                </option>
                                            )}
                                        </Field>
                                        <Field
                                            name="DefaultPackageType"
                                            label="Default Package Type"
                                            colWidths={{ sm: 4 }}
                                            component={SelectRender}
                                        >
                                            <option value="">Select a Default Package Type...</option>
                                            {this.props.packageTypes.map(type =>
                                                <option key={type._id} value={type._id}>
                                                    {type.Description}
                                                </option>
                                            )}
                                        </Field>
                                    </Row>
                                    <Row>
                                        <Field
                                            name="ImportConversion"
                                            label="Import Conversion"
                                            colWidths={{ sm: 8 }}
                                            component={TextareaRender}
                                            placeholder="csv_row_header = database_field_name"
                                            rows="5"
                                        />
                                    </Row>
                                    <Row>
                                        <Field
                                            name="LabelTemplate"
                                            label="Label Template"
                                            colWidths={{ sm: 8 }}
                                            component={TextboxRender}
                                        />
                                    </Row>
                                    <Row>
                                        <Field
                                            name="LateDelivery"
                                            label="SLA Late Delivery"
                                            colWidths={{ sm: 4 }}
                                            component={DateTimeRender}
                                            dateFormat={false}
                                            timeFormat="hh:mm A"
                                            defaultValue="1970/01/01 20:00:00"
                                        />
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
}

UserForm = reduxForm({
    form: 'UserForm',
    validate
})(UserForm);

UserForm.displayName = 'User Form';

UserForm.propTypes = {

};

const mapStateToProps = (state, props) => ({
    users: state.users.all,
    operatingLocations: state.operatingLocations.all,
    countries: state.addresses.countries,
    timezones: state.addresses.timezones,
    addons: state.sprints.addons,
    packageTypes: state.packages.types
});

const mapDispatchToProps = {
    CreateUser,
    UpdateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);