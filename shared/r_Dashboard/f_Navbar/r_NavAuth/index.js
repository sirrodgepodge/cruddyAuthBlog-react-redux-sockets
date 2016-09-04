// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as asyncActionCreators from '../../../redux/actionCreators/async';

class NavAuth extends Component {

  constructor() {
    super();

    // set default local state
    this.state = {
      errors: {}
    };

    this.handleLocalAuth = this.handleLocalAuth.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleLocalAuth() {
    if (process.env.CLIENT)
      window.test = this.refs;

    // initialize errors object
    const errors = {};

    // retrieving values from DOM
    const email = this.refs.email && this.refs.email.value;
    const password = this.refs.password && this.refs.password.value;

    // validation
    if (!~email.indexOf('@')) errors.email="email doesn't have @ sign";
    if (password.length < 6) errors.password='password is not long enough';

    // update local state with errors
    this.setState(_.merge({}, this.state, {errors}));

    if (!Object.keys(errors).length) // check that there are no errors
      this.props.dispatch(
        asyncActionCreators.localAuthRequest(email, password)
      );
  }

  logout() {
    this.props.dispatch(
      asyncActionCreators.logoutRequest()
    );
  }

  clearValidation(prop) {
    this.setState(_.assign({}, this.state, {errors: _.omit(this.state.errors, prop)}));
  }

  render() {
    const user = this.props.user;

    return (
      <ul className="nav navbar-nav navbar-right">
        <li className={`nav user-photo ${user && user.google && user.google.photo && 'show'}`}
            style={user && user.google && user.google.photo && {backgroundImage: `url(${user.google.photo})`}}/>
        <li className={`nav user-photo ${user && user.facebook && user.facebook.photo && 'show'}`}
            style={user && user.facebook && user.facebook.photo && {backgroundImage: `url(${user.facebook.photo})`}}></li>
        <li className="nav-button">
          {
            (!user || !user.email || !user.hasPassword || !user.google || !user.google.photo || !user.facebook || !user.facebook.photo)
            &&
            <span>
              LOG IN &#10161;
              {
                (!user || !user.google)
                &&
                <a href="/auth/google"><i className="fa fa-google o-auth-btn"></i></a>
              }
              {
                (!user || !user.facebook)
                &&
                <a href="/auth/facebook"><i className="fa fa-facebook o-auth-btn"></i></a>
              }
              {
                this.state.errors.email
                &&
                <span className="error error-email alert-danger">{this.state.errors.email}</span>
              }
              {
                (!user || !user.email)
                &&
                <input className="nav-input nav-input-email" type="text" ref="email"
                       onFocus={this.clearValidation.bind(this, 'email')}
                       placeholder="email"/>
              }
              {/*Repeating logic the the two below because of some CSS annoying-ness*/}
              {
                this.state.errors.password
                &&
                <span className="error error-password alert-danger">{this.state.errors.password}</span>
              }
              {
                (!user || !user.hasPassword)
                &&
                <input className="nav-input nav-input-password" type="password" ref="password"
                       onFocus={this.clearValidation.bind(this, 'password')}
                       placeholder="password" />
              }
              {
                (!user || !user.hasPassword)
                &&
                <button className="local-auth-button" onClick={this.handleLocalAuth}>
                  Post LocalAuth
                </button>
              }
            </span>
          }
          {
            user
            &&
            <a className="nav-button log-out-button show" href="#" onClick={this.logout}>
              LOG OUT
            </a>
          }
        </li>
      </ul>
    );
  }
}

function mapStateToProps(store) {
  return {
    user: store.user,
  };
}

NavAuth.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    createdDate: PropTypes.any.isRequired,
    hasPassword: PropTypes.bool.isRequired,
    google: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    }),
    facebook: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    })
  }),
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(NavAuth);
