import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem, Image, Grid, Row, Col } from 'react-bootstrap';

import { Initialize } from '../Actions/Master.actions';
import { Logout } from '../Actions/Users.actions';

import Home from './Home';
import Setup from './Setup';
import ErrorModal from './ErrorModal';
import LoadingOverlay from './LoadingOverlay';

class MasterManagers extends React.Component {
    componentWillMount() {
        this.props.Initialize('Manager');
    }

    render() {
        return (
            <React.Fragment>
                <Navbar fixedTop inverse collapseOnSelect>
                    <Navbar.Header>
                        <Link to="/">
                            <Image src="/Static/Images/ss_logo_50x216.png" responsive />
                        </Link>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem eventKey={1} componentClass={Link} href="/ControlTower" to="/ControlTower">
                                Home
                    </NavItem>
                            <NavItem eventKey={3} componentClass={Link} href="/ControlTower/Setup" to="/ControlTower/Setup">
                                Management
                    </NavItem>
                            {this.props.user !== null &&
                                <React.Fragment>
                                    <NavItem eventKey={5} componentClass={Link}
                                        href={'/ControlTower/Setup/Users/' + this.props.user.Username}
                                        to={'/ControlTower/Setup/Users/' + this.props.user.Username}>
                                        {this.props.user.Username}
                                    </NavItem>
                                    <NavItem eventKey={5} href="/" onClick={this.props.Logout}>
                                        Logout
                                    </NavItem>
                                </React.Fragment>}

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div id="navbar-spacer" style={{ height: '50px' }}></div>

                <Route exact path="/ControlTower" component={Home} />
                <Route path="/ControlTower/Setup" component={Setup} />

                <ErrorModal />
                <LoadingOverlay show={this.props.loading} />
            </React.Fragment>
        );
    }
}

MasterManagers.propTypes = {

}

MasterManagers.displayName = 'Master Page - Managers';

const mapStateToProps = state => ({
    user: state.users.current,
    loading: state.master.loading
});

const mapDispatchToProps = {
    Logout,
    Initialize
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MasterManagers));