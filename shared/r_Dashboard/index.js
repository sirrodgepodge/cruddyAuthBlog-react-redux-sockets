// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// redux
import * as asyncActionCreators from '../redux/actionCreators/async';

// components
import Navbar from './f_Navbar';
import Blog from './f_Blog';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    if (!this.props.posts.length)
      this.props.dispatch(asyncActionCreators.initializationRequests(this.props.user));
  }

  render() {
    return (
      <div>
        <Navbar/>
        <Blog/>
      </div>
    );
  }
}

Dashboard.need = [(params, state) =>
  asyncActionCreators.initializationRequests(state.user)
];

function mapStateToProps(store) {
  return {
    user: store.user,
    posts: store.posts
  };
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object, // can be null so don't put 'isRequired'
  posts: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Dashboard);
