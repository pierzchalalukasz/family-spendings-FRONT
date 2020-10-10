import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import HomePage from './pages/HomePage/HomePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SignInPage from './pages/SignInPage/SignInPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

class App extends Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <>
        <Router>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/signup" component={SignUpPage} exact />
            <Route path="/signin" component={SignInPage} exact />
            <PrivateRoute path="/dashboard" component={DashboardPage} isAuthenticated={isAuthenticated} exact />
          </Switch>
        </Router>
        <NotificationContainer />
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(App);
