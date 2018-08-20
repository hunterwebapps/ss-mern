import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Row, Button } from 'react-bootstrap';
import { CreateTrackingLogType } from '../../Modules/Packages/Packages.actions';
import { TextboxRender, CheckboxRender } from '../ReduxFormRender';
import { NormalizeCodeField, NormalizeIntField } from '../../NormalizeObjects';
import { ShowError } from '../../Modules/Master/Master.actions';

const validate = values => {
    const errors = [];

    if (!values.Code) errors.Code = 'Required';
    if (!values.Description) errors.Description = 'Required';
    if (values.SortOrder == null) errors.SortOrder = 'Required';

    return errors;
}

let TrackingLogTypesForm = ({ handleSubmit, CreateTrackingLogType, trackingLogTypes }) => {
    const createTrackingLogType = values => {
        for (var i = 0; i < trackingLogTypes.length; i++) {
            if (trackingLogTypes[i].Code === values.Code ||
                trackingLogTypes[i].Description === values.Description) {
                ShowError({
                    message: 'Tracking Log Type Exists',
                    exception: `Tracking Log Type '${values.Code} - ${values.Description}' Already Exists`
                });
                return;
            }
        }

        CreateTrackingLogType({
            Code: values.Code,
            Description: values.Description,
            SortOrder: values.SortOrder,
            AllowMultiple: values.AllowMultiple,
            InternalUseOnly: values.InternalUseOnly,
            Inactive: values.Inactive
        });
    }

    return (
        <form onSubmit={handleSubmit(createTrackingLogType)}>
            <Button type="submit" bsStyle="success" className="pull-right">Create</Button>
            <Button type="reset" bsStyle="default" className="pull-right">Clear</Button>
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
                    colWidths={{ sm: 6 }}
                    component={TextboxRender}
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
                    name="AllowMultiple"
                    label="Allow Multiple"
                    colWidths={{ sm: 2 }}
                    component={CheckboxRender}
                />
                <Field
                    name="InternalUseOnly"
                    label="Internal Use Only"
                    colWidths={{ sm: 3 }}
                    component={CheckboxRender}
                />
                <Field
                    name="Inactive"
                    label="Inactive"
                    colWidths={{ sm: 2 }}
                    component={CheckboxRender}
                />
            </Row>
        </form>
    );
}

TrackingLogTypesForm = reduxForm({
    form: 'TrackingLogTypesForm',
    validate
})(TrackingLogTypesForm);

TrackingLogTypesForm.displayName = 'Tracking Log Types Form';

TrackingLogTypesForm.propTypes = {

};

const mapStateToProps = state => ({
    trackingLogTypes: state.packages.trackingLogTypes
});

const mapDispatchToProps = {
    CreateTrackingLogType
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackingLogTypesForm);