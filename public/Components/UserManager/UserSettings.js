import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { Grid, Tabs, Tab, PanelGroup, Panel, Button, Row, Col } from 'react-bootstrap';
import UserAccounts from './UserAccounts';
import UserAddresses from './UserAddresses';
import { getUserAddresses } from '../../Main.reducer';

const UserSettings = ({ }) => {

    return (
        <Tabs id="userSettings" defaultActiveKey="Accounts">
            <Tab eventKey="Accounts" title="Accounts">
                <div id="spacer-5px" style={{ height: '5px' }}></div>
                <UserAccounts />
            </Tab>
            <Tab eventKey="Addresses" title="Addresses">
                <div id="spacer-5px" style={{ height: '5px' }}></div>
                <UserAddresses />
            </Tab>
        </Tabs>
    );
}

UserSettings.displayName = 'User Settings';

UserSettings.propTypes = {

};

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);