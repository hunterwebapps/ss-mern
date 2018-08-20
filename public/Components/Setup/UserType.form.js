import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Row, Col } from 'react-bootstrap';
import { NormalizeUserTypeForm } from '../../NormalizeObjects';

import { CreateUserType } from '../../Modules/Users/Users.actions';

import { TextboxRender, SelectRender, CheckboxRender } from '../ReduxFormRender';

const validate = values => {
    const errors = {};

    if (!values.Code) errors.Code = 'Required';
    if (!values.HomePage) errors.HomePage = 'Required';
    if (!values.Description) errors.Description = 'Required';
    if (values.Description && values.Description.length > 100) errors.Description = 'Max 500 Characters';

    return errors;
}

let UserTypeForm = ({ handleSubmit, CreateUserType, submitting, userTypes, pages }) => {
    const createUserType = values => {
        let packageTypeExists = false;
        userTypes.forEach(type => {
            if (type.Code === values.Code) {
                return false;
            }
        });
        CreateUserType(NormalizeUserTypeForm(values));
    }

    return (
        <form onSubmit={handleSubmit(createUserType)}>
            <Button type="submit" bsStyle="success" className="pull-right" tabIndex="8" disabled={submitting}>Create</Button>
            <Button type="reset" bsStyle="default" className="pull-right" tabIndex="9" disabled={submitting}>Clear</Button>
            <Row>
                <Field name="Code" label="Code" colWidths={{ sm: 4 }} component={TextboxRender} tabIndex="1" />
                <Field name="HomePage" label="Home Page" colWidths={{ sm: 4 }} component={SelectRender} tabIndex="3">
                    <option value="">Select a Home Page...</option>
                    {pages.filter(page => page.Inactive === false).map(page =>
                        <option key={page.PageID} value={page.PageID}>{page.Description}</option>
                    )}
                </Field>
            </Row>
            <Row>
                <Field name="Description" label="Description" colWidths={{ sm: 8 }} component={TextboxRender} tabIndex="2" />
            </Row>
            <Row>
                <Field name="Administrator" label="Administrator" colWidths={{ sm: 2 }} component={CheckboxRender} tabIndex="4" />
                <Field name="FullClientAccess" label="Full Client Access" colWidths={{ sm: 3 }} component={CheckboxRender} tabIndex="5" />
                <Field name="InternalUseOnly" label="Internal Use Only" colWidths={{ sm: 3 }} component={CheckboxRender} tabIndex="6" />
                <Field name="Inactive" label="Inactive" colWidths={{ sm: 2 }} component={CheckboxRender} tabIndex="7" />
            </Row>
        </form>
    );
}

UserTypeForm = reduxForm({
    form: 'UserTypeForm',
    validate
})(UserTypeForm);

UserTypeForm.displayName = 'User Type Form';

UserTypeForm.propTypes = {

};

const mapStateToProps = state => ({
    userTypes: state.packages.types,
    pages: state.pages.all
});

const mapDispatchToProps = {
    CreateUserType
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTypeForm);