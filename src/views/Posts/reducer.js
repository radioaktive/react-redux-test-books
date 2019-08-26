import { combineReducers } from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { REQUEST_postS, RECEIVE_postS } from './actions';

export const postPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
  ),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
});

const items = (state = [], action) => {
  switch (action.type) {
    case REQUEST_postS:
      return state;
    case RECEIVE_postS:
      if (Array.isArray(action.posts)) {
        return _.unionBy(action.posts, state, 'id');
      }
      return _.unionBy([action.posts], state, 'id');
    default:
      return state;
  }
};

const hasMore = (state = false, action) => {
  switch (action.type) {
    case REQUEST_postS:
      return true;
    case RECEIVE_postS:
      // 20 is the default per_page number used for paginating posts
      return action.posts.length >= 20;
    default:
      return state;
  }
};

const isFetching = (state = 0, action) => {
  switch (action.type) {
    case REQUEST_postS:
      return state + 1;
    case RECEIVE_postS:
      return state - 1;
    default:
      return state;
  }
};

export const getposts = (state, category = null) => {
  if (category === null) {
    return state.items;
  }

  let res = state.items.filter(post => {
    let f = post.author.toString() === category;
    return f;
  });
  return res;
};

export const getpostsFetching = state => state.isFetching;
export const getpostsHasMore = state => state.hasMore;

export default combineReducers({
  items,
  isFetching,
  hasMore,
});
