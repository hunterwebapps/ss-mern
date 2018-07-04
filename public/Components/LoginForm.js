import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'react-bootstrap';

import { Authenticate } from '../Actions/Users.actions';

import { TextboxRender, CheckboxRender } from './ReduxFormRender';

const validate = values => {
    const errors = {};

    if (!values.Username) errors.Username = 'Required';
    if (!values.Password) errors.Password = 'Required';

    return errors;
}

let LoginForm = ({ handleSubmit, Authenticate, submitting }) => {
    const login = values => Authenticate(values);
    return (
        <React.Fragment>
            {console.log('Submitting', submitting)}
            <h3>Login</h3>
            <form onSubmit={handleSubmit(login)}>
                <Field
                    name="Username"
                    label="Username"
                    component={TextboxRender}
                    autoFocus
                />
                <Field
                    name="Password"
                    label="Password"
                    component={TextboxRender}
                    type="password"
                />
                <Field
                    name="RememberMe"
                    label="Remember Me"
                    component={CheckboxRender}
                />
                <Button type="submit" bsStyle="success" disabled={submitting}>Login</Button>
            </form>
        </React.Fragment>
    );
}

LoginForm = reduxForm({
    form: 'LoginForm',
    validate
})(LoginForm);

LoginForm.displayName = 'Login Form';

LoginForm.propTypes = {
    Authenticate: PropTypes.func.isRequired
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = {
    Authenticate
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);