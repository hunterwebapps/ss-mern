import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Row, Col } from 'react-bootstrap';
import { NormalizePageForm, NormalizeCodeField, NormalizeRelativeUrlField } from '../../NormalizeObjects';

import { TextboxRender, SelectRender, CheckboxRender } from '../ReduxFormRender';

import { CreatePage } from '../../Modules/Pages/Pages.actions';
import { ShowError } from '../../Modules/Master/Master.actions';

const validate = values => {
    const errors = {};

    if (!values.Code) return errors.Code = 'Required';
    if (!values.Description) return errors.Description = 'Required';
    if (!values.Link) return errors.Link = 'Required';

    return errors;
}

let PageForm = ({ handleSubmit, ShowError, CreatePage, submitting, pages }) => {
    const createPage = values => {
        pages.forEach(page => {
            if (page.Code === values.Code) {
                ShowError({
                    message: 'Page Code Exists'
                });
                return;
            }
        });

        CreatePage({
            Code: values.Code,
            Description: values.Description,
            Link: values.Link,
            Inactive: values.Inactive
        });
    }

    return (
        <form onSubmit={handleSubmit(createPage)}>
            <Button type="submit" bsStyle="success" className="pull-right" tabIndex="" disabled={submitting}>Create</Button>
            <Button type="reset" bsStyle="default" className="pull-right" tabIndex="" disabled={submitting}>Clear</Button>
            <Row>
                <Field
                    name="Code"
                    label="Code"
                    colWidths={{ sm: 4 }}
                    component={TextboxRender}
                    tabIndex="1"
                    normalize={NormalizeCodeField}
                    autoFocus
                />
            </Row>
            <Row>
                <Field name="Description" label="Description" colWidths={{ sm: 6 }} component={TextboxRender} tabIndex="2" />
            </Row>
            <Row>
                <Field
                    name="Link"
                    label="Link"
                    colWidths={{ sm: 6 }}
                    component={TextboxRender}
                    tabIndex="3"
                    normalize={NormalizeRelativeUrlField}
                />
            </Row>
            <Row>
                <Field name="Inactive" label="Inactive" colWidths={{ sm: 3 }} component={CheckboxRender} tabIndex="4" />
            </Row>
        </form>
    );
}


PageForm = reduxForm({
    form: 'PageForm',
    validate
})(PageForm);

PageForm.displayName = 'Page Form';

PageForm.propTypes = {

}

const mapStateToProps = state => ({
    pages: state.pages.all
});

const mapDispatchToProps = {
    CreatePage,
    ShowError
};

export default connect(mapStateToProps, mapDispatchToProps)(PageForm);

