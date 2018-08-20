import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { TextboxRender, SelectRender, CheckboxRender } from '../ReduxFormRender';
import { Row, Button, PanelGroup, Panel } from 'react-bootstrap';
import { getUserAddresses, getUserAccounts } from '../../Main.reducer';
import { ShowError } from '../../Modules/Master/Master.actions';
import { CreateAccount } from '../../Modules/Users/Users.actions';

const validate = values => {
    const errors = [];

    return errors;
}

let UserAccounts = ({ handleSubmit, CreateAccount, accounts, addresses, ShowError }) => {

    const createUserAccount = values => {
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].AccountNumber === values.AccountNumber) {
                ShowError({
                    message: 'User Account Already Exists',
                    exception: `The Account Number '${values.AccountNumber} already exist...`
                });
                return false;
            }
        }

        CreateAccount({
            AccountLabel: values.AccountLabel,
            PaymentMethod: values.PaymentMethod,
            Address: values.Address,
            AccountNumber: values.AccountNumber,
            CreditLimit: values.CreditLimit,
            Inactive: values.Inactive
        });
    }

    return (
        <PanelGroup id="userAccounts">
            {accounts.map(acct =>
                <Panel key={acct._id}>
                    <Panel.Heading>
                        <Panel.Title toggle>
                            {acct.AccountLabel}
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        {JSON.stringify(acct)}
                    </Panel.Body>
                </Panel>
            )}

            <Panel>
                <Panel.Heading>
                    <Panel.Title toggle>
                        <h5>Add a Charge Account</h5>
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                    <form onSubmit={handleSubmit(createUserAccount)}>
                        <Row>
                            <Field
                                name="AccountLabel"
                                label="Account Label"
                                colWidths={{ sm: 4 }}
                                component={TextboxRender}
                                autoFocus
                            />
                        </Row>
                        <Row>
                            <Field
                                name="PaymentMethod"
                                label="Payment Method"
                                colWidths={{ sm: 4 }}
                                component={SelectRender}
                            >
                                <option value="">Select a Payment Method...</option>
                                <option value="ChargeAccount">Charge Account</option>
                            </Field>
                        </Row>
                        <Row>
                            <Field
                                name="Address"
                                label="Address"
                                colWidths={{ sm: 6 }}
                                component={SelectRender}
                            >
                                <option value="">Select an Account Address...</option>
                                {addresses.map(addr =>
                                    <option key={addr._id} value={addr._id}>
                                        {`${addr.Address1}, ${addr.Address2}, ${addr.City}, ${addr.State} ${addr.PostalCode}`}
                                    </option>
                                )}
                            </Field>
                        </Row>
                        <Row>
                            <Field
                                name="AccountNumber"
                                label="Account Number"
                                colWidths={{ sm: 4 }}
                                component={TextboxRender}
                            />
                        </Row>
                        <Row>
                            <Field
                                name="CreditLimit"
                                label="Credit Limit"
                                colWidths={{ sm: 4 }}
                                component={TextboxRender}
                            />
                        </Row>
                        <Row>
                            <Field
                                name="Inactive"
                                label="Inactive"
                                colWidths={{ sm: 3 }}
                                component={CheckboxRender}
                            />
                        </Row>
                        <Row>
                            <Button type="submit" bsStyle="success" className="pull-right">Submit</Button>
                            <Button type="reset" bsStyle="default" className="pull-right">Reset</Button>
                        </Row>
                    </form>
                </Panel.Body>
            </Panel>
        </PanelGroup>
    );
}

UserAccounts = reduxForm({
    form: 'UserAccounts',
    validate
})(UserAccounts);

UserAccounts.displayName = 'User Accounts';

UserAccounts.propTypes = {

};

const mapStateToProps = state => ({
    accounts: getUserAccounts(state),
    addresses: getUserAddresses(state)
});

const mapDispatchToProps = {
    CreateAccount,
    ShowError
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccounts);