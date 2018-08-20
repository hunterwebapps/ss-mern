import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Button, FormGroup, FormControl, ControlLabel, HelpBlock, Row, Col, Tab, Nav, NavItem } from 'react-bootstrap';

import { CreateOperatingLocation } from '../../Modules/OperatingLocations/OperatingLocations.actions';
import { IsLoading, ShowError } from '../../Modules/Master/Master.actions';
import { getOperatingLocations } from '../../Main.reducer';
import { NormalizeOperatingLocationForm, NormalizeCodeField, NormalizeDecimalField } from '../../NormalizeObjects';

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

    if (values.Zones) {
        let zonePostalCodes = [];
        for (let i = 0; i < values.Zones.length; i++) {
            const zone = values.Zones[i];
            if (zone.PostalCode) {
                if (zonePostalCodes.includes(zone.PostalCode)) {
                    errors.Zones = `Duplicate Postal Code: ${zone.PostalCode}`;
                    break;
                }
                zonePostalCodes.push(zone.PostalCode);
            }
        }
    }

    return errors;
}

let OperatingLocationForm = ({
    operatingLocations,
    CreateOperatingLocation,
    IsLoading,
    array,
    handleSubmit,
    packageTypes,
    countries,
    timezones,
    addons
}) => {
    const createOperatingLocation = values => {
        for (let i = 0; i < operatingLocations.length; i++) {
            const location = operatingLocations[i];

            if (location.Code === values.Code)
                ShowError({
                    message: 'Operating Location Exists',
                    exception: `The CODE '${location.Code}' already exists`
                });

            if (location.Contact.Address.PostalCode === values.PostalCode)
                ShowError({
                    message: 'Operating Location Exists',
                    exception: `A Location for '${location.PostalCode}' already exists`
                });

            return false;
        }

        CreateOperatingLocation({
            Code: values.Code,
            FirstName: values.FirstName,
            LastName: values.LastName,
            Company: values.Company,
            Address1: values.Address1,
            Address2: values.Address2,
            City: values.City,
            State: values.State,
            PostalCode: values.PostalCode,
            Country: values.Country,
            Timezone: values.Timezone,
            Latitude: values.Latitude,
            Longitude: values.Longitude,
            PhoneNumbers: values.PhoneNumbers,
            EmailAddresses: values.EmailAddresses,
            Website: values.Website,
            MinutesPerMile: values.MinutesPerMile,
            MinutesPerStop: values.MinutesPerStop,
            Hours: values.WeekdayHours,
            Holidays: values.SpecificHours,
            Addons: values.Addons.map(a => a.Addon),
            Notifications: values.Notifications,
            Pricing: values.Pricing,
            PackageType: values.PackageType,
            LoadListSort: values.LoadListSort,
            Zones: values.Zones
        });
    }

    const parseZonesFile = e => {
        const reader = new FileReader();
        IsLoading(true);
        reader.onload = () => {
            const rows = reader.result.split(/\r?\n/);
            rows.forEach((zone, index) => {
                const values = zone.split(',');
                array.insert('Zones', index, { ZoneNumber: values[0], PostalCode: values[1] });
            });
        }
        reader.onerror = reader.onloadend = () => IsLoading(false);
        reader.readAsText(e.target.files[0]);
    }

    return (
        <form onSubmit={handleSubmit(createOperatingLocation)}>
            <Button type="submit" bsStyle="success" className="pull-right">Submit</Button>
            <Button type="reset" bsStyle="default" className="pull-right">Reset</Button>
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
                                            <Field name="PackageType" label="Default Package Type" colWidths={{ sm: 9 }} component={SelectRender}>
                                                <option value="">Select a Default Package Type...</option>
                                                {packageTypes.map(type =>
                                                    <option key={type._id} value={type._id}>{type.Description}</option>
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
                                                    'Sunday'].map(day =>
                                                        <option key={day} value={day}>{day}</option>
                                                    )
                                            },
                                            {
                                                name: 'OpeningHour',
                                                label: 'Opening Hour',
                                                component: DateTimeRender,
                                                componentProps: {
                                                    dateFormat: false,
                                                    timeFormat: 'HH:mm',
                                                    defaultValue: ''
                                                }
                                            },
                                            {
                                                name: 'ClosingHour',
                                                label: 'Closing Hour',
                                                component: DateTimeRender,
                                                componentProps: {
                                                    dateFormat: false,
                                                    timeFormat: 'HH:mm',
                                                    defaultValue: ''
                                                }
                                            }
                                        ]}
                                        colWidths={{ sm: 8 }}
                                        component={InputListRender}
                                    />
                                    <FieldArray
                                        name="SpecificHours"
                                        headers={[
                                            {
                                                name: 'CalendarDate',
                                                label: 'Calendar Date',
                                                component: DateTimeRender,
                                                componentProps: {
                                                    dateFormat: 'MM/DD/YYYY',
                                                    timeFormat: false,
                                                    defaultValue: ''
                                                }
                                            },
                                            {
                                                name: 'Closed',
                                                label: 'Closed',
                                                component: CheckboxRender
                                            },
                                            {
                                                name: 'OpeningHour',
                                                label: 'Opening Hour',
                                                component: DateTimeRender,
                                                componentProps: {
                                                    dateFormat: false,
                                                    timeFormat: 'HH:mm',
                                                    defaultValue: ''
                                                }
                                            },
                                            {
                                                name: 'ClosingHour',
                                                label: 'Closing Hour',
                                                component: DateTimeRender,
                                                componentProps: {
                                                    dateFormat: false,
                                                    timeFormat: 'HH:mm',
                                                    defaultValue: ''
                                                }
                                            }
                                        ]}
                                        colWidths={{ sm: 8 }}
                                        component={InputListRender}
                                    />
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="zones">
                                <Row>
                                    <Col sm={12}>
                                        <FormGroup controlId="zoneFile">
                                            <ControlLabel>Upload CSV</ControlLabel>
                                            <FormControl
                                                name="zoneFile"
                                                type="file"
                                                label="Upload"
                                                accept="*.csv"
                                                className="text-muted clickable"
                                                onChange={parseZonesFile}
                                            />
                                            <HelpBlock>First Column "Zone Number", Second Column "Postal Codes"</HelpBlock>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <FieldArray
                                        name="Zones"
                                        headers={[
                                            {
                                                name: 'ZoneNumber',
                                                label: 'Zone Number',
                                                component: TextboxRender
                                            },
                                            {
                                                name: 'PostalCode',
                                                label: 'Postal Code',
                                                component: TextboxRender
                                            }
                                        ]}
                                        colWidths={{ sm: 6 }}
                                        component={InputListRender}
                                    />
                                    {/*<FieldArray
                                        name="Geopoints"
                                        headers={[
                                            { name: 'Geopoints', label: 'Geopoints', component: TextareaRender },
                                            { name: 'ZoneNumber', label: 'Zone Number', component: TextboxRender }
                                        ]}
                                        colWidths={{ sm: 6 }}
                                        component={InputListRender}
                                    />*/}
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="addons">
                                <Row>
                                    <FieldArray
                                        name="Addons"
                                        headers={[
                                            {
                                                name: 'Addon',
                                                label: 'Addon',
                                                component: SelectRender,
                                                options: [{ _id: '', Description: '' }]
                                                    .concat(addons)
                                                    .map(addon =>
                                                        <option key={addon._id} value={addon._id}>
                                                            {addon.Description}
                                                        </option>
                                                    )
                                            }
                                        ]}
                                        colWidths={{ sm: 6 }}
                                        component={InputListRender}
                                    />
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="notifications">
                                <Row>
                                    <FieldArray
                                        name="Notifications"
                                        headers={[
                                            {
                                                name: 'EmailAddress',
                                                label: 'Email Address',
                                                component: TextboxRender
                                            }
                                        ]}
                                        colWidths={{ sm: 6 }}
                                        component={InputListRender}
                                    />
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="pricing">
                                <Row>
                                    <FieldArray
                                        name="Pricing"
                                        headers={[
                                            {
                                                name: 'PackageType',
                                                label: 'Package Type',
                                                component: SelectRender,
                                                options:
                                                    [{ _id: '', Description: '' }]
                                                        .concat(packageTypes)
                                                        .map(type =>
                                                            <option key={type._id} value={type._id}>
                                                                {type.Description}
                                                            </option>
                                                        )
                                            },
                                            {
                                                name: 'Price',
                                                label: 'Price',
                                                component: TextboxRender,
                                                componentProps: {
                                                    normalize: NormalizeDecimalField(2)
                                                }
                                            }
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
    timezones: state.addresses.timezones,
    addons: state.sprints.addons
});

const mapDispatchToProps = {
    CreateOperatingLocation,
    IsLoading,
    ShowError
};

export default connect(mapStateToProps, mapDispatchToProps)(OperatingLocationForm);