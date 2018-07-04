import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem, Image, Grid, Row, Col } from 'react-bootstrap';

import { Initialize } from '../Actions/Master.actions';
import { Logout } from '../Actions/Users.actions';

import Home from './Home';
import Manage from './Manage';
import Login from './Login';
import ErrorModal from './ErrorModal';

class MasterUsers extends React.Component {
    componentWillMount() {
        this.props.Initialize('User');
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
                            <NavItem eventKey={1} componentClass={Link} href="/" to="/">
                                Home
                    </NavItem>
                            <NavItem eventKey={2} componentClass={Link} href="/User/Manager" to="/User/Manager">
                                My Account
                    </NavItem>
                            {this.props.user === null ?
                                <NavItem eventKey={4} componentClass={Link} href="/User/Login" to="/User/Login">
                                    Login
                                </NavItem>
                                :
                                <React.Fragment>
                                    <NavItem eventKey={5} componentClass={Link}
                                        href={'/User/Profile/' + this.props.user.Username}
                                        to={'/User/Profile/' + this.props.user.Username}>
                                        {this.props.user.Username}
                                    </NavItem>
                                    <NavItem eventKey={5} componentClass={Link} href="/" to="/" onClick={Logout}>
                                        Logout
                                    </NavItem>
                                </React.Fragment>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div id="navbar-spacer" style={{ height: '50px' }}></div>

                <Route exact path="/" component={Home} />
                <Route path="/User/Login" component={Login} />
                <Route path="/User/Manager" component={Manage} />
                <Route path="/User/Manager/Profile" component={Manage} />

                <ErrorModal />
            </React.Fragment>
        );
    }
}

MasterUsers.propTypes = {

}

MasterUsers.displayName = 'Master Page - Users';

const mapStateToProps = state => ({
    user: state.users.current
});

const mapDispatchToProps = {
    Logout,
    Initialize
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MasterUsers));