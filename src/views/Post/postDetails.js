import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import { postPropType } from '../Posts/reducer';


import './styles.css';

//
class postDetails extends Component {
  static isAnyCached(images) {
    return images
      .map((image) => {
        const newImage = new Image();
        newImage.url = image.original;
        return newImage.complete;
      })
      .filter(isCached => isCached === false);
  }

  constructor(props) {
    super(props);

    this.state = {
      selections: null,
    };

    this.receiveSelections = this.receiveSelections.bind(this);
  }




  /**
   * Modify component's state when a variation is selected.
   * @param {Object} selections
   */
  receiveSelections(selections) {
    this.setState({ selections });
  }



  render() {


    return (
      <div>
        {this.props.post.name === null ? null : (
          <Card centered>
            <Card.Content>
              <Card.Header className="break-words">{this.props.post.name}</Card.Header>
              {this.props.post.author === null ? null : (
                <Card.Meta>Author: <Link key={this.props.post.author} to={'/category/' + this.props.post.author}> {this.props.post.author} </Link> </Card.Meta>
              )}
              <Card.Meta>Book ID: {this.props.post.id} </Card.Meta>

              <Card.Description className="break-words">

              </Card.Description>
            </Card.Content>
          </Card>
        )}
      </div>
    );
  }
}

postDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  post: postPropType.isRequired,
};

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators(dispatch));
}

export default connect(null, mapDispatchToProps)(postDetails);
