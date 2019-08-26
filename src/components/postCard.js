import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';

class postCard extends Component {

  getCategories() {
    let categories = this.props.categories.map(category => (<Link key={category.name} to={'/category/' + category.name}> {category.name} </Link>));
    return categories;
  }

  render() {
    return (
      <Card centered>
        <Card.Content>
          <Card.Header className="break-words">{this.props.name}</Card.Header>
          <Card.Meta>Author: {this.getCategories()}</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Link to={'/posts/' + this.props.id}>
            <Button basic color="black" compact>
              View Details &gt;
            </Button>
          </Link>
        </Card.Content>
      </Card>
    );
  }
}

postCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default postCard;
