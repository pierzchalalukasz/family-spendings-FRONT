import React, { Component } from 'react';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signIn } from '../../actions/authActions';
import { Grid, Button, TextField, withStyles } from '@material-ui/core';

const styles = {
  gridContainer: {
      display: 'flex',
      justifyContent: 'center',
      width: '80%',
      margin: '0 auto'
  },
  btn: {
      marginTop: '2.5em'
  }
}

export class SignInForm extends Component {
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

  renderField = (fieldName, label, props = {}) => {
    return (
      <TextField
        onChange={this.onFieldChange(fieldName)}
        variant="standard"
        label={label}
        fullWidth
        {...props}
      />
    );
  }

onSubmit = async e => {
    e.preventDefault();
    console.log(this.state.values);
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

    const { history, signIn } = this.props;

    signIn(response.data);

    return history.replace('/dashboard');
  }

  render() {
    const { classes } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
              {this.renderField('email', 'E-mail', { required: true, type: 'email' })}
          </Grid>
          <Grid item xs={12}>
              {this.renderField('password', 'Password', { required: true, type: 'password' })}
          </Grid>
          <Button type="submit" variant="contained">Sign in</Button>
        </Grid>
      </form>
    );
  }
}

export default withRouter(connect(null, { signIn })(withStyles(styles)(SignInForm)));