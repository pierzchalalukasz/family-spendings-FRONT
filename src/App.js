import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  HashRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
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
import PublicOnlyRoute from './components/PublicOnlyRoute/PublicOnlyRoute';
import SignUpSuccessPage from './pages/SignUpSuccessPage/SignUpSuccessPage';
import AddSpendingPage from './pages/AddSpendingPage/AddSpendingPage';
import AddFundPage from './pages/AddFundPage/AddFundPage';
import Error404Page from './pages/Error404Page/Error404Page';

class App extends Component {
  constructor(props) {
    super(props);

    this.initApp();
  }

  initApp = () => {
    // eslint-disable-next-line no-shadow
    const { initApp } = this.props;

    store.dispatch(loadUser());

    initApp();
  }

  render() {
    const { isAppInitialized, isAuthenticated, isLoading } = this.props;

    if (!isAppInitialized || isLoading) {
      return null;
    }

    return (
      <>
        <Router>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <PublicOnlyRoute path="/signup" component={SignUpPage} isAuthenticated={isAuthenticated} exact />
            <PublicOnlyRoute path="/signin" component={SignInPage} isAuthenticated={isAuthenticated} exact />
            <PublicOnlyRoute path="/signup-success" component={SignUpSuccessPage} isAuthenticated={isAuthenticated} exact />
            <PrivateRoute path="/dashboard" component={DashboardPage} isAuthenticated={isAuthenticated} exact />
            <PrivateRoute path="/add-spending" component={AddSpendingPage} isAuthenticated={isAuthenticated} exact />
            <PrivateRoute path="/add-fund" component={AddFundPage} isAuthenticated={isAuthenticated} exact />
            <Route path="/404" component={Error404Page} />
            <Redirect to="/404" />
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
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAppInitialized: state.app.isAppInitialized,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, { initApp })(App);
