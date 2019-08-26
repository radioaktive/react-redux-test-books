import { combineReducers } from 'redux';
import _ from 'lodash';
import { REQUEST_SEARCH_postS, RECEIVE_SEARCH_postS, RESET_SEARCH_postS } from './actions';

const items = (state = [], action) => {
  switch (action.type) {
    case REQUEST_SEARCH_postS:
      return state;
    case RECEIVE_SEARCH_postS:
      if (Array.isArray(action.posts)) {
        return _.unionBy(action.posts, state, 'id');
      }
      return _.unionBy([action.posts], state, 'id');
    case RESET_SEARCH_postS:
      return [];
    default:
      return state;
  }
};

const isFetching = (state = 0, action) => {
  switch (action.type) {
    case REQUEST_SEARCH_postS:
      return state + 1;
    case RECEIVE_SEARCH_postS:
      return state - 1;
    case RESET_SEARCH_postS:
      return 0;
    default:
      return state;
  }
};

export const getSearchposts = state => state.items;
export const getSearchpostsFetching = state => state.isFetching;

export default combineReducers({
  items,
  isFetching,
});
