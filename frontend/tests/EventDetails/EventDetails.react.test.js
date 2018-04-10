import React from 'react'
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

// Other
import { initialStore, createStore as Store } from "src/redux/store";
import mockStore from "./mockStore";
import { fetchEventsList } from "src/redux/actions/eventsList";
import awaitAPI from "../awaitAPI";

// Components
import EventDetailsWithContainer, { EventDetails } from "src/components/EventDetails/index";
import Detail from "src/components/EventDetails/Detail";
import Loader from "src/components/Loader";
import Error from "src/components/Error";

describe("EventDetails rendering with mocked store - proper data.", () => {
  const mockedStore = mockStore("details");
  const id = Object.keys(mockedStore.getState().eventDetails)[0];
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockedStore}>
        <EventDetailsWithContainer match={{params: {id}}}/>
      </Provider>
    );
  });

  it("Confirm the render result based on previous snapshot.", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Confirm that EventDetails receives props properly.", () => {
    expect(wrapper.find(EventDetails).prop('eventDetails')).toMatchObject(mockedStore.getState().eventDetails[id]);
  });

  it('Confirm that Detail renders expected number of times.', () => {
    expect(wrapper.find(Detail).length).toEqual(4);
  });
});

describe("EventDetails rendering with mocked store - loading variant.", () => {
  const mockedStore = mockStore("loader");
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockedStore}>
        <EventDetailsWithContainer match={{params: {id: 1}}}/>
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

describe("EventDetails rendering with mocked store - error variant.", () => {
  const mockedStore = mockStore("error");
  const id = Object.keys(mockedStore.getState().eventDetails)[0];
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockedStore}>
        <EventDetailsWithContainer match={{params: {id}}}/>
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

describe("EventDetails rendering with real store.", () => {
  it("Fetch and render Details for first event from eventsList.", async () => {
    const id = await fetchEventsList().then(eventsList => {
      if (eventsList.length) {
        return eventsList[0]._id;
      }

      throw "No events in the database.";
    }).catch(e => {
      return "1234";
    });

    const wrapper = mount(
      <Provider store={Store}>
        <EventDetailsWithContainer match={{params: {id}}}/>
      </Provider>
    );

    // Check if container started with Loading component.
    expect(wrapper.find(Loader).length).toEqual(1);

    await awaitAPI().then(() => {
      wrapper.update();

      if (id === "1234") {
        // Check if container rendered Error component.
        expect(wrapper.find(Error).length).toEqual(1);
      } else {
        // Check if container rendered Details component.
        expect(wrapper.find(EventDetails).length).toEqual(1);
        // Check if all data was fetched correctly.
        expect(wrapper.find(Detail).length).toEqual(4);
      }
    });
  })
});
