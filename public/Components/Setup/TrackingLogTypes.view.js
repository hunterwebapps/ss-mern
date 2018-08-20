import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import IsInactive from '../IsInactive';

const TrackingLogTypesView = ({ trackingLogTypes }) =>
    <Table striped bordered condensed hover responsive>
        <tbody>
            <tr>
                <th>Code</th>
                <th>Description</th>
                <th width="1%">Multiple</th>
                <th width="1%"></th>
            </tr>
            {trackingLogTypes.map(type =>
                <tr key={type._id}>
                    <td>{type.Code}</td>
                    <td>{type.Description}</td>
                    <td className="text-center">
                        <IsInactive yes={!type.AllowMultiple} />
                    </td>
                    <td>
                        <IsInactive yes={type.Inactive} />
                    </td>
                </tr>
            )}
        </tbody>
    </Table>;

TrackingLogTypesView.displayName = 'Tracking Log Types View';

TrackingLogTypesView.propTypes = {

};

export default TrackingLogTypesView;