import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Card } from 'semantic-ui-react';
import GitHubWidget from 'react-github-widget';

import { closeSearch } from '../../components/NavBar/actions';
import { isSearchVisible } from '../../components/NavBar/reducer';
import config from '../../config/config';

class Source extends Component {
  
  componentDidMount() {
    if (this.props.searchVisible) {
      this.props.closeSearch();
    }
  }

  render() {

    return (
      <div>
        <Header textAlign="center">Source</Header>
        <Card centered>
          <GitHubWidget repository= {config.GITHUB_SOURCE_REPO} />
        </Card>
      </div>
    );
  }
}

Source.propTypes = {
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
)(Source);
