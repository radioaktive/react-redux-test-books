import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, Icon, Header } from 'semantic-ui-react';

import './styles.css';

const SideMenu = props => (
  <Sidebar
    as={Menu}
    borderless
    animation="overlay"
    width="thin"
    visible={props.isVisible}
    icon="labeled"
    vertical
    inverted
    color="black"
  >
    <Header as="h2" inverted>
      MENU
    </Header>
    <Link to="/" onClick={props.closeMenu}>
      <Menu.Item name="home">
        <Icon name="home" />Home
      </Menu.Item>
    </Link>
    <Link to="/categories" onClick={props.closeMenu}>
      <Menu.Item name="categories">
        <Icon name="browser" />Authors
      </Menu.Item>
    </Link>
    <Link to="/source" onClick={props.closeMenu}>
      <Menu.Item name="Source">
        <Icon name="github" />Source
      </Menu.Item>
    </Link>
    <Link to="/contacts" onClick={props.closeMenu}>
      <Menu.Item name="Contacts">
        <Icon name="envelope" />Contacts
      </Menu.Item>
    </Link>
    {/*
    <Menu.Item name="service">
      <Icon name="setting" />Customer Service
    </Menu.Item>
    <Menu.Item name="shipping">
      <Icon name="truck" />Shipping
    </Menu.Item>
    <Menu.Item name="locations">
      <Icon name="marker" />Locations
    </Menu.Item>
    <Menu.Item name="contact">
      <Icon name="envelope" />Contact
    </Menu.Item>
    <Menu.Item name="account">
      <Icon name="user" />User Account
    </Menu.Item>
    */}
  </Sidebar>
);

SideMenu.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default SideMenu;
