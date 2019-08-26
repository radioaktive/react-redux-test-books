import 'whatwg-fetch';
import config from '../../config/config';

export const REQUEST_SEARCH_postS = 'REQUEST_SEARCH_postS';
export const RECEIVE_SEARCH_postS = 'RECEIVE_SEARCH_postS';
export const RESET_SEARCH_postS = 'RESET_SEARCH_postS';

export const requestSearchposts = () => ({
  type: REQUEST_SEARCH_postS,
});

export const receiveSearchposts = posts => ({
  type: RECEIVE_SEARCH_postS,
  posts,
});

export const resetSearchposts = () => ({
  type: RESET_SEARCH_postS,
});

export const fetchposts = (params = {}) => (dispatch) => {
  dispatch(requestSearchposts());

  let url;
  if (params && params.id) {
    url = config.API_POST_URL + String(params.id);
  } else {
    url =
      config.API_POSTS_URL +
      '?' +
      Object.keys(params)
        .map(k => k + '=' + encodeURIComponent(params[k]))
        .join('&');
  }
  return fetch(url)
    .then(response => response.json())
    .then((json) => {
      dispatch(receiveSearchposts(json));
    })
    .catch(() => {
      dispatch(receiveSearchposts([]));
    });
};
