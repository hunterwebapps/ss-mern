import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Grid, Row, Col, Nav, NavItem, Well } from 'react-bootstrap';

import ImportSprints from './UserManager/ImportSprints';
import UserSettings from './UserManager/UserSettings';

const Manage = ({ match, history }) => {

    const changeTab = key => {
        history.push(`/User/Manager/${key}`)
    }

    const activeKey = match.params.item;

    return (
        <Grid>
            <h2>Manage Your Account</h2>
            <Tab.Container
                id="manageAccount"
                activeKey={activeKey}
                onSelect={changeTab}
            >
                <Row className="clearfix">
                    <Col sm={4}>
                        <Nav bsStyle="pills" stacked>
                            <NavItem eventKey="Overview">Overview</NavItem>
                            <NavItem eventKey="ImportCSV">Import CSV</NavItem>
                            <NavItem eventKey="CreateSprint">Create Sprint</NavItem>
                            <NavItem eventKey="Settings">Settings</NavItem>
                        </Nav>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="Overview">
                                {'Overview'}
                            </Tab.Pane>
                            <Tab.Pane eventKey="ImportCSV">
                                <Well>
                                    <ImportSprints />
                                </Well>
                            </Tab.Pane>
                            <Tab.Pane eventKey="CreateSprint">
                                {'CreateSprint'}
                            </Tab.Pane>
                            <Tab.Pane eventKey="Settings">
                                <UserSettings />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Grid>
    );
}

Manage.displayName = 'Manage Sprints';

export default Manage;