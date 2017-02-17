// import configureStore from './configureStore';
// import { fetchPostsIfNeeded } from './actions';

// let store = configureStore();
// const state = store.getState();
// store.dispatch(fetchPostsIfNeeded(state.selectedSubreddit));

import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import configureStore from './configureStore';
import AsyncApp from './containers/AsyncApp';

const store = configureStore();

render(
  <Provider store={store}>
    <AsyncApp />
  </Provider>,
  document.getElementById('root')
)