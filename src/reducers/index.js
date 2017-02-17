import { combineReducers } from 'redux';
import selectedSubreddit from './selectedSubreddit';
import postsBySubreddit from './postsBySubreddit';

const rootReducer = combineReducers({
  selectedSubreddit,
  postsBySubreddit,
});

export default rootReducer;