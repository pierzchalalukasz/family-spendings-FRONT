import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PublicOnlyRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated
        ? <Redirect to="/dashboard" />
        : <Component {...props} />
    )}
  />
);

PublicOnlyRoute.propTypes = {
  component: PropTypes.oneOfType(
    [PropTypes.string, PropTypes.func],
  ).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default PublicOnlyRoute;
