import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import IsInactive from '../IsInactive';

const PackageTypeView = ({ packageTypes }) =>
    <Table striped bordered condensed hover responsive>
        <tbody>
            <tr>
                <th>Description</th>
                <th>Price</th>
                <th width="1%"></th>
            </tr>
            {packageTypes.map(type =>
                <tr key={type._id}>
                    <td>{type.Description}</td>
                    <td>{type.Price['$numberDecimal']}</td>
                    <td>
                        <IsInactive yes={type.Inactive} />
                    </td>
                </tr>
            )}
        </tbody>
    </Table>;

PackageTypeView.displayName = 'Package Type View';

PackageTypeView.propTypes = {

};

export default PackageTypeView