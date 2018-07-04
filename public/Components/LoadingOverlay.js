import React from 'react';
import PropTypes from 'prop-types';

const loadingOverlay = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    opacity: '0.6',
    zIndex: 5000
};

const loadingIcon = {
    position: 'fixed',
    top: '50%',
    left: '50%'
};

const LoadingOverlay = ({ show }) =>
    <React.Fragment>
        {show &&
            <div style={loadingOverlay}>
                <i className="fa fa-sync fa-spin fa-3x" style={loadingIcon}></i>
            </div>
        }
    </React.Fragment>

LoadingOverlay.propTypes = {
    show: PropTypes.bool.isRequired
}

LoadingOverlay.displayName = 'Loading Overlay';

export default LoadingOverlay;

