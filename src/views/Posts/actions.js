import 'whatwg-fetch';
import config from '../../config/config';

export const REQUEST_postS = 'REQUEST_postS';
export const RECEIVE_postS = 'RECEIVE_postS';

export const requestposts = () => ({
  type: REQUEST_postS,
});

export const receiveposts = posts => ({
  type: RECEIVE_postS,
  posts,
});

export const fetchposts = (params = {}) => (dispatch) => {
  dispatch(requestposts());
  let url;
  if (params && params.id) {
    url = config.API_POST_URL + "/" + String(params.id);
  } else {
    url =
      config.API_POSTS_URL
  }
  return fetch(url)
    .then(response => response.json())
    .then(json => {
      dispatch(receiveposts(json))
    })
    .catch(() => {
      dispatch(receiveposts([]));
    });
};
