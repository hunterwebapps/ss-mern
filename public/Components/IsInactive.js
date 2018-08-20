import React from 'react';
import PropTypes from 'prop-types';

const IsInactive = ({ yes }) => <i className={'fa ' + (yes ? 'fa-times text-danger' : 'fa-check text-success')}></i>

IsInactive.displayName = 'Is Inactive';

IsInactive.propTypes = {

};

export default IsInactive