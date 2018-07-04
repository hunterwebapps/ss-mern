import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Row, Col, Label, ControlLabel, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import DateTime from 'react-datetime';
import { RoundHourUp } from '../Helpers';

import { CreateSprint } from '../Actions/Sprints.actions';

class ImportSprints extends React.Component {
    constructor() {
        super();
        this.state = {
            pickupDate: null
        }
    }

    handleDateChange = (dateTime) => {
        this.setState({
            pickupDate: dateTime.format("DD/MM/YYY HH:mm:00"),
        });
    }

    handleSubmit = e => {
        this.props.CreateSprint();
    }

    render() {
        const pickupOptions = this.props.pickupAddresses.map(addr =>
            <option value={addr.AddressID}>
                {`${addr.Address1}, ${addr.City}, ${addr.State} ${addr.PostalCode}`}
            </option>
        );

        //const serviceLevels = this.props.operatingLocation.serviceLevels.map(level =>
        //    <option value={level.ServiceLevelID}>{level.Description}</option>
        //);

        //const packageTypes = this.props.operatingLocation.packageTypes.map(type =>
        //    <option value={type.PackageTypeID}>{type.Description}</option>
        //);

        const chargeAccounts = this.props.chargeAccounts.map(acct =>
            <option value={acct.AccountID}>{acct.Description}</option>
        );

        const now = RoundHourUp(new Date());
        const nowHours = now.getHours();
        if (nowHours < 7) {
            // TODO: Add preference to set hours of operation
            now.setHours(8);
        } else if (nowHours > 19) {
            now.setHours(8);
            now.setDate(now.getDate() + 1);
        }

        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="csvImport">
                        <ControlLabel><i className="fa fa-file-alt"></i> CSV File</ControlLabel>
                        <FormControl
                            type="file"
                            label="Upload"
                            accept=".csv"
                            inputRef={ref => this.csv = ref}
                            className="text-muted clickable"
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Must Provide a Valid CSV File</HelpBlock>
                    </FormGroup>
                    <FormGroup controlId="pickupAddress">
                        <ControlLabel><i className="fa fa-building"></i> Pickup Address</ControlLabel>
                        <FormControl componentClass="select" placeholder="Select a Pickup Address...">
                            <option value="">Select a Pickup Address...</option>
                            {pickupOptions}
                        </FormControl>
                    </FormGroup>
                    <Row>
                        <Col sm={6}>
                            <FormGroup controlId="pickupDate">
                                <ControlLabel><i className="fa fa-calendar-alt"></i> Pickup Date</ControlLabel>
                                <DateTime
                                    defaultValue={now}
                                    dateFormat="MMM DD, YYYY"
                                    timeFormat="hh:mm A"
                                    timeConstraints={{
                                        hours: { min: 8, max: 18, step: 1 },
                                        minutes: { min: 0, max: 59, step: 15 },
                                        seconds: { min: 0, max: 0, step: 0 }
                                    }}
                                    onChange={this.handleDateChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <FormGroup controlId="serviceLevel">
                                <ControlLabel><i className="fa fa-shipping-fast"></i> Service Level</ControlLabel>
                                <FormControl componentClass="select" placeholder="Select a Service Level...">
                                    <option value="">Select a Service Level...</option>
                                    
                                </FormControl>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <FormGroup controlId="packageType">
                                <ControlLabel><i className="fa fa-box"></i> Package Type</ControlLabel>
                                <FormControl componentClass="select" placeholder="Select a Package Type...">
                                    <option value="">Select a Package Type...</option>
                                    
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <FormGroup controlId="chargeAccount">
                                <ControlLabel><i className="fa fa-credit-card"></i> Charge Account</ControlLabel>
                                <FormControl componentClass="select" placeholder="Select a Charge Account...">
                                    <option value="">Select a Charge Account...</option>
                                    {chargeAccounts}
                                </FormControl>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Button bsStyle="success" className="pull-right" type="submit">Create Sprints</Button>
                        </Col>
                    </Row>
                </form>
            </React.Fragment>
        );
    }
}

ImportSprints.displayName = 'Import Sprints';

ImportSprints.propTypes = {
    pickupAddresses: PropTypes.arrayOf(PropTypes.shape({
        AddressID: PropTypes.number.isRequired,
        Address1: PropTypes.string.isRequired,
        Address2: PropTypes.string,
        City: PropTypes.string.isRequired,
        State: PropTypes.string.isRequired,
        Country: PropTypes.string.isRequired
    }).isRequired)
};

const mapStateToProps = state => ({
    chargeAccounts: state.users.accounts,
    pickupAddresses: state.users.pickupAddresses,
    operatingLocation: state.operatingLocations.active
});

const mapDispatchToProps = {
    CreateSprint
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportSprints);