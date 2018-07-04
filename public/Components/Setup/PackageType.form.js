import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Row, Col } from 'react-bootstrap';
import { NormalizePackageTypeForm } from '../../NormalizeObjects';

import { ShowError } from '../../Actions/Master.actions';
import { CreatePackageType } from '../../Actions/Packages.actions';

import { TextboxRender, CheckboxRender } from '../ReduxFormRender';

const validate = values => {
    const errors = {};

    if (!values.Description) errors.Description = 'Required';
    if (values.Description && values.Description.length > 100) errors.Description = 'Max 100 Characters';
    if (!values.Price) errors.Price = 'Required';
    if (!values.SortOrder) errors.SortOrder = 'Required';

    return errors;
}

let PackageTypeForm = ({ handleSubmit, CreatePackageType, packageTypes, ShowError }) => {
    const createPackageType = values => {
        let packageTypeExists = false;
        packageTypes.forEach(type => {
            if (type.Description === values.Description) {
                ShowError({ message: 'Package Type Exists', exception: `The package type '${type.Description}' already exists`});
                return false;
            }
        });
        CreatePackageType(
            NormalizePackageTypeForm(values)
        );
    }

    return (
        <form onSubmit={handleSubmit(createPackageType)}>
            <Button type="submit" bsStyle="success" className="pull-right">Create</Button>
            <Button type="reset" bsStyle="default" className="pull-right">Clear</Button>
            <Row>
                <Field
                    name="Description"
                    label="Description"
                    colWidths={{ sm: 6 }}
                    component={TextboxRender}
                    autoFocus
                />
            </Row>
            <Row>
                <Field
                    name="Price"
                    label="Price"
                    colWidths={{ sm: 3 }}
                    component={TextboxRender}
                />
            </Row>
            <Row>
                <Field
                    name="SortOrder"
                    label="Sort Order"
                    colWidths={{ sm: 3 }}
                    component={TextboxRender}
                />
            </Row>
            <Row>
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

PackageTypeForm = reduxForm({
    form: 'PackageTypeForm',
    validate
})(PackageTypeForm);

PackageTypeForm.displayName = 'Package Type Form';

PackageTypeForm.propTypes = {

};

const mapStateToProps = state => ({
    packageTypes: state.packages.types
});

const mapDispatchToProps = {
    CreatePackageType,
    ShowError
};

export default connect(mapStateToProps, mapDispatchToProps)(PackageTypeForm);