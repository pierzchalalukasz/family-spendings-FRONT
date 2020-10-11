import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Grid, Button, TextField, Typography, withStyles,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { signIn } from '../../actions/authActions';

const styles = {
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '75%',
    margin: '0 auto',
  },
  btn: {
    marginTop: '1em',
  },
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {},
      msg: '',
      loading: false,
    };
  }

  onFieldChange = fieldName => e => {
    const { value } = e.target;

    this.setState(state => ({
      ...state,
      values: {
        ...state.values,
        [fieldName]: value,
      },
    }));
  }

  renderField = (fieldName, label, props = {}) => (
    <TextField
      onChange={this.onFieldChange(fieldName)}
      variant="standard"
      label={label}
      fullWidth
      {...props}
    />
  );

  onSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });

    const { values } = this.state;

    let response;

    try {
      response = await axios.post('/user/auth', values);
      this.setState({ loading: false });
    } catch (err) {
      NotificationManager.error(err.response.data.message, `Error ${err.response.data.code}`, 5000);
      this.setState({ loading: false });
      return null;
    }

    // eslint-disable-next-line no-shadow
    const { history, signIn } = this.props;

    signIn(response.data);

    return history.replace('/dashboard');
  }

  render() {
    const { classes } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <Grid className={classes.gridContainer} container spacing={2} justify="center">
          <Grid item xs={12}>
            <Typography variant="h4" align="center">Sign in</Typography>
          </Grid>
          <Grid item xs={12}>
            {this.renderField('email', 'E-mail', { required: true, type: 'email' })}
          </Grid>
          <Grid item xs={12}>
            {this.renderField('password', 'Password', { required: true, type: 'password' })}
          </Grid>
          <Button className={classes.btn} type="submit" variant="contained">Sign in</Button>
        </Grid>
      </form>
    );
  }
}

SignInForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  signIn: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
};

export default withRouter(connect(null, { signIn })(withStyles(styles)(SignInForm)));
