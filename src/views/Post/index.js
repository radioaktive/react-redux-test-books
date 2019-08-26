import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchposts } from '../Posts/actions';
import { getposts, getpostsFetching, postPropType } from '../Posts/reducer';
import PostDetails from './postDetails';
import { closeSearch } from '../../components/NavBar/actions';
import { isSearchVisible } from '../../components/NavBar/reducer';

//

class post extends Component {
  componentDidMount() {
    const { searchVisible } = this.props;
    this.readpost();

    if (searchVisible) {
      this.props.closeSearch();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.postId !== prevProps.match.params.postId) {
      this.readpost();
    }
  }

  readpost() {
    const { dispatch } = this.props;
    dispatch(fetchposts({ id: this.props.match.params.postId }));
  }

  render() {
    if (this.props.loading === 1) {
      return (
        <div>
          <Loader active />
        </div>
      );
    }

    const post = this.props.posts.find(
      obj => obj.id === parseInt(this.props.match.params.postId),
    );

    if (_.isNil(post)) {
      return <p>post does not exist</p>;
    }

    return <PostDetails post={post} />;
  }
}

post.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(postPropType).isRequired,
  searchVisible: PropTypes.bool.isRequired,
  closeSearch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: getpostsFetching(state.posts),
  posts: getposts(state.posts),
  searchVisible: isSearchVisible(state.navbar),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchposts, closeSearch }, dispatch));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(post);
