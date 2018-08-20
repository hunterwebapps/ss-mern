import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

import { ShowError } from '../Modules/Master/Master.actions';

const ErrorModal = ({ error, ShowError }) =>
    <Modal show={error !== null}>
        <Modal.Header>
            {error && error.Description}
        </Modal.Header>
        <Modal.Body>
            {error && error.Details.map((detail, index) =>
                <p key={index}>{detail}</p>
            )}
        </Modal.Body>
        <Modal.Footer>
            <Button bsStyle="success" onClick={() => ShowError(null)}>OK</Button>
        </Modal.Footer>
    </Modal>;

ErrorModal.propTypes = {

}

ErrorModal.displayName = 'Error Modal';

const mapStateToProps = state => ({
    error: state.master.error
});

const mapDispatchToProps = {
    ShowError
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);