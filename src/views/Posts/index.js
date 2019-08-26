import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Loader, Container } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { fetchposts } from './actions';
import { getpostsFetching, getposts, postPropType, getpostsHasMore } from './reducer';
import PostsList from '../../components/postsList';
import { closeSearch } from '../../components/NavBar/actions';
import { isSearchVisible } from '../../components/NavBar/reducer';

class posts extends Component {
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

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    if (match.params.categId !== prevProps.match.params.categId) {
      this.readposts(1);
    }
  }

  getCategoryName(categories) {
    let categoryName =  this.props.match.params.categId;
    return categoryName;
  }

  loadposts() {
    if (this.props.hasMore) {
      // 20 is the default per_page number used for paginating posts
      const nextPage = Math.round(this.props.posts.length / 20) + 1;
      this.readposts(nextPage);
    }
  }

  readposts(page) {
    const { dispatch } = this.props;
    dispatch(fetchposts({
      category: this.props.match.params.categName,
      page,
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

    return (
      <InfiniteScroll
        dataLength={posts.length}
        next={this.loadposts}
        hasMore={hasMore}
      >
        <PostsList
          posts={_.orderBy(posts, ['date'], ['desc'])}
          title={"Author: " + this.getCategoryName(posts[0].categories).toUpperCase()}
        />
      </InfiniteScroll>
    );
  }
}

posts.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(postPropType).isRequired,
  hasMore: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      categName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  searchVisible: PropTypes.bool.isRequired,
  closeSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  loading: getpostsFetching(state.posts),
  posts: getposts(state.posts, props.match.params.categId),
  hasMore: getpostsHasMore(state.posts),
  searchVisible: isSearchVisible(state.navbar),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchposts, closeSearch }, dispatch));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(posts);
