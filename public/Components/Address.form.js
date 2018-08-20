import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, FieldArray } from 'redux-form';


let AddressForm = ({ handleSubmit, countries, timezones }) => {

    return (
        <form onSubmit={handleSubmit}>
            <AddressRender countries={countries} timezones={timezones} />
        </form>
    );
}

export default AddressForm;