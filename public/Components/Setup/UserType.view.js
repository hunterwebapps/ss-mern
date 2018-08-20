import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import IsInactive from '../IsInactive';

const UserTypeView = ({ userTypes }) =>
    <Table striped bordered condensed hover responsive>
        <tbody>
            <tr><th width="1%">ID</th><th>Description</th><th>Home page</th><th width="1%"></th></tr>
            {userTypes.map(type =>
                <tr key={type.UserTypeID}>
                    <td>{type.UserTypeID}</td>
                    <td>{type.Description}</td>
                    <td>{type.HomePage.Description}</td>
                    <td>
                        <IsInactive yes={type.Inactive} />
                    </td>
                </tr>
            )}
        </tbody>
    </Table>;

UserTypeView.displayName = 'User Type View';

UserTypeView.propTypes = {

};

export default UserTypeView