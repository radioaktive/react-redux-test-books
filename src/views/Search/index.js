import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader, Container, Header } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import _ from 'lodash';

import { postPropType } from '../Posts/reducer';
import { fetchposts, resetSearchposts } from './actions';
import { getSearchpostsFetching, getSearchposts } from './reducer';
import PostsList from '../../components/postsList';

import { closeSearch } from '../../components/NavBar/actions';
import { isSearchVisible } from '../../components/NavBar/reducer';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      hasMore: false,
    };

    this.readposts = this.readposts.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    if (this.props.searchVisible) {
      this.props.closeSearch();
    }

    this.readposts(1);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.search !== prevProps.match.params.search) {
      this.props.resetSearchposts();
      this.readposts(1);
    }

    if (prevProps.posts.length < this.props.posts.length) {
      this.setState({ hasMore: true });
    }
  }

  loadMore() {
    if (this.state.hasMore) {
      this.readposts(this.state.page + 1);
    }
  }

  readposts(page) {
    const { dispatch } = this.props;
    dispatch(fetchposts({
      content_contains: this.props.match.params.search
    }));
    this.setState({ page, hasMore: false });
  }

  render() {
    const { loading, posts } = this.props;
    const { hasMore } = this.state;

    if (loading === 1 && posts.length === 0) {
      return (
        <div>
          <Loader active />
        </div>
      );
    }

    if (posts.length === 0) {
      if (!navigator.onLine) {
        return (
          <Container>
            <p>No internet connection.</p>
          </Container>
        );
      }
      return (
        <Container>
          <Header textAlign="center">Search `{this.props.match.params.search}`</Header>
          <p>No posts found.</p>
        </Container>
      );
    }

    const items = _.orderBy(posts, ['name'], ['asc']);

    return (
      <InfiniteScroll
        dataLength={items.length}
        next={this.loadMore}
        hasMore={hasMore}
      >
        <PostsList posts={items} title={`Search '${this.props.match.params.search}'`} />
      </InfiniteScroll>
    );
  }
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(postPropType).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  searchVisible: PropTypes.bool.isRequired,
  closeSearch: PropTypes.func.isRequired,
  resetSearchposts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: getSearchpostsFetching(state.search),
  posts: getSearchposts(state.search),
  searchVisible: isSearchVisible(state.navbar),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchposts, closeSearch, resetSearchposts }, dispatch));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
