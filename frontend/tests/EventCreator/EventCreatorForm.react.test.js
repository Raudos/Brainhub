import React from 'react'
import { shallow, mount } from 'enzyme';
import moment from "moment";

// Other
import { variants } from "./mockStore";
import dummyFormData from "./dummyFormData";

// Components
import { EventCreator } from "src/components/EventCreator/index";
import InputComponent from "src/components/EventCreator/Input";
import DatePicker from "src/components/EventCreator/DatePicker";

const dummyInputValues = dummyFormData.correct;

describe("EventCreator input tests.", () => {
  const wrapper = mount(
    <EventCreator
      eventCreator={variants.creator.eventCreator}
      createEvent={() => {}}
      downloadEventSchema={() => {}}
      updateEventCreatorForm={() => {}}
    />
  );

  it("Change inputs value.", () => {
    wrapper.find(InputComponent).forEach(input => {
      const key = input.props().valueKey;
      const dummyValue = dummyInputValues[key];

      input.find("input").simulate("change", {target: {value: dummyValue}});
    });
  });

  it("Check if inputs were correctly updated", () => {
    wrapper.find(InputComponent).forEach(input => {
      const key = input.props().valueKey;
      const dummyValue = dummyInputValues[key];

      expect(input.props().value).toBe(dummyValue);
    });
  });
});
