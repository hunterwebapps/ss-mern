import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Form, FormControl, FormGroup, ControlLabel, Row, Col } from 'react-bootstrap';

const VIEW_LIST = 'VIEW_LIST',
    VIEW_CREATE = 'VIEW_CREATE',
    VIEW_SPECIFIC = 'VIEW_SPECIFIC';

class SetupViews extends React.Component {
    constructor() {
        super();
        this.state = {
            view: VIEW_LIST
        }
    }

    updateView = view => () => {
        this.setState({ view: view });
    }

    render() {
        const CreateForm = this.props.createComponent;
        return (
            <React.Fragment>
                {this.state.view === VIEW_LIST ?
                    <React.Fragment>
                        <h2>{this.props.name}s</h2>
                        <Button onClick={this.updateView(VIEW_CREATE)} bsStyle="success" className="pull-right">Create {this.props.name}</Button>
                        <Row>
                            <Col xs={12}>
                                <Table striped bordered condensed hover responsive>
                                    <tbody>
                                        {this.props.children}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </React.Fragment>
                    :
                    <Button onClick={this.updateView(VIEW_LIST)} bsStyle="link"><i className="fa fa-arrow-left"></i> Go Back</Button>
                }

                {this.state.view === VIEW_CREATE ? <CreateForm /> : ''}

                {this.state.view === VIEW_SPECIFIC ? '' : ''}
            </React.Fragment>
        );
    }
}

SetupViews.displayName = 'Setup Views';

SetupViews.propTypes = {
    createComponent: function (props, propName) {
        if (typeof (props[propName]) != 'function') {
            return new Error(`createComponent Must Be a React Component`);
        }
    },
    name: PropTypes.string.isRequired
};

export default SetupViews;