import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Row, Col } from 'react-bootstrap';
import { NormalizeAddonForm } from '../../NormalizeObjects';

import { CreateAddon } from '../../Actions/Sprints.actions';

import { TextboxRender, CheckboxRender } from '../ReduxFormRender';

const validate = values => {
    const errors = {};
    
    return errors;
}

let AddonsForm = ({ handleSubmit, submitting, addons, CreateAddon }) => {
    const createAddon = values => {
        let addonExists = false;
        addons.forEach(addon => {
            if (addon.Code === values.Code) {
                return false;
            }
        });
        CreateAddon(NormalizeAddonForm(values));
    }

    return (
        <form onSubmit={handleSubmit(createAddon)}>
            <Button type="submit" bsStyle="success" className="pull-right" disabled={submitting}>Create</Button>
            <Button type="reset" bsStyle="default" className="pull-right" disabled={submitting}>Clear</Button>
            <Row>
                <Field name="Code" label="Code" colWidths={{ sm: 4 }} component={TextboxRender} tabIndex="1" />
            </Row>
            <Row>
                <Field name="Description" label="Description" colWidths={{ sm: 6 }} component={TextboxRender} tabIndex="2" />
            </Row>
            <Row>
                <Field name="AdditionalCharge" label="Additional Charge" colWidths={{ sm: 3 }} component={TextboxRender} tabIndex="3" />
            </Row>
            <Row>
                <Field name="PerPackage" label="Per Package" colWidths={{ sm: 3 }} component={CheckboxRender} tabIndex="4" />
            </Row>
            <Row>
                <Field name="InternalUseOnly" label="Internal Use Only" colWidths={{ sm: 3 }} component={CheckboxRender} tabIndex="5" />
                <Field name="Inactive" label="Inactive" colWidths={{ sm: 2 }} component={CheckboxRender} tabIndex="6" />
            </Row>
            <Row>
                // TODO: Add Operating Locations Filters
            </Row>
        </form>
    );
}

AddonsForm = reduxForm({
    form: 'AddonsForm',
    validate
})(AddonsForm);

AddonsForm.displayName = 'Addons Form';

AddonsForm.propTypes = {
    
}

const mapStateToProps = state => ({
    addons: state.sprints.addons
});

const mapDispatchToProps = {
    CreateAddon
};

export default connect(mapStateToProps, mapDispatchToProps)(AddonsForm);

