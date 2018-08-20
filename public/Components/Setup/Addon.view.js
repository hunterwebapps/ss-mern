import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import IsInactive from '../IsInactive';

const AddonView = ({ addons }) =>
    <Table striped bordered condensed hover responsive>
        <tbody>
            <tr><th>Code</th><th>Description</th><th>Charge</th><th width="1%"></th></tr>
            {addons.map(addon =>
                <tr key={addon._id}>
                    <td>{addon.Code}</td>
                    <td>{addon.Description}</td>
                    <td>{addon.Charge['$numberDecimal']}</td>
                    <td>
                        <IsInactive yes={addon.Inactive} />
                    </td>
                </tr>
            )}
        </tbody>
    </Table>;

AddonView.displayName = 'Addon View';

AddonView.propTypes = {

};

export default AddonView