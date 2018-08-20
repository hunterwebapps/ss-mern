import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import IsInactive from '../IsInactive';

const OperatingLocationView = ({ operatingLocations }) =>
    <Table striped bordered condensed hover responsive>
        <tbody>
            <tr>
                <th>Code</th>
                <th>Company</th>
                <th>City</th>
                <th>Created</th>
                <th width="1%"></th>
            </tr>
            {operatingLocations.map(location =>
                <tr key={location._id}>
                    <td>{location.Code}</td>
                    <td>{location.Contact.Company}</td>
                    <td>{location.Contact.Address.City}</td>
                    <td>{new Date(location.TimeCreated).toDateString()}</td>
                    <td>
                        <IsInactive yes={location.Inactive} />
                    </td>
                </tr>
            )}
        </tbody>
    </Table>;

OperatingLocationView.displayName = 'Operating Location View';

OperatingLocationView.propTypes = {

};

export default OperatingLocationView