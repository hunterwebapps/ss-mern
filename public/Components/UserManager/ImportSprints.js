import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Col, Row, Label, ControlLabel, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import DateTime from 'react-datetime';
import { RoundHourUp } from '../../Helpers';

import { ImportCSV } from '../../Modules/Sprints/Sprints.actions';
import { SelectRender, DateTimeRender, FileRender } from '../ReduxFormRender';
import { getUserAddresses, getUserAccounts } from '../../Main.reducer';

const validate = values => {
    const errors = [];

    return errors;
}

const now = RoundHourUp(new Date());
const nowHours = now.getHours();
if (nowHours < 7) {
    // TODO: Add preference to set hours of operation
    now.setHours(8);
} else if (nowHours > 19) {
    now.setHours(8);
    now.setDate(now.getDate() + 1);
}

let ImportSprintsForm = ({ handleSubmit, ImportCSV, pickupAddresses, packageTypes, accounts }) => {
    const createSprints = values => {
        const formData = new FormData();

        formData.append('pickupAddressId', values.PickupAddress);
        formData.append('pickupAfter', values.PickupAfter.toString());
        formData.append('pickupBefore', values.PickupBefore.toString());
        formData.append('deliveryAfter', values.DeliveryAfter.toString());
        formData.append('deliveryBefore', values.DeliveryBefore.toString());
        formData.append('packageTypeId', values.PackageType);
        formData.append('accountId', values.Account);
        formData.append('sprintsCsv', values.SprintsCSV[0]);

        ImportCSV(formData);
    }

    return (
        <form onSubmit={handleSubmit(createSprints)}>
            <Row>
                <Field
                    name="SprintsCSV"
                    label="CSV Upload"
                    accept=".csv"
                    className="text-muted clickable"
                    colWidths={{ xs: 12 }}
                    component={FileRender}
                    labelIcon={<i className="fa fa-file-alt"></i>}
                    helpBlock="Must Provide a Valid CSV File"
                />
            </Row>
            <Row>
                <Field
                    name="PickupAddress"
                    label="Pickup Address"
                    labelIcon={<i className="fa fa-building"></i>}
                    colWidths={{ xs: 12 }}
                    component={SelectRender}
                    autoFocus
                >
                    <option value="">
                        {'Select a Pickup Address (Add Addresses in Your Settings)...'}
                    </option>
                    {pickupAddresses.map(addr =>
                        <option key={addr._id} value={addr._id}>
                            {`${addr.Address1}, ${addr.City}, ${addr.State} ${addr.PostalCode}`}
                        </option>
                    )}
                </Field>
            </Row>
            <Row>
                <Field
                    name="PickupAfter"
                    label="Pickup Between"
                    labelIcon={<i className="fa fa-calendar-alt"></i>}
                    colWidths={{ sm: 6 }}
                    component={DateTimeRender}
                    dateFormat="MM/DD/YYYY"
                    timeFormat="hh:mm a"
                    timeConstraints={{
                        hours: { min: 8, max: 18, step: 1 },
                        minutes: { min: 0, max: 59, step: 15 },
                        seconds: { min: 0, max: 0, step: 0 }
                    }}
                />
                <Field
                    name="PickupBefore"
                    label="And"
                    labelIcon={<i className="fa fa-calendar-alt"></i>}
                    colWidths={{ sm: 6 }}
                    component={DateTimeRender}
                    dateFormat="MM/DD/YYYY"
                    timeFormat="hh:mm a"
                    timeConstraints={{
                        hours: { min: 8, max: 18, step: 1 },
                        minutes: { min: 0, max: 59, step: 15 },
                        seconds: { min: 0, max: 0, step: 0 }
                    }}
                />
                <Field
                    name="DeliveryAfter"
                    label="Delivery Between"
                    labelIcon={<i className="fa fa-calendar-alt"></i>}
                    colWidths={{ sm: 6 }}
                    component={DateTimeRender}
                    dateFormat="MM/DD/YYY"
                    timeFormat="hh:mm a"
                    timeConstraints={{
                        hours: { min: 8, max: 18, step: 1 },
                        minutes: { min: 0, max: 59, step: 15 },
                        seconds: { min: 0, max: 0, step: 0 }
                    }}
                />
                <Field
                    name="DeliveryBefore"
                    label="And"
                    labelIcon={<i className="fa fa-clock"></i>}
                    colWidths={{ sm: 6 }}
                    component={DateTimeRender}
                    dateFormat="MM/DD/YYYY"
                    timeFormat="hh:mm a"
                    timeConstraints={{
                        hours: { min: 8, max: 18, step: 1 },
                        minutes: { min: 0, max: 59, step: 15 },
                        seconds: { min: 0, max: 0, step: 0 }
                    }}
                />
            </Row>
            <Row>
                <Field
                    name="PackageType"
                    label="Package Type"
                    labelIcon={<i className="fa fa-box"></i>}
                    colWidths={{ sm: 6 }}
                    component={SelectRender}
                >
                    <option value="">
                        {'Select a Package Type...'}
                    </option>
                    {packageTypes.map(type =>
                        <option key={type._id} value={type._id}>
                            {type.Description}
                        </option>
                    )}
                </Field>
                <Field
                    name="Account"
                    label="Charge Account"
                    labelIcon={<i className="fa fa-credit-card"></i>}
                    colWidths={{ sm: 6 }}
                    component={SelectRender}
                >
                    <option value="">
                        {'Select a Charge Account...'}
                    </option>
                    {accounts.map(acct =>
                        <option key={acct._id} value={acct._id}>
                            {acct.AccountLabel}
                        </option>
                    )}
                </Field>
            </Row>
            <Row>
                <Col xs={12}>
                    <Button bsStyle="success" className="pull-right" type="submit">Create Sprints</Button>
                </Col>
            </Row>
        </form>
    );
}

ImportSprintsForm = reduxForm({
    form: 'ImportSprintsForm',
    validate,
    initialValues: {
        PickupAfter: now,
        PickupBefore: now,
        DeliveryAfter: now,
        DeliveryBefore: now
    }
})(ImportSprintsForm);

ImportSprintsForm.displayName = 'Import Sprints';

ImportSprintsForm.propTypes = {
    pickupAddresses: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Address1: PropTypes.string.isRequired,
        Address2: PropTypes.string,
        City: PropTypes.string.isRequired,
        State: PropTypes.string.isRequired,
        Country: PropTypes.string.isRequired
    }))
};

const mapStateToProps = state => ({
    accounts: getUserAccounts(state),
    pickupAddresses: getUserAddresses(state),
    operatingLocation: state.operatingLocations.active,
    packageTypes: state.packages.types
});

const mapDispatchToProps = {
    ImportCSV
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportSprintsForm);