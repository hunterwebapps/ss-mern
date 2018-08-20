import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Tab, Grid, Row, Col, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { getOperatingLocations, getPackageTypes, getClients, getPagesWithCreator, getAddons, getUserTypes, getUsersWithAddress } from '../Main.reducer';

import OperatingLocationForm from './Setup/OperatingLocation.form';
import OperatingLocationView from './Setup/OperatingLocation.view';

import PackageTypeForm from './Setup/PackageType.form';
import PackageTypeView from './Setup/PackageType.view';

import ClientForm from './Setup/Client.form';
import ClientView from './Setup/Client.view';

import UserForm from './Setup/User.form';
import UserView from './Setup/User.view';

import UserTypeForm from './Setup/UserType.form';
import UserTypeView from './Setup/UserType.view';

import PageForm from './Setup/Page.form';
import PageView from './Setup/Page.view';

import AddonForm from './Setup/Addon.form';
import AddonView from './Setup/Addon.view';

import ServiceLevelForm from './Setup/ServiceLevel.form';
import ServiceLevelView from './Setup/ServiceLevel.view';

import TrackingLogTypesForm from './Setup/TrackingLogTypes.form';
import TrackingLogTypesView from './Setup/TrackingLogTypes.view';

const Setup = ({
    match,
    history,
    operatingLocations,
    packageTypes,
    clients,
    pages,
    addons,
    users,
    userTypes,
    serviceLevels,
    trackingLogTypes
}) => {
    const changeTab = key => {
        history.push(`/ControlTower/Setup/${key}`);
    }
    const showForm = id => e => {
        const url = match.url.trimEnd('/');
        id ?
            history.push(`${url}/Edit/${id}`)
            :
            history.push(`${url}/Create`);
    }
    const activeKey = match.params.item || 'OperatingLocations';
    return (
        <Grid>
            <h2>Setup Manager</h2>
            <Tab.Container
                id="manageSetup"
                activeKey={activeKey}
                onSelect={changeTab}
            >
                <Row className="clearfix">
                    <Col xs={3}>
                        <Nav bsStyle="pills" stacked>
                            <NavItem eventKey="OperatingLocations">
                                {'Operating Locations'}
                            </NavItem>
                            <NavDropdown title="Packages">
                                <MenuItem eventKey="PackageTypes">
                                    {'Package Types'}
                                </MenuItem>
                                <MenuItem eventKey="TrackingLogTypes">
                                    {'Tracking Log Types'}
                                </MenuItem>
                            </NavDropdown>
                            <NavDropdown title="Users">
                                <MenuItem eventKey="Users">
                                    {'Users'}
                                </MenuItem>
                                <MenuItem eventKey="UserTypes">
                                    {'User Types'}
                                </MenuItem>
                            </NavDropdown>
                            <NavDropdown title="Sprints">
                                <MenuItem eventKey="Promotions">
                                    {'Promotions'}
                                </MenuItem>
                                <MenuItem eventKey="Addons">
                                    {'Addons'}
                                </MenuItem>
                                <MenuItem eventKey="SprintTags">
                                    {'Tags'}
                                </MenuItem>
                            </NavDropdown>
                            <NavItem eventKey="Clients">
                                {'Clients'}
                            </NavItem>
                            <NavItem eventKey="Pages">
                                {'Pages'}
                            </NavItem>
                            <NavItem eventKey="ServiceLevels">
                                {'Service Levels'}
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col xs={9}>
                        <Tab.Content animation>
                            {match.params.view === undefined ?
                                <Button onClick={showForm(null)} bsStyle="success">Create</Button>
                                :
                                <Button onClick={history.goBack} bsStyle="link"><i className="fa fa-arrow-left"></i> Go Back</Button>
                            }
                            <Tab.Pane eventKey="OperatingLocations">
                                {activeKey === 'OperatingLocations' &&
                                    (match.params.view === undefined ?
                                        <OperatingLocationView operatingLocations={operatingLocations} />
                                        :
                                        <OperatingLocationForm id={match.params.id} />
                                    )
                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey="PackageTypes">
                                {activeKey === 'PackageTypes' &&
                                    (match.params.view === undefined ?
                                        <PackageTypeView packageTypes={packageTypes} />
                                        :
                                        <PackageTypeForm id={match.params.id} />
                                    )
                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey="TrackingLogTypes">
                                {activeKey === 'TrackingLogTypes' &&
                                    (match.params.view === undefined ?
                                        <TrackingLogTypesView trackingLogTypes={trackingLogTypes} />
                                        :
                                        <TrackingLogTypesForm id={match.params.id} />
                                    )
                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey="Users">
                                {activeKey === 'Users' &&
                                    (match.params.view === undefined ?
                                        <UserView users={users} match={match} history={history} />
                                        :
                                        <UserForm id={match.params.id} />
                                    )
                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey="UserTypes">
                                {activeKey === 'UserTypes' &&
                                    (match.params.view === undefined ?
                                        <UserTypeView userTypes={userTypes} />
                                        :
                                        <UserTypeForm id={match.params.id} />
                                    )
                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey="Promotions">

                            </Tab.Pane>
                            <Tab.Pane eventKey="Addons">
                                {activeKey === 'Addons' &&
                                    (match.params.view === undefined ?
                                        <AddonView addons={addons} />
                                        :
                                        <AddonForm id={match.params.id} />
                                    )
                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey="SprintTags">
                                {activeKey === 'SprintTags' &&
                                    (match.params.view === undefined ?
                                        ''
                                        :
                                        ''
                                    )
                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey="Clients">
                                {activeKey === 'Clients' &&
                                    (match.params.view === undefined ?
                                        <ClientView clients={clients} />
                                        :
                                        <ClientForm id={match.params.id} />
                                    )
                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey="Pages">
                                {activeKey === 'Pages' &&
                                    (match.params.view === undefined ?
                                        <PageView pages={pages} />
                                        :
                                        <PageForm id={match.params.id} />
                                    )
                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey="ServiceLevels">
                                {activeKey === 'ServiceLevels' &&
                                    (match.params.view === undefined ?
                                        <ServiceLevelView serviceLevels={serviceLevels} match={match} />
                                        :
                                        <ServiceLevelForm id={match.params.id} />
                                    )
                                }
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Grid>
    );
}

Setup.displayName = 'Setup Panel';

Setup.propTypes = {

};

const mapStateToProps = state => ({
    operatingLocations: getOperatingLocations(state),
    packageTypes: state.packages.types,
    trackingLogTypes: state.packages.trackingLogTypes,
    clients: state.clients.all,
    pages: getPagesWithCreator(state),
    addons: state.sprints.addons,
    userTypes: state.users.types,
    users: getUsersWithAddress(state),
    serviceLevels: state.sprints.serviceLevels
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Setup);