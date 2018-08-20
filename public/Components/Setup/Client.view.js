import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import IsInactive from '../IsInactive';

const ClientView = ({ clients }) =>
    <Table striped bordered condensed hover responsive>
        <tbody>
            <tr><th>Code</th><th>Created</th><th width="1%"></th></tr>
            {clients.map(client =>
                <tr key={client._id}>
                    <td>{client.Code}</td>
                    <td>{new Date(client.TimeCreated).toDateString()}</td>
                    <td>
                        <IsInactive yes={client.Inactive} />
                    </td>
                </tr>
            )}
        </tbody>
    </Table>;

ClientView.displayName = 'Client View';

ClientView.propTypes = {
    
};

export default ClientView