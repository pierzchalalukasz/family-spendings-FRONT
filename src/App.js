import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import store from './store';
import { initApp } from './actions/appActions';
import { loadUser } from './actions/authActions';
import HomePage from './pages/HomePage/HomePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SignInPage from './pages/SignInPage/SignInPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import SignUpSuccessPage from './pages/SignUpSuccessPage/SignUpSuccessPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.initApp();
  }

  initApp = async () => {
    // eslint-disable-next-line no-shadow
    const { initApp } = this.props;

    await store.dispatch(loadUser());

    initApp();
  }

  render() {
    const { isAppInitialized, isAuthenticated } = this.props;

    if (!isAppInitialized) {
      return null;
    }

    return (
      <>
        <Router>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/signup" component={SignUpPage} exact />
            <Route path="/signin" component={SignInPage} exact />
            <Route path="/signup-success" component={SignUpSuccessPage} exact />
            <PrivateRoute path="/dashboard" component={DashboardPage} isAuthenticated={isAuthenticated} exact />
          </Switch>
        </Router>
        <NotificationContainer />
      </>
    );
  }
}

App.propTypes = {
  initApp: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isAppInitialized: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAppInitialized: state.app.isAppInitialized,
});

export default connect(mapStateToProps, { initApp })(App);
