import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Grid, Row, Col, Nav, NavItem, Well } from 'react-bootstrap';

import ImportSprints from './ImportSprints';

const Manage = () =>
    <Grid>
        <h2>Manage Your Account</h2>
        <Tab.Container id="manageAccount" defaultActiveKey="import_csv">
            <Row className="clearfix">
                <Col sm={4}>
                    <Nav bsStyle="pills" stacked>
                        <NavItem eventKey="overview">Overview</NavItem>
                        <NavItem eventKey="import_csv">Import CSV</NavItem>
                        <NavItem eventKey="create_one">Create Sprint</NavItem>
                        <NavItem eventKey="settings">Settings</NavItem>
                    </Nav>
                </Col>
                <Col sm={8}>
                    <Tab.Content animation>
                        <Tab.Pane eventKey="overview">

                        </Tab.Pane>
                        <Tab.Pane eventKey="import_csv">
                            <Well>
                                <ImportSprints />
                            </Well>
                        </Tab.Pane>
                        <Tab.Pane eventKey="create_one">

                        </Tab.Pane>
                        <Tab.Pane eventKey="settings">

                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    </Grid>;

Manage.displayName = 'Manage Sprints';

export default Manage;