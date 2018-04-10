import React from 'react';
import { shallow } from 'enzyme';

// Components
import FormError from "src/components/EventCreator/FormError";

describe('Rendering error message inside EventCreator.', () => {
  const error = {message: "I'm an error."}
  const component = shallow(
    <FormError error={error} />
  );

  it("Check if snapshots match.", () => {
    expect(component).toMatchSnapshot();
  });
});
