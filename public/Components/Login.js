import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Login = ({ }) =>
    <Row>
        <Col sm={4} smOffset={4}>
            <LoginForm />
            <RegisterForm />
        </Col>
    </Row>;

Login.displayName = 'Login/Register Form';

Login.propTypes = {

};

export default Login;