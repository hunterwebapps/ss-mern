import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, Table, Button } from 'react-bootstrap';

class InputList extends React.Component {
    constructor() {
        super();
        this.state = {
            values: [[]]
        }
    }

    addInput = () => {
        this.setState(state => ({
            values: [...state.values, []]
        }));
    }
    removeInput = index => () => {
        this.setState(state => ({
            values: state.values.filter((value, i) => index !== i)
        }));
    }
    changeInput = (index, col) => e => {
        e.persist();
        this.setState(state => {
            let values = [...this.state.values];
            values[index][col] = e.target.value;
            this.props.handleChange(values);
            return { values: values };
        });
    }

    render() {
        console.log("Input List Props", this.props)
        let inputs = [];
        for (let i = 0; i < this.state.values.length; i++) {
            let cols = [];
            for (let ii = 0; ii < this.props.headers.length; ii++) {
                cols.push(
                    <td key={`col${ii}`}>
                        <FormControl type="text" value={this.state.values[i][ii] || ''} onChange={this.changeInput(i, ii)} />
                    </td>
                );
            }
            inputs.push(
                <tr key={`row${i}`}>
                    {cols}
                    <td>
                        <Button bsStyle="link" onClick={this.removeInput(i)}>
                            <i className="fa fa-minus-circle text-danger"></i>
                        </Button>
                    </td>
                </tr>
            );
        }
        const header = this.props.headers.map((head, index) => <th key={`head${index}`}>{head}</th>);
        return '';
    }
}

InputList.displayName = 'Input List';

InputList.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    handleChange: PropTypes.func.isRequired,
    bg: PropTypes.string,
    bordered: PropTypes.bool,
    condensed: PropTypes.bool
};

export default InputList;