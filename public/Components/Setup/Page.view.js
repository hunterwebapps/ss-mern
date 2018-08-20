import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import IsInactive from '../IsInactive';

const PageView = ({ pages }) =>
    <Table striped bordered condensed hover responsive>
        <tbody>
            <tr><th>Code</th><th>Description</th><th>Link</th><th>Creator</th><th>Created</th><th width="1%"></th></tr>
            {pages.map(page =>
                <tr key={page._id}>
                    <td>{page.Code}</td>
                    <td>{page.Description}</td>
                    <td>{page.Link}</td>
                    <td>{page.Creator && page.Creator.Username}</td>
                    <td>{new Date(page.TimeCreated).toDateString()}</td>
                    <td>
                        <IsInactive yes={page.Inactive} />
                    </td>
                </tr>
            )}
        </tbody>
    </Table>;

PageView.displayName = 'Page View';

PageView.propTypes = {

};

export default PageView