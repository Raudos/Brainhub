import React from 'react';
import DatePicker from 'react-datepicker';
const R = require('ramda');
import PropTypes from 'prop-types';

// Components
import Renderer from "./PureComponentRenderer";
import FormError from "./FormError";

const DatePickerContainer = props => (
  <div className="input-container">
    <label>{props.schemaInfo.formRender.label}</label>

    <DatePicker
      selected={props.value}
      customInput={
        <div>
          {/* Ugh, so yeah. Outer element will have its class removed, hence this sillyness */}
          <div className="input-dummy">
            {props.value.format("YYYY - MM - DD")}
          </div>
        </div>
      }
      onSelect={date => props.updateForm(date)}
    />

    <FormError error={props.error} />
  </div>
);

DatePickerContainer.propTypes = {
  value: PropTypes.object.isRequired,
  updateForm: PropTypes.func.isRequired,
  schemaInfo: PropTypes.object,
  error: PropTypes.object
};

export default Renderer(DatePickerContainer);
