import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import PostCard from './postCard';
import { postPropType } from '../views/Posts/reducer';

class postsList extends Component {

  render() {
    const list = this.props.posts.map(element => (
      <PostCard
        key={element.id}
        id={element.id}
        name={element.name}
        categories={[
          {id: element.author,
          name: element.author}
        ]}
      />
    ));

    return (
      <div>
        <Header textAlign="center">{this.props.title}</Header>
        {list}
      </div>
    );
  }
}

postsList.propTypes = {
  posts: PropTypes.arrayOf(postPropType).isRequired,
  title: PropTypes.string.isRequired,
};

export default postsList;
