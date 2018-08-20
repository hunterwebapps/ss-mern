import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Row, Col } from 'react-bootstrap';
import { NormalizeAddonForm, NormalizeCodeField } from '../../NormalizeObjects';

import { CreateAddon } from '../../Modules/Sprints/Sprints.actions';

import { TextboxRender, CheckboxRender } from '../ReduxFormRender';

const validate = values => {
    const errors = {};

    return errors;
}

let AddonForm = ({ handleSubmit, submitting, addons, CreateAddon }) => {
    const createAddon = values => {
        let addonExists = false;
        addons.forEach(addon => {
            if (addon.Code === values.Code) {
                return false;
            }
        });
        CreateAddon({
            Code: values.Code,
            Description: values.Description,
            Charge: values.Charge,
            PerPackage: values.PerPackage,
            SortOrder: values.SortOrder,
            InternalUseOnly: values.InternalUseOnly,
            Inactive: values.Inactive
        });
    }

    return (
        <form onSubmit={handleSubmit(createAddon)}>
            <Button type="submit" bsStyle="success" className="pull-right" disabled={submitting}>Create</Button>
            <Button type="reset" bsStyle="default" className="pull-right" disabled={submitting}>Clear</Button>
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
                    name="Charge"
                    label="Charge"
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
                    name="PerPackage"
                    label="Per Package"
                    colWidths={{ sm: 3 }}
                    component={CheckboxRender}
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
            <Row>
            // TODO: Add Operating Locations Filters
            </Row>
        </form>
    );
}

AddonForm = reduxForm({
    form: 'AddonForm',
    validate
})(AddonForm);

AddonForm.displayName = 'Addon Form';

AddonForm.propTypes = {

}

const mapStateToProps = state => ({
    addons: state.sprints.addons
});

const mapDispatchToProps = {
    CreateAddon
};

export default connect(mapStateToProps, mapDispatchToProps)(AddonForm);

