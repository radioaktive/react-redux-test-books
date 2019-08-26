import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Card, Button, Header, Segment } from 'semantic-ui-react';

import './styles.css';

class CategoryCard extends Component {
  render() {
    return (
      <Card centered>
        <Card.Content>
          <Segment basic className="category-meta-container">
            <Card.Header as={Header} className="break-words">
              {this.props.name}
            </Card.Header>
            <Link to={'/category/' + this.props.id}>
              <Button basic color="black" compact>
                View Books &gt;
              </Button>
            </Link>
          </Segment>
        </Card.Content>
      </Card>
    );
  }
}

CategoryCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
};

CategoryCard.defaultProps = {
  url: '',
};

export default CategoryCard;
