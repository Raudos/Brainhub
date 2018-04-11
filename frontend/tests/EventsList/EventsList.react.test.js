import React from 'react'
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import ReactRouterEnzymeContext from "react-router-enzyme-context";

// Other
import { initialStore, createStore as Store } from "src/redux/store";
import mockStore from "./mockStore";
import awaitAPI from "../awaitAPI";

const routerContext = new ReactRouterEnzymeContext()

// Components
import EventsListWithContainer, { EventsList } from "src/components/EventsList/index";
import ListElement from "src/components/EventsList/ListElement";
import Loader from "src/components/Loader";
import Error from "src/components/Error";

describe("EventsList rendering with mocked store - proper data.", () => {
  let wrapper;
  const mockedStore = mockStore("list");

  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockedStore}>
        <EventsListWithContainer />
      </Provider>,
      routerContext.get()
    );
  });

  // It seems that adding this particular router context won't let this test go through
  // Different keys on each context render ...
  // it("Confirm the render result based on previous snapshot.", () => {
  //   expect(wrapper).toMatchSnapshot();
  // });

  it('Confirm that eventsList inside store is the same passed to the component.', () => {
    expect(wrapper.find(EventsList).prop('eventsList')).toEqual(expect.arrayContaining(mockedStore.getState().eventsList));
  });

  it('Confirm that ListElements render expected number of times.', () => {
    expect(wrapper.find(ListElement).length).toEqual(mockedStore.getState().eventsList.length);
  });

  it("Confirm that ListElement receives props properly.", () => {
    expect(wrapper.find(ListElement).prop('event')).toMatchObject(mockedStore.getState().eventsList[0]);
  });
});

describe("EventsList rendering with mocked store - loading variant.", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockStore("loader")}>
        <EventsListWithContainer />
      </Provider>,
      routerContext.get()
    );
  });

  // it("Confirm the render result based on previous snapshot.", () => {
  //   expect(wrapper).toMatchSnapshot();
  // });

  it('Confirm that LoaderComponent is the one that\'s being rendered.', () => {
    expect(wrapper.find(Loader).length).toEqual(1);
  });
});

describe("EventsList rendering with mocked store - error variant.", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockStore("error")}>
        <EventsListWithContainer />
      </Provider>,
      routerContext.get()
    );
  });

  // it("Confirm the render result based on previous snapshot.", () => {
  //   expect(wrapper).toMatchSnapshot();
  // });

  it('Confirm that ErrorComponent is the one that\'s being rendered.', () => {
    expect(wrapper.find(Error).length).toEqual(1);
  });
});

describe("EventsList rendering with real store.", () => {
  const wrapper = mount(
    <Provider store={Store}>
      <EventsListWithContainer />
    </Provider>,
    routerContext.get()
  );

  it("Check if container started with Loading component.", () => {
    expect(wrapper.find(Loader).length).toEqual(1);
  });

  it("Check if component works properly with real API.", async () => {
    await awaitAPI().then(() => {
      wrapper.update();

      if (!wrapper.find(EventsList).length) {
        expect(wrapper.find(Error).length).toEqual(1);
      } else {
        expect(wrapper.find(EventsList).length).toEqual(1);
      }
    });
  });
});
