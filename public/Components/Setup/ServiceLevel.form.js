import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Button } from 'react-bootstrap';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { TextboxRender, DateTimeRender, CheckboxRender } from '../ReduxFormRender';

import { CreateServiceLevel } from '../../Modules/Sprints/Sprints.actions';
import { ShowError } from '../../Modules/Master/Master.actions';

import { NormalizeCodeField, NormalizeDecimalField, NormalizeIntField } from '../../NormalizeObjects';

const validate = values => {
    const errors = [];

    if (!values.Code) errors.Code = 'Required';
    if (!values.Description) errors.Description = 'Required';
    if (values.Description && values.Description > 100) errors.Description = 'Max 100 Characters';
    if (!values.ServiceWindowHours) errors.ServiceWindowHours = 'Required';

    return errors;
}

let ServiceLevelForm = ({ handleSubmit, CreateServiceLevel, serviceLevels }) => {
    const createServiceLevel = values => {
        for (let i = 0; i < serviceLevels.length; i++) {
            const level = serviceLevels[i];

            if (level.Code === values.Code) {
                ShowError({
                    message: 'Service Level Exists',
                    exception: `The CODE '${values.Code}' already exists...`
                });
                return false;
            }

            if (level.Description === values.Description) {
                ShowError({
                    message: 'Service Level Exists',
                    exception: `The Description '${values.Description}' already exists...`
                });
                return false;
            }
        }

        CreateServiceLevel({
            Code: values.Code,
            Description: values.Description,
            ServiceWindowHours: values.ServiceWindowHours,
            SortOrder: values.SortOrder,
            InternalUseOnly: values.InternalUseOnly,
            Inactive: values.Inactive
        });
    }

    return (
        <form onSubmit={handleSubmit(createServiceLevel)}>
            <Button type="submit" bsStyle="success" className="pull-right">Submit</Button>
            <Button type="reset" bsStyle="default" className="pull-right">Reset</Button>
            <Row>
                <Field
                    name="Code"
                    label="Code"
                    colWidths={{ sm: 4 }}
                    component={TextboxRender}
                    normalize={NormalizeCodeField}
                    autoFocus
                />
            </Row>
            <Row>
                <Field
                    name="Description"
                    label="Description"
                    colWidths={{ sm: 5 }}
                    component={TextboxRender}
                />
            </Row>
            <Row>
                <Field
                    name="ServiceWindowHours"
                    label="Service Window (Hours)"
                    colWidths={{ sm: 3 }}
                    component={TextboxRender}
                    normalize={NormalizeDecimalField(1)}
                />
            </Row>
            <Row>
                <Field
                    name="SortOrder"
                    label="Sort Order"
                    colWidths={{ sm: 3 }}
                    component={TextboxRender}
                    normalize={NormalizeIntField}
                />
            </Row>
            <Row>
                <Field
                    name="InternalUseOnly"
                    label="Internal Use Only"
                    colWidths={{ xs: 7, sm: 3 }}
                    component={CheckboxRender}
                />
                <Field
                    name="Inactive"
                    label="Inactive"
                    colWidths={{ xs: 5, sm: 2 }}
                    component={CheckboxRender}
                />
            </Row>
        </form>
    );
}

ServiceLevelForm = reduxForm({
    form: 'ServiceLevelForm',
    validate
})(ServiceLevelForm);

ServiceLevelForm.displayName = 'Service Level Form';

ServiceLevelForm.propTypes = {

};

const mapStateToProps = state => ({
    serviceLevels: state.sprints.serviceLevels
});

const mapDispatchToProps = {
    CreateServiceLevel,
    ShowError
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceLevelForm);