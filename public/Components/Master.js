import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem, Image, Grid, Row, Col } from 'react-bootstrap';

import { Initialize } from '../Modules/Master/Master.actions';
import { Logout } from '../Modules/Users/Users.actions';

import Home from './Home';
import Login from './Login';
import Manage from './Manage';
import Setup from './Setup';
import ErrorModal from './ErrorModal';
import LoadingOverlay from './LoadingOverlay';

class Master extends React.Component {
    componentWillMount() {
        this.props.Initialize();
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
                                {'Home'}
                            </NavItem>

                            {this.props.user && (this.props.user.Administrator || this.props.user.Superuser) &&
                                <React.Fragment>
                                    <NavItem eventKey={2} componentClass={Link} href="/ControlTower" to="/ControlTower">
                                        {'Control Tower'}
                                    </NavItem>
                                    <NavItem eventKey={3} componentClass={Link} href="/ControlTower/Setup" to="/ControlTower/Setup">
                                        {'Setup'}
                                    </NavItem>
                                </React.Fragment>
                            }

                            {this.props.user ?
                                <React.Fragment>
                                    <NavItem
                                        eventKey={2}
                                        componentClass={Link}
                                        href="/User/Manager/Overview"
                                        to="/User/Manager/Overview"
                                    >
                                        {'My Account'}
                                    </NavItem>
                                    <NavItem eventKey={3} componentClass={Link}
                                        href={'/User/Profile/' + this.props.user.Username}
                                        to={'/User/Profile/' + this.props.user.Username}>
                                        {this.props.user.Username}
                                    </NavItem>
                                    <NavItem eventKey={7} componentClass={Link} href="/" to="/" onClick={this.props.Logout}>
                                        {'Logout'}
                                    </NavItem>
                                </React.Fragment>
                                :
                                <NavItem eventKey={7} componentClass={Link} href="/User/Login" to="/User/Login">
                                    {'Login'}
                                </NavItem>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div id="navbar-spacer" style={{ height: '50px' }}></div>

                <Route exact path="/" component={Home} />
                <Route path="/User/Login" component={Login} />
                <Route path="/User/Manager/:item" component={Manage} />
                <Route exact path="/ControlTower" component={Home} />
                <Route path="/ControlTower/Setup/:item?/:view?/:id?" component={Setup} />

                <ErrorModal />
                <LoadingOverlay show={this.props.loading} />
            </React.Fragment>
        );
    }
}

Master.propTypes = {

}

Master.displayName = 'Master Page';

const mapStateToProps = state => ({
    user: state.users.current,
    loading: state.master.loading
});

const mapDispatchToProps = {
    Logout,
    Initialize
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Master));