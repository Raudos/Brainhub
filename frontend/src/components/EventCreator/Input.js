import React from "react";
const R = require('ramda');
import PropTypes from 'prop-types';

// Components
import Renderer from "./PureComponentRenderer";
import FormError from "./FormError";

const InputComponent = props => (
  <div className="input-container">
    <label>{props.schemaInfo.formRender.label}</label>

    <input
      value={props.value}
      placeholder={props.schemaInfo.formRender.placeholder}
      onChange={e => props.updateForm(e.target.value)}
    />

    <FormError error={props.error} />
  </div>
);

InputComponent.propTypes = {
  value: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  updateForm: PropTypes.func.isRequired,
  schemaInfo: PropTypes.object,
  error: PropTypes.object
};

export default Renderer(InputComponent);
