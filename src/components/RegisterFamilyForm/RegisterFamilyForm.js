import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Grid, TextField, Typography, Button, withStyles,
} from '@material-ui/core';
import { NotificationManager } from 'react-notifications';
import axios from '../../apiClient';

const styles = {
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '75%',
    margin: '0 auto',
  },
  moduleSubheader: {
    fontSize: '.75rem',
    color: '#707070',
    marginBottom: '1em',
  },
  errorMsg: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '.75rem',
    color: 'red',
    backgroundColor: '#ffcccb',
    border: '1px solid red',
    width: '80%',
    padding: '.5em 0',
    margin: '0 auto',
  },
  btn: {
    fontSize: '1rem',
  },
};

class RegisterFamilyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        isAdmin: true,
      },
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

    try {
      await axios.post('/user', values);
      this.setState({ loading: false });
    } catch (err) {
      NotificationManager.error(err.response.data.message, `Error ${err.response.data.code}`, 5000);
      this.setState({ loading: false });
      return null;
    }

    const { history } = this.props;

    return history.replace('/signup-success');
  }

  render() {
    const { classes } = this.props;
    // const { loading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <Grid className={classes.gridContainer} container spacing={2} align="center">
          <Grid style={{ padding: '.25em' }} item xs={12}>
            <Typography variant="h4" align="center">Sign up</Typography>
          </Grid>
          <Grid style={{ padding: '.25em' }} item xs={12}>
            {this.renderField('name', 'Name', { required: true, type: 'text' })}
          </Grid>
          <Grid style={{ padding: '.25em' }} item xs={12}>
            {this.renderField('familyName', 'Family name', { required: true, type: 'text' })}
          </Grid>
          <Grid style={{ padding: '.25em' }} item xs={12}>
            {this.renderField('email', 'E-mail', { required: true, type: 'email' })}
          </Grid>
          <Grid style={{ padding: '.25em' }} item xs={12}>
            {this.renderField('password', 'Password', { required: true, type: 'password' })}
          </Grid>
          <Grid style={{ padding: '.25em' }} item xs={12}>
            {this.renderField('confirmPassword', 'Confirm Password', { required: true, type: 'password' })}
          </Grid>
          <Grid style={{ padding: '.25em' }} item xs={12}>
            <Typography className={classes.moduleSubheader} variant="body2" align="left">Use 6 or more characters with mix of letters, numbers & symbols.</Typography>
          </Grid>
          <Button type="submit" variant="contained">Sign up</Button>
        </Grid>
      </form>
    );
  }
}

RegisterFamilyForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
};

export default withRouter((withStyles(styles)(RegisterFamilyForm)));
