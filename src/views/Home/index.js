import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader, Container } from 'semantic-ui-react';
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';

import { fetchposts } from '../Posts/actions';
import { getpostsFetching, getposts, postPropType, getpostsHasMore } from '../Posts/reducer';
import PostsList from '../../components/postsList';


import { closeSearch } from '../../components/NavBar/actions';
import { isSearchVisible } from '../../components/NavBar/reducer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.loadposts = this.loadposts.bind(this);
  }

  componentDidMount() {
    if (this.props.searchVisible) {
      this.props.closeSearch();
    }

    this.readposts(1);
  }

  /**
   * Filter and return featured posts (if there are any)
   */
  getFilteredposts() {
    const items = this.props.posts.filter(post => post.featured);
    if (items.length > 0) {
      return items;
    }

    return this.props.posts;
  }

  loadposts() {
    if (this.props.hasMore) {
      const items = this.getFilteredposts();

      // 20 is the default per_page number used for paginating posts
      const nextPage = Math.round(items.length / 20) + 1;
      this.readposts(nextPage);
    }
  }

  readposts(page) {
    const { dispatch } = this.props;
    dispatch(fetchposts({
      page,
      featured: 1,
      order: 'asc',
      orderby: 'title',
      per_page: 20,
    }));
  }


  render() {
    const { loading, posts, hasMore } = this.props;

    if (loading === 1 && posts.length === 0) {
      return (
        <div>
          <Loader active />
        </div>
      );
    }

    if (posts.length === 0) {
      return (
        <Container>
          <p>No posts found.</p>
        </Container>
      );
    }

    // Filter featured posts (if there are any)
    const items = this.getFilteredposts();



    return (
    <div>
      <InfiniteScroll
        dataLength={items.length}
        next={this.loadposts}
        hasMore={hasMore}
      >
        <PostsList posts={_.orderBy(items, ['date'], ['desc'])} title="Books" />

      </InfiniteScroll>

    </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(postPropType).isRequired,
  hasMore: PropTypes.bool.isRequired,
  searchVisible: PropTypes.bool.isRequired,
  closeSearch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: getpostsFetching(state.posts),
  posts: getposts(state.posts),
  hasMore: getpostsHasMore(state.posts),
  searchVisible: isSearchVisible(state.navbar),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchposts, closeSearch }, dispatch));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
