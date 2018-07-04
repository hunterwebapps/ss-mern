import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tab, Grid, Row, Col, Nav, NavItem, NavDropdown, MenuItem, Well } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import { getOperatingLocations, getPackageTypes, getClients, getPagesWithCreator, getAddons, getUserTypes } from '../Reducers/Main.reducer';
import { ParseSerializedDate } from '../Helpers';

import { GetCountries } from '../Actions/Addresses.actions';

import SetupViews from './Setup/SetupViews';
import OperatingLocationForm from './Setup/OperatingLocation.form';
import PackageTypeForm from './Setup/PackageType.form';
import ClientForm from './Setup/Client.form';
import UserForm from './Setup/User.form';
import UserTypeForm from './Setup/UserType.form';
import PageForm from './Setup/Page.form';
import AddonForm from './Setup/Addons.form';

const IsInactive = ({ yes }) => <i className={'fa ' + (yes ? 'fa-times text-danger' : 'fa-check text-success')}></i>

const Setup = ({ match, operatingLocations, packageTypes, clients, pages, addons, userTypes }) =>
    <Grid>
        <h2>Setup Manager</h2>
        <Tab.Container id="manageSetup" defaultActiveKey="packageTypes">
            <Row className="clearfix">
                <Col xs={3}>
                    <Nav bsStyle="pills" stacked>
                        <NavItem eventKey="operatingLocations">Operating Locations</NavItem>
                        <NavItem eventKey="packageTypes">Package Types</NavItem>
                        <NavDropdown title="Users">
                            <MenuItem eventKey="users">Users</MenuItem>
                            <MenuItem eventKey="userTypes">User Types</MenuItem>
                        </NavDropdown>
                        <NavDropdown title="Sprints">
                            <MenuItem eventKey="promotions">Promotions</MenuItem>
                            <MenuItem eventKey="addons">Addons</MenuItem>
                            <MenuItem eventKey="sprintTags">Tags</MenuItem>
                        </NavDropdown>
                        <NavItem eventKey="clients">Clients</NavItem>
                        <NavItem eventKey="pages">Pages</NavItem>
                    </Nav>
                </Col>
                <Col xs={9}>
                    <Tab.Content animation>
                        <Tab.Pane eventKey="operatingLocations">
                            <SetupViews name="Operating Location" createComponent={OperatingLocationForm}>
                                <tr><th width="1%">ID</th><th>Code</th><th>City</th><th width="1%"></th></tr>
                                {operatingLocations.map(location =>
                                    <tr key={location.OperatingLocationID}>
                                        <td>{location.OperatingLocationID}</td>
                                        <td>{location.Code}</td>
                                        <td>{location.ContactInfo.Address.City}</td>
                                        <td>
                                            <IsInactive yes={location.Inactive} />
                                        </td>
                                    </tr>
                                )}
                            </SetupViews>
                        </Tab.Pane>
                        <Tab.Pane eventKey="packageTypes">
                            <SetupViews name="Package Type" createComponent={PackageTypeForm}>
                                <tr><th width="1%">ID</th><th>Description</th><th>Price</th><th width="1%"></th></tr>
                                {packageTypes.map(type =>
                                    <tr key={type.PackageTypeID}>
                                        <td>{type.PackageTypeID}</td>
                                        <td>{type.Description}</td>
                                        <td>{type.Price}</td>
                                        <td>
                                            <IsInactive yes={type.Inactive} />
                                        </td>
                                    </tr>
                                )}
                            </SetupViews>
                        </Tab.Pane>
                        <Tab.Pane eventKey="users">
                            <SetupViews name="User" createComponent={UserForm}>
                                <tr><th width="1%">ID</th><th>Username</th><th>Full Name</th><th>Created</th><th>Location</th><th width="1%">Inactive</th></tr>
                            </SetupViews>
                        </Tab.Pane>
                        <Tab.Pane eventKey="userTypes">
                            <SetupViews name="User Type" createComponent={UserTypeForm}>
                                <tr><th width="1%">ID</th><th>Description</th><th>Home page</th><th width="1%"></th></tr>
                                {userTypes.map(type =>
                                    <tr key={type.UserTypeID}>
                                        <td>{type.UserTypeID}</td>
                                        <td>{type.Description}</td>
                                        <td>{type.HomePage.Description}</td>
                                        <td>
                                            <IsInactive yes={type.Inactive} />
                                        </td>
                                    </tr>
                                )}
                            </SetupViews>
                        </Tab.Pane>
                        <Tab.Pane eventKey="promotions">

                        </Tab.Pane>
                        <Tab.Pane eventKey="addons">
                            <SetupViews name="Addon" createComponent={AddonForm}>
                                <tr><th width="1%">ID</th><th>Code</th><th>Description</th><th>Charge</th><th width="1%"></th></tr>
                                {addons.map(addon =>
                                    <tr key={addon.AddonID}>
                                        <td>{addon.AddonID}</td>
                                        <td>{addon.Code}</td>
                                        <td>{addon.Description}</td>
                                        <td>{addon.AdditionalCharge}</td>
                                        <td>
                                            <IsInactive yes={addon.Inactive} />
                                        </td>
                                    </tr>
                                )}
                            </SetupViews>
                        </Tab.Pane>
                        <Tab.Pane eventKey="sprintTags">

                        </Tab.Pane>
                        <Tab.Pane eventKey="clients">
                            <SetupViews name="Client" createComponent={ClientForm}>
                                <tr><th width="1%">ID</th><th>Code</th><th>Created</th><th width="1%"></th></tr>
                                {clients.map(client =>
                                    <tr key={client.ClientID}>
                                        <td>{client.ClientID}</td>
                                        <td>{client.Code}</td>
                                        <td>{client.TimeCreated}</td>
                                        <td>
                                            <IsInactive yes={client.Inactive} />
                                        </td>
                                    </tr>
                                )}
                            </SetupViews>
                        </Tab.Pane>
                        <Tab.Pane eventKey="pages">
                            <SetupViews name="Page" createComponent={PageForm}>
                                <tr><th width="1%">ID</th><th>Code</th><th>Description</th><th>Link</th><th>Creator</th><th>Created</th><th width="1%"></th></tr>
                                {pages.map(page =>
                                    <tr key={page.PageID}>
                                        <td>{page.PageID}</td>
                                        <td>{page.Code}</td>
                                        <td>{page.Description}</td>
                                        <td>{page.Link}</td>
                                        <td>{page.Creator.Username}</td>
                                        <td>{page.DateCreated}</td>
                                        <td>
                                            <IsInactive yes={page.Inactive} />
                                        </td>
                                    </tr>
                                )}
                            </SetupViews>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    </Grid>;

Setup.displayName = 'Setup Panel';

Setup.propTypes = {

};

const mapStateToProps = state => ({
    operatingLocations: getOperatingLocations(state),
    packageTypes: getPackageTypes(state),
    clients: getClients(state),
    pages: getPagesWithCreator(state),
    addons: getAddons(state),
    userTypes: getUserTypes(state)
});

const mapDispatchToProps = {
    GetCountries
};

export default connect(mapStateToProps, mapDispatchToProps)(Setup);