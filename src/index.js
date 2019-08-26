import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import store from './configureStore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import Home from './views/Home';
import posts from './views/Posts';
import Categories from './views/Categories';
import Post from './views/Post';
import Search from './views/Search';
import Source from './views/Source';
import Contacts from './views/Contacts';

import 'semantic-ui-css/semantic.min.css'
import './index.css';

//
render(
  <Provider store={store}>
    <HashRouter>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/categories" component={Categories} />
          <Route path="/category/:categId" component={posts} />
          <Route path="/posts/:postId" component={Post} />
          <Route path="/search/:search" component={Search} />
          <Route path="/source" component={Source} />
          <Route path="/contacts" component={Contacts} />
        </Switch>
      </App>
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
