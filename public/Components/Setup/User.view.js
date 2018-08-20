import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import IsInactive from '../IsInactive';

const UserView = ({ users, match, history }) => {
    const showUser = userId => e => {
        const url = match.url.trimEnd('/');
        history.push(`${url}/Edit/${userId}`);
    }

    return (
        <Table striped bordered condensed hover responsive>
            <tbody>
                <tr>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th>Created</th>
                    <th width="1%">Inactive</th>
                </tr>
                {users.map(user =>
                    <tr key={user._id} onClick={showUser(user._id)}>
                        <td>{user.Username}</td>
                        <td>{user.Contact && `${user.Contact.FirstName} ${user.Contact.LastName}`}</td>
                        <td>{new Date(user.TimeCreated).toDateString()}</td>
                        <td>
                            <IsInactive yes={user.Inactive} />
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}

UserView.displayName = 'User View';

UserView.propTypes = {

};

export default UserView