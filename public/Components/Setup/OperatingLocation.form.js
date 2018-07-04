import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Button, FormGroup, FormControl, ControlLabel, HelpBlock, Row, Col, Tab, Nav, NavItem } from 'react-bootstrap';

import { CreateOperatingLocation } from '../../Actions/OperatingLocation.actions';
import { getOperatingLocations } from '../../Reducers/Main.reducer';
import { NormalizeOperatingLocationForm, NormalizeCodeField } from '../../NormalizeObjects';

import { TextboxRender, SelectRender, InputListRender, CheckboxRender, DateTimeRender, TextareaRender, AddressRender } from '../ReduxFormRender';

const validate = values => {
    const errors = {};

    if (!values.Code) errors.Code = 'Required';
    if (values.Code && values.Code.length > 10) errors.Code = 'Max 10 Characters';
    if (!values.Company) errors.Company = 'Required';
    if (values.Company && values.Company.length > 100) errors.Company = 'Max 100 Characters';
    if (values.FirstName && values.FirstName.length > 100) errors.FirstName = 'Max 100 Characters';
    if (values.LastName && values.LastName.length > 100) errors.LastName = 'Max 100 Characters';
    if (!values.Address1) errors.Address1 = 'Required';
    if (values.Address1 && values.Address1.length > 200) errors.Address1 = 'Max 200 Characters';
    if (values.Address2 && values.Address2.length > 200) errors.Address2 = 'Max 200 Characters';
    if (!values.City) errors.City = 'Required';
    if (values.City && values.City.length > 60) errors.City = 'Max 60 Characters';
    if (!values.State) errors.State = 'Required';
    if (values.State && values.State.length > 30) errors.State = 'Max 30 Characters';
    if (!values.PostalCode) errors.PostalCode = 'Required';
    if (values.PostalCode && values.PostalCode.length > 15) errors.PostalCode = 'Max 15 Characters';
    if (!values.Country) errors.Country = 'Required';
    if (!values.Timezone) errors.Timezone = 'Required';
    if (!values.Longitude) errors.Longitude = 'Required';
    if (values.Longitude && values.Longitude.length > 22) errors.Longitude = 'Max 22 Characters';
    if (!values.Latitude) errors.Latitude = 'Required';
    if (values.Latitude && values.Latitude.length > 22) errors.Latitude = 'Max 22 Characters';
    if (!values.MinutesPerMile) errors.MinutesPerMile = 'Required';
    if (!values.MinutesPerStop) errors.MinutesPerStop = 'Required';
    //if (!values.Zones) errors.Zones = 'Required';

    return errors;
}

let OperatingLocationForm = ({ handleSubmit, CreateOperatingLocation, submitting, operatingLocations, countries, timezones, packageTypes }) => {
    const createOperatingLocation = values => {
        let locationExists = false;
        operatingLocations.forEach(location => {
            if (location.Code === values.Code) return false;
            if (location.ContactInfo.Address.PostalCode === values.PostalCode) return false;
        });

        const normalizedLocationData = NormalizeOperatingLocationForm(values);
        CreateOperatingLocation(normalizedLocationData);
    }

    return (
        <form onSubmit={handleSubmit(createOperatingLocation)}>
            <Button type="submit" bsStyle="success" className="pull-right" disabled={submitting}>Submit</Button>
            <Button type="reset" bsStyle="default" className="pull-right" disabled={submitting}>Reset</Button>
            <Tab.Container id="setupOperatingLocations" defaultActiveKey="location">
                <Row className="clearfix">
                    <Col xs={12}>
                        <Nav bsStyle="tabs">
                            <NavItem eventKey="location">Location</NavItem>
                            <NavItem eventKey="hours">Hours</NavItem>
                            <NavItem eventKey="zones">Zones</NavItem>
                            <NavItem eventKey="addons">Addons</NavItem>
                            <NavItem eventKey="notifications">Notifications</NavItem>
                            <NavItem eventKey="pricing">Pricing</NavItem>
                            <NavItem eventKey="assets">Assets</NavItem>
                        </Nav>
                    </Col>
                    <Col xs={12}>
                        <Tab.Content className="margin-top" animation>
                            <Tab.Pane eventKey="location">
                                <Row>
                                    <Col sm={6}>
                                        <Row>
                                            <Field
                                                name="Code"
                                                label="Location Code"
                                                colWidths={{ sm: 6 }}
                                                component={TextboxRender}
                                                normalize={NormalizeCodeField}
                                                autoFocus
                                            />
                                        </Row>
                                        <Row>
                                            <Field
                                                name="Company"
                                                label="Company Name"
                                                colWidths={{ sm: 9 }}
                                                component={TextboxRender}
                                            />
                                        </Row>
                                        <Row>
                                            <Field name="DefaultPackageType" label="Default Package Type" colWidths={{ sm: 9 }} component={SelectRender}>
                                                <option value="">Select a Default Package Type...</option>
                                                {packageTypes.map(type =>
                                                    <option key={type.PackageTypeID} value={type.PackageTypeID}>{type.Description}</option>
                                                )}
                                            </Field>
                                        </Row>
                                        <Row>
                                            <Col sm={9}>
                                                <FormGroup controlId="image">
                                                    <ControlLabel>Image</ControlLabel>
                                                    <FormControl name="image" type="file" label="Upload" accept="*.jpg,*jpeg,*.gif,*.png" className="text-muted clickable" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Field name="Inactive" label="Inactive" colWidths={{ sm: 6 }} component={CheckboxRender} />
                                        </Row>
                                        <h3>Calculate Package ETA's</h3>
                                        <Row>
                                            <Field
                                                name="MinutesPerMile"
                                                label="Minutes per Mile"
                                                colWidths={{ sm: 6 }}
                                                component={TextboxRender}
                                            />
                                            <Field
                                                name="MinutesPerStop"
                                                label="Minutes per Stop"
                                                colWidths={{ sm: 6 }}
                                                component={TextboxRender}
                                            />
                                        </Row>
                                        <Row>
                                            <Field name="LoadListSort" label="Load List Sort" colWidths={{ sm: 6 }} component={SelectRender}>
                                                <option value="">Select a Load List Sort...</option>
                                                <option value={0}>Shortest Distance</option>
                                                <option value={1}>Fastest Time</option>
                                                <option value={2}>Balanced Route</option>
                                            </Field>
                                        </Row>
                                    </Col>
                                    <Col sm={6}>
                                        <AddressRender countries={countries} timezones={timezones} />
                                        <Row>
                                            <Field
                                                name="Latitude"
                                                label="Latitude"
                                                colWidths={{ sm: 6 }}
                                                component={TextboxRender}
                                            />
                                            <Field
                                                name="Longitude"
                                                label="Longitude"
                                                colWidths={{ sm: 6 }}
                                                component={TextboxRender}
                                            />
                                        </Row>
                                        <Row>
                                            <FieldArray
                                                name="PhoneNumbers"
                                                headers={[
                                                    { name: 'PhoneNumber', label: 'Phone Number', component: TextboxRender },
                                                    { name: 'Type', label: 'Type', component: TextboxRender }
                                                ]}
                                                colWidths={{ xs: 12 }}
                                                component={InputListRender}
                                            />
                                            <FieldArray
                                                name="EmailAddresses"
                                                headers={[{ name: 'EmailAddress', label: 'Email Address', component: TextboxRender }]}
                                                colWidths={{ xs: 12 }}
                                                component={InputListRender}
                                            />
                                        </Row>
                                        <Row>
                                            <Field
                                                name="Website"
                                                label="Website"
                                                colWidths={{ sm: 9 }}
                                                component={TextboxRender}
                                            />
                                        </Row>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="hours">
                                <Row>
                                    <FieldArray
                                        name="WeekdayHours"
                                        headers={[
                                            { name: 'Weekday', label: 'Weekday', component: SelectRender },
                                            { name: 'OpeningHour', label: 'Opening Hour', component: DateTimeRender },
                                            { name: 'ClosingHour', label: 'Closing Hour', component: DateTimeRender }
                                        ]}
                                        colWidths={{ sm: 6 }}
                                        component={InputListRender}
                                    />
                                    <FieldArray
                                        name="SpecificHours"
                                        headers={[
                                            { name: 'CalendarDate', label: 'Calendar Date', component: DateTimeRender },
                                            { name: 'Closed', label: 'Closed', component: CheckboxRender },
                                            { name: 'OpeningHour', label: 'Opening Hour', component: DateTimeRender },
                                            { name: 'ClosingHour', label: 'Closing Hour', component: DateTimeRender }
                                        ]}
                                        colWidths={{ sm: 6 }}
                                        component={InputListRender}
                                    />
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="zones">
                                <Row>
                                    <Col sm={12}>
                                        <FormGroup controlId="zoneFile">
                                            <ControlLabel>Upload CSV</ControlLabel>
                                            <FormControl name="zoneFile" type="file" label="Upload" accept="*.csv" className="text-muted clickable" />
                                            <HelpBlock>First Column "Zone Number", Second Column "Postal Codes"</HelpBlock>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <FieldArray
                                        name="Zones"
                                        headers={[
                                            { name: 'ZoneNumber', label: 'Zone Number', component: TextboxRender },
                                            { name: 'PostalCode', label: 'Postal Code', component: TextboxRender }
                                        ]}
                                        colWidths={{ sm: 6 }}
                                        component={InputListRender}
                                    />
                                    <FieldArray
                                        name="Geopoints"
                                        headers={[
                                            { name: 'Geopoints', label: 'Geopoints', component: TextareaRender },
                                            { name: 'ZoneNumber', label: 'Zone Number', component: TextboxRender }
                                        ]}
                                        colWidths={{ sm: 6 }}
                                        component={InputListRender}
                                    />
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="addons">
                                <Row>
                                    <FieldArray
                                        name="Addons"
                                        headers={[{ name: 'Addon', label: 'Addon', component: SelectRender }]}
                                        colWidths={{ sm: 6 }}
                                        component={InputListRender}
                                    />
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="notifications">
                                <Row>
                                    <FieldArray
                                        name="EmailAddresses"
                                        headers={[{ name: 'EmailAddress', label: 'Email Address', component: TextboxRender }]}
                                        colWidths={{ sm: 6 }}
                                        component={InputListRender}
                                    />
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="pricing">
                                <Row>
                                    <FieldArray
                                        name="PackageTypes"
                                        headers={[
                                            { name: 'PackageType', label: 'Package Type', component: SelectRender },
                                            { name: 'Price', label: 'Price', component: TextboxRender }
                                        ]}
                                        colWidths={{ sm: 6 }}
                                        component={InputListRender}
                                    />
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="assets">

                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </form>
    );
}

OperatingLocationForm = reduxForm({
    form: 'OperatingLocationForm',
    validate
})(OperatingLocationForm);

OperatingLocationForm.displayName = 'Operating Location Form';

OperatingLocationForm.propTypes = {

};

const mapStateToProps = state => ({
    operatingLocations: getOperatingLocations(state),
    packageTypes: state.packages.types,
    countries: state.addresses.countries,
    timezones: state.addresses.timezones
});

const mapDispatchToProps = {
    CreateOperatingLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(OperatingLocationForm);