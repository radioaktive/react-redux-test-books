import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Card } from 'semantic-ui-react';

import { closeSearch } from '../../components/NavBar/actions';
import { isSearchVisible } from '../../components/NavBar/reducer';

class Contacts extends Component {

  componentDidMount() {
    if (this.props.searchVisible) {
      this.props.closeSearch();
    }
  }

  render() {

    return (
      <div>
        <Header textAlign="center">Contacts</Header>
        <Card centered>
          <Card.Content>
            <div>
                <p>
                  <i class = "blue envelope big icon" aria-hidden= "true"></i> radioaktive@protonmail.com
                </p>

                <p>
                  <a href= "https://t.me/radioaktive" target= "_blank" rel="noopener noreferrer"><i class = "blue telegram big icon" aria-hidden= "true"></i>https://t.me/radioaktive</a>
                </p>
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

Contacts.propTypes = {
  dispatch: PropTypes.func.isRequired,
  searchVisible: PropTypes.bool.isRequired,
  closeSearch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  searchVisible: isSearchVisible(state.navbar),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ closeSearch }, dispatch));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contacts);
