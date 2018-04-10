import React from 'react'
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

// Other
import { initialStore, createStore as Store } from "src/redux/store";
import mockStore from "./mockStore";
import awaitAPI from "../awaitAPI";
import dummyFormData from "./dummyFormData";

// Components
import EventCreatorWithContainer, { EventCreator } from "src/components/EventCreator/index";
import InputComponent from "src/components/EventCreator/Input";
import DatePicker from "src/components/EventCreator/DatePicker";
import Loader from "src/components/Loader";
import Error from "src/components/Error";

describe("EventCreator rendering with mocked store - proper data.", () => {
  const mockedStore = mockStore("creator");;
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockedStore}>
        <EventCreatorWithContainer />
      </Provider>
    );
  });

  // it("Confirm the render result based on previous snapshot.", () => {
  //   expect(wrapper).toMatchSnapshot();
  // });

  it("Confirm that EventCreator receives props properly.", () => {
    expect(wrapper.find(EventCreator).prop('eventCreator')).toMatchObject(mockedStore.getState().eventCreator);
  });

  it('Confirm that form elements render expected number of times.', () => {
    expect(wrapper.find(InputComponent).length).toEqual(3);
    expect(wrapper.find(DatePicker).length).toEqual(1);
  });
});

describe("EventCreator rendering with mocked store - loading variant.", () => {
  const mockedStore = mockStore("loader");
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockedStore}>
        <EventCreatorWithContainer />
      </Provider>
    );
  });

  it("Confirm the render result based on previous snapshot.", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Confirm that LoaderComponent is the one that\'s being rendered.', () => {
    expect(wrapper.find(Loader).length).toEqual(1);
  });
});

describe("EventCreator rendering with mocked store - error variant.", () => {
  const mockedStore = mockStore("error");
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockedStore}>
        <EventCreatorWithContainer />
      </Provider>
    );
  });

  it("Confirm the render result based on previous snapshot.", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Confirm that ErrorComponent is the one that\'s being rendered.', () => {
    expect(wrapper.find(Error).length).toEqual(1);
  });
});

describe("EventCreator actions with real API data.", () => {
  const wrapper = mount(
    <Provider store={Store}>
      <EventCreatorWithContainer />
    </Provider>
  );

  it("Check if container started with Loading component.", () => {
    expect(wrapper.find(Loader).length).toEqual(1);
  });

  it("Check if component works properly with real API.", async () => {
    await awaitAPI().then(() => {
      wrapper.update();

      if (!wrapper.find(EventCreator).length) {
        expect(wrapper.find(Error).length).toEqual(1);
      } else {
        expect(wrapper.find(EventCreator).length).toEqual(1);
      }
    });
  });

  it('Confirm that form elements render expected number of times.', () => {
    expect(wrapper.find(InputComponent).length).toEqual(3);
    expect(wrapper.find(DatePicker).length).toEqual(1);
  });

  it("Fill the form with correct data. ", () => {
    const dummyInputValues = dummyFormData.correct;

    wrapper.find(InputComponent).forEach(input => {
      const key = input.props().valueKey;
      const dummyValue = dummyInputValues[key];

      input.find("input").simulate("change", {target: {value: dummyValue}});
    });
  });

  it("Proceed to create new event.", async () => {
    const result = await wrapper.find(EventCreator).instance().createEvent();
    const { formValues, errors } = wrapper.find(EventCreator).prop("eventCreator")

    expect(result).toBe(true);

    expect(formValues.firstName).toBe("");
    expect(formValues.lastName).toBe("");
    expect(formValues.email).toBe("");
    expect(Object.keys(errors).length).toEqual(0);
  });

  it("Fill the form with incorrect data. ", () => {
    const dummyInputValues = dummyFormData.incorrect;

    wrapper.find(InputComponent).forEach(input => {
      const key = input.props().valueKey;
      const dummyValue = dummyInputValues[key];

      input.find("input").simulate("change", {target: {value: dummyValue}});
    });
  });

  it("Proceed to be stopped by validation.", async () => {
    const dummyInputValues = dummyFormData.incorrect;
    const result = await wrapper.find(EventCreator).instance().createEvent();

    expect(result).toBe(false);

    wrapper.update();

    const { formValues, errors } = wrapper.find(EventCreator).prop("eventCreator");

    expect(formValues.firstName).toBe(dummyInputValues.firstName);
    expect(formValues.lastName).toBe(dummyInputValues.firstName);
    expect(formValues.email).toBe(dummyInputValues.firstName);
    expect(Object.keys(errors).length).toEqual(3);
  });
});
