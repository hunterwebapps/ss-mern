import React from 'react';
import { Field, FieldArray } from 'redux-form';
import DateTime from 'react-datetime';
import { Table, FormControl, FormGroup, ControlLabel, Col, Checkbox, Button, Row, HelpBlock } from 'react-bootstrap';

export const InputRender = render => ({ input, meta, label, colWidths, helpBlock, ...rest }) =>
    <Col {...colWidths}>
        <FormGroup id={input.name} className={!label && 'no-margin'}>
            {render(input, label, rest)}
            {meta.error && meta.touched &&
                <span className="text-danger">
                    <strong>{meta.error}</strong>
                </span>
            }
            {helpBlock && <HelpBlock>{helpBlock}</HelpBlock>}
        </FormGroup>
    </Col>;

export const TextboxRender = InputRender(
    (input, label, { type, tabIndex, className, autoFocus, labelIcon }) =>
        <React.Fragment>
            {label && <ControlLabel>{labelIcon} {label}</ControlLabel>}
            <FormControl
                type={type || 'text'}
                tabIndex={tabIndex}
                placeholder={label && `${label}...`}
                className={className}
                autoFocus={autoFocus}
                {...input}
            />
        </React.Fragment>
);

export const TextareaRender = InputRender(
    (input, label, { tabIndex, className, autoFocus, labelIcon, rows }) =>
        <React.Fragment>
            {label && <ControlLabel>{labelIcon} {label}</ControlLabel>}
            <FormControl
                componentClass="textarea"
                tabIndex={tabIndex}
                placeholder={label && `${label}...`}
                className={className}
                autoFocus={autoFocus}
                rows={rows}
                {...input}
            />
        </React.Fragment>
);

export const SelectRender = InputRender(
    (input, label, { children, tabIndex, className, autoFocus, options, labelIcon, fields }) =>
        <React.Fragment>
            {label && <ControlLabel>{labelIcon} {label}</ControlLabel>}
            <FormControl
                componentClass="select"
                tabIndex={tabIndex}
                placeholder={`Select a ${label}...`}
                className={className}
                autoFocus={autoFocus}
                {...input}
            >
                {options || children}
            </FormControl>
        </React.Fragment>
);

export const CheckboxRender = InputRender(
    (input, label, { tabIndex, className }) =>
        <Checkbox
            name={input.name}
            tabIndex={tabIndex}
            className={className}
            {...input}
        >
            <strong>{label}</strong>
        </Checkbox>
);

const adaptFileEventToValue = delegate => e => delegate(e.target.files);
export const FileRender = InputRender(
    (
        { value: omitValue, onChange, onBlur, ...input },
        label,
        { accept, className, autoFocus, labelIcon, multiple }) =>
        <React.Fragment>
            {label && <ControlLabel>{labelIcon} {label}</ControlLabel>}
            <FormControl
                type="file"
                accept={accept}
                className={className}
                autoFocus={autoFocus}
                onChange={adaptFileEventToValue(onChange)}
                onBlur={adaptFileEventToValue(onBlur)}
                multiple={multiple}
                {...input}
            />
        </React.Fragment>
);

export const DateTimeRender = InputRender(
    (input, label, { tabIndex, className, defaultValue, dateFormat, timeFormat, timeConstraints, componentProps, labelIcon }) => {
        if (componentProps) {
            return (
                <React.Fragment>
                    {label && <ControlLabel>{labelIcon} {label}</ControlLabel>}
                    <DateTime
                        {...componentProps}
                        {...input}
                    />
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    {label && <ControlLabel>{labelIcon} {label}</ControlLabel>}
                    <DateTime
                        defaultValue={new Date(defaultValue) || new Date()}
                        dateFormat={dateFormat}
                        timeFormat={timeFormat}
                        timeConstraints={timeConstraints}
                        {...input}
                    />
                </React.Fragment>
            )
        }
    }
);

export const InputListRender = ({ fields, meta, headers, colWidths, header }) => {
    if (fields.length === 0) fields.push({});
    return (
        <Col {...colWidths}>
            <Table bordered condensed>
                <thead className="bg-gray">
                    <tr>
                        {headers.map((header, index) =>
                            <th key={index}>{header.label}</th>
                        )}
                        <th width="1%"></th>
                    </tr>
                </thead>
                <tbody>
                    {fields.map((field, index) =>
                        <tr key={index}>
                            {headers.map((header, index) =>
                                <td key={index}>
                                    <Field name={`${field}.${header.name}`} component={header.component} options={header.options} componentProps={header.componentProps} />
                                </td>
                            )}
                            <td>
                                <Button bsStyle="link" onClick={() => fields.remove(index)}>
                                    <i className="fa fa-minus-circle text-danger"></i>
                                </Button>
                            </td>
                        </tr>
                    )}
                </tbody>
                <tfoot className="bg-gray">
                    <tr>
                        <td colSpan={headers.length}></td>
                        <td>
                            <Button bsStyle="link" onClick={() => fields.push({})}>
                                <i className="fa fa-plus-circle text-success"></i>
                            </Button>
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </Col>
    );
}

export const AddressRender = ({ countries, timezones }) =>
    <Row>
        <Field name="FirstName" label="First Name" colWidths={{ sm: 6 }} component={TextboxRender} />
        <Field name="LastName" label="Last Name" colWidths={{ sm: 6 }} component={TextboxRender} />
        <Field name="JobTitle" label="Job Title" colWidths={{ sm: 6 }} component={TextboxRender} />
        <Field name="Company" label="Company" colWidths={{ sm: 6 }} component={TextboxRender} />
        <Field name="Address1" label="Address 1" colWidths={{ xs: 12 }} component={TextboxRender} />
        <Field name="Address2" label="Address 2" colWidths={{ xs: 12 }} component={TextboxRender} />
        <Field name="City" label="City" colWidths={{ sm: 5 }} component={TextboxRender} disabled />
        <Field name="State" label="State" colWidths={{ xs: 5, sm: 3 }} component={TextboxRender} disabled />
        <Field name="PostalCode" label="Postal Code" colWidths={{ xs: 7, sm: 4 }} component={TextboxRender} />
        {countries &&
            <Field name="Country" label="Country" colWidths={{ xs: 5 }} component={SelectRender} disabled>
                <option value="">Select a Country...</option>
                <option value="US">United States</option>
                {countries.map(country =>
                    <option key={country.CountryID} value={country.CountryID}>{country.Name}</option>
                )}
            </Field>
        }
        {timezones &&
            <Field name="Timezone" label="Timezone" colWidths={{ sm: 5 }} component={SelectRender}>
                <option value="">Select a Timezone...</option>
                <option value="GMT+8">GMT+8 Beijing Time</option>
                {timezones.map(zone =>
                    <option key={zone.TimezoneID} value={zone.TimezoneID}>{zone.Description}</option>
                )}
            </Field>
        }
        <FieldArray
            name="PhoneNumbers"
            headers={[
                { name: 'PhoneNumber', label: 'Phone Number', component: TextboxRender },
                { name: 'Type', label: 'Type', component: TextboxRender }
            ]}
            colWidths={{ sm: 6 }}
            component={InputListRender}
        />
        <FieldArray
            name="EmailAddresses"
            headers={[{ name: 'EmailAddress', label: 'Email Address', component: TextboxRender }]}
            colWidths={{ sm: 6 }}
            component={InputListRender}
        />
    </Row>