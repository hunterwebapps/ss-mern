import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import IsInactive from '../IsInactive';

const ServiceLevelView = ({ serviceLevels }) =>
    <Table striped bordered condensed hover responsive>
        <tbody>
            <tr>
                <th>Code</th>
                <th>Description</th>
                <th>Hours</th>
                <th width="1%"></th>
            </tr>
            {serviceLevels.map(level =>
                <tr key={level._id}>
                    <td>{level.Code}</td>
                    <td>{level.Description}</td>
                    <td>{level.ServiceWindowHours['$decimalNumber']}</td>
                    <td>
                        <IsInactive yes={level.Inactive} />
                    </td>
                </tr>
            )}
        </tbody>
    </Table>;

ServiceLevelView.displayName = 'Service Level View';

ServiceLevelView.propTypes = {

};

export default ServiceLevelView;