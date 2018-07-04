import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Button, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { NormalizeClientForm, NormalizeCodeField } from '../../NormalizeObjects';

import { CreateClient } from '../../Actions/Clients.actions';

import { TextboxRender, SelectRender, InputListRender, CheckboxRender, AddressRender } from '../ReduxFormRender';

const validate = values => {
    const errors = {};
    
    if (!values.Code) errors.Code = 'Client Code Required';
    if (values.Code && values.Code.length > 20) errors.Code = 'Client Code Max 20 Characters';
    if (values.FirstName && values.FirstName.length > 100) errors.FirstName = 'First Name Max 100 Characters';
    if (values.LastName && values.LastName.length > 100) errors.LastName = 'Last Name Max 100 Characters';
    if (values.Address1 && values.Address1.length > 200 || values.Address1 && values.Address1.length < 5) errors.Address1 = 'Address 1 Max 200, Min 5 Characters';
    if (values.Address1) {
        if (!values.City) errors.City = 'Required';
        if (!values.State) errors.State = 'Required';
    }
    if (values.Address2 && values.Address2.length > 200) errors.Address2 = 'Address 2 Max 200 Characters';
    if (values.City && values.City.length > 60) errors.City = 'City Max 60 Characters';
    if (values.City) {
        if (!values.State) errors.State = 'Required';
    }
    if (values.State && values.State.length > 30) errors.State = 'State Max 30 Characters';
    if (values.PostalCode && values.PostalCode.length > 15) errors.PostalCode = 'Postal Code Max 15 Characters';
    if (!values.Country) errors.Country = 'Required';

    return errors;
}

let ClientForm = ({ handleSubmit, CreateClient, submitting, countries, clients }) => {
    const createClient = values => {
        let clientExists = false;
        clients.forEach(client => {
            if (client.Code === values.Code) {
                return false;
            }
        });
        CreateClient(
            NormalizeClientForm(values)
        );
    }

    return (
        <form onSubmit={handleSubmit(createClient)}>
            <Button type="submit" bsStyle="success" className="pull-right" disabled={submitting}>Create</Button>
            <Button type="reset" bsStyle="default" className="pull-right" disabled={submitting}>Clear</Button>
            <Row>
                <Field
                    name="Code"
                    label="Code"
                    colWidths={{ sm: 4, xs: 12 }}
                    component={TextboxRender}
                    normalize={NormalizeCodeField}
                    autoFocus
                />
            </Row>
            <Row>
                <Col sm={8}>
                    <AddressRender countries={countries} />
                </Col>
            </Row>
            <Row>
                <FieldArray
                    name="PhoneNumbers"
                    headers={[
                        { name: 'PhoneNumber', label: 'Phone Number', component: TextboxRender },
                        { name: 'Type', label: 'Type', component: TextboxRender }
                    ]}
                    colWidths={{ sm: 6 }}
                    component={InputListRender}
                />
                <FieldArray
                    name="EmailAddresses"
                    headers={[{ name: 'EmailAddress', label: 'Email Address', component: TextboxRender }]}
                    colWidths={{ sm: 6 }}
                    component={InputListRender}
                />
            </Row>
            <Row>
                <Col sm={12}>
                    <FormGroup controlId="image">
                        <ControlLabel>Logo</ControlLabel>
                        <FormControl name="image" type="file" label="Upload" accept="*.jpg,*jpeg,*.gif,*.png" className="text-muted clickable" />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Field name="Inactive" label="Inactive" colWidths={{ sm: 6 }} component={CheckboxRender} />
            </Row>
        </form>
    );
}

ClientForm = reduxForm({
    form: 'ClientForm',
    validate
})(ClientForm);

ClientForm.displayName = 'Client Form';

ClientForm.propTypes = {

};

const mapStateToProps = state => ({
    countries: state.addresses.countries,
    clients: state.clients.all
});

const mapDispatchToProps = {
    CreateClient
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientForm);