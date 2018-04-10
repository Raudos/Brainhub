import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Components
import EventManager from "src/components/index";

// Other
import { createStore as Store } from "src/redux/store";

const App = () => {
  return (
    <Provider store={Store}>
      <EventManager />
    </Provider>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));
