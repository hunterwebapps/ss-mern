import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'react-bootstrap';
import { getUsernames, getUserEmails } from '../Main.reducer';

import { Register } from '../Modules/Users/Users.actions';

import { TextboxRender } from './ReduxFormRender';
import { ValidateEmail } from '../Helpers';

const validate = values => {
    const errors = {};

    if (!values.Username) errors.Username = 'Required';
    if (values.Username && values.Username.length > 30) errors.Username = 'Username Max 30 Characters';
    if (!values.EmailAddress) errors.EmailAddress = 'Required';
    if (values.EmailAddress && !ValidateEmail(values.EmailAddress)) errors.EmailAddress = 'Invalid Email';
    if (!values.Password) errors.Password = 'Required';
    if (values.Password && values.Password.length < 6) errors.Password = 'Password Minimum 6 Characters';
    if (!values.ConfirmPassword) errors.ConfirmPassword = 'Required';
    if (values.ConfirmPassword && values.ConfirmPassword !== values.Password) errors.ConfirmPassword = 'Passwords Do Not Match';

    return errors;
}

let RegisterForm = ({ handleSubmit, Register, submitting }) => {
    const register = values => Register(values);
    return (
        <React.Fragment>
            <h3>Register</h3>
            <form onSubmit={handleSubmit(register)}>
                <Field
                    name="Username"
                    label="Username"
                    component={TextboxRender}
                />
                <Field
                    name="EmailAddress"
                    label="Email"
                    component={TextboxRender}
                />
                <Field
                    name="Password"
                    label="Password"
                    component={TextboxRender}
                    type="password"
                />
                <Field
                    name="ConfirmPassword"
                    label="Confirm Password"
                    component={TextboxRender}
                    type="password"
                />
                <Button type="submit" bsStyle="success">Register</Button>
            </form>
        </React.Fragment>
    );
}

RegisterForm = reduxForm({
    form: 'RegisterForm',
    validate
})(RegisterForm);

RegisterForm.displayName = 'Register Form';

RegisterForm.propTypes = {
    Register: PropTypes.func.isRequired
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = {
    Register
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);