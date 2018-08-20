import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { PanelGroup, Panel, Button, Row, Col } from 'react-bootstrap';
import { CreateUserAddress } from '../../Modules/Addresses/Addresses.actions';
import { AddressRender } from '../ReduxFormRender';
import { getUserAddresses } from '../../Main.reducer';

const validate = values => {
    const errors = [];

    return errors;
}

let UserAddresses = ({ handleSubmit, CreateUserAddress, countries, timezones, pickupAddresses }) => {

    const createUserAddress = values => {
        CreateUserAddress({
            FirstName: values.FirstName,
            LastName: values.LastName,
            JobTitle: values.JobTitle,
            Company: values.Company,
            Address1: values.Address1,
            Address2: values.Address2,
            City: values.City,
            State: values.State,
            PostalCode: values.PostalCode,
            Country: values.Country,
            Timezone: values.Timezone,
            PhoneNumbers: values.PhoneNumbers.map(number =>
                ({
                    PhoneNumber: number.PhoneNumber,
                    Type: number.Type
                })),
            EmailAddresses: values.EmailAddresses.map(email => email)
        });
    }

    return (
        <React.Fragment>
            <Row>
                <Col xs={12}>
                    <PanelGroup id="showUserAddresses" accordion>
                        {pickupAddresses.map((addr, index) =>
                            <Panel key={addr._id} eventKey={addr._id}>
                                <Panel.Heading>
                                    <Panel.Title toggle>
                                        <h5>
                                            {`${addr.Address1}, ${addr.Address2}, ${addr.City}, ${addr.State} ${addr.PostalCode}`}
                                        </h5>
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    {`${addr.Address1}`}<br />
                                    {`${addr.Address2}`}<br />
                                    {`${addr.City}`}<br />
                                    {`${addr.State}`}<br />
                                    {`${addr.PostalCode}`}
                                </Panel.Body>
                            </Panel>
                        )}
                        <Panel key="createUserAddress" eventKey="createUserAddress">
                            <Panel.Heading>
                                <Panel.Title toggle>
                                    <h5>Add a User Address</h5>
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                                <form onSubmit={handleSubmit(createUserAddress)}>
                                    <AddressRender countries={countries} timezones={timezones} />
                                    <Button type="submit" bsStyle="success" className="pull-right">Submit</Button>
                                    <Button type="reset" bsStyle="default" className="pull-right">Reset</Button>
                                </form>
                            </Panel.Body>
                        </Panel>
                    </PanelGroup>
                </Col>
            </Row>
        </React.Fragment>
    );
}

UserAddresses = reduxForm({
    form: 'UserAddress',
    validate
})(UserAddresses);

UserAddresses.displayName = 'User Settings Form';

UserAddresses.propTypes = {

};

const mapStateToProps = state => ({
    pickupAddresses: getUserAddresses(state),
    countries: state.addresses.countries,
    timezones: state.addresses.timezones
});

const mapDispatchToProps = {
    CreateUserAddress
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAddresses);