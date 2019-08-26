import { createStore, applyMiddleware } from 'redux';
import { persistCombineReducers, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import { createBrowserHistory } from "history";
import { routerMiddleware } from 'react-router-redux';

import config from './config/config';
import categories from './views/Categories/reducer';
import posts from './views/Posts/reducer';
import search from './views/Search/reducer';
import navbar from './components/NavBar/reducer';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'navbar',
    'search',
    'categories',
    'posts'
  ],
  // debug: true,
};

const rootReducer = persistCombineReducers(rootPersistConfig, {
  categories: persistReducer(
    {
      key: 'categories',
      storage,
      blacklist: config.OFFLINE ? ['isFetching', 'hasMore'] : ['isFetching', 'hasMore', 'items'],
    },
    categories,
  ),
  posts: persistReducer(
    {
      key: 'posts',
      storage,
      blacklist: config.OFFLINE ? ['isFetching', 'hasMore'] : ['isFetching', 'hasMore', 'items'],
    },
    posts,
  ),
  navbar,
  search
});

const history = createBrowserHistory();

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunk, routerMiddleware(history)),
);

persistStore(store);

export { history };
export default store;
