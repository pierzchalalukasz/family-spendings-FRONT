import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid, Paper, Button, TextField, Typography, withStyles,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import axios from '../../apiClient';
import store from '../../store';
import { getFamilyBudget } from '../../actions/familyActions';
import { tokenConfig } from '../../actions/authActions';

const styles = {
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '350px',
    margin: '0 auto',
  },
  btn: {
    marginTop: '1em',
  },
  paper: {
    width: '50%',
    padding: '2.5em',
    margin: '2em auto',
  },
};

class AddFundForm extends Component {
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
    const { user } = this.props;
    const { familyId } = user;

    try {
      await axios.put(`/family/${familyId}/fund`, values, tokenConfig(store.getState));
      this.setState({ loading: false });
    } catch (err) {
      NotificationManager.error(err.response.data.message, `Error ${err.response.data.code}`, 5000);
      this.setState({ loading: false });
      return null;
    }

    // eslint-disable-next-line no-shadow
    const { history, getFamilyBudget } = this.props;

    getFamilyBudget(familyId);
    NotificationManager.success('Your budget has been updated.', 'Success', 5000);

    return history.replace('/dashboard');
  }

  render() {
    const { classes } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <Paper className={classes.paper}>
          <Grid className={classes.gridContainer} container spacing={2} justify="center">
            <Grid item xs={12}>
              <Typography variant="h4" align="center">Add fund</Typography>
            </Grid>
            <Grid item xs={12}>
              {this.renderField('newFund', 'New fund amount in $', { required: true, type: 'text' })}
            </Grid>
            <Button className={classes.btn} type="submit" variant="contained">Add fund</Button>
          </Grid>
        </Paper>
      </form>
    );
  }
}

AddFundForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  getFamilyBudget: PropTypes.func.isRequired,
  user: PropTypes.shape({
    familyId: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default withRouter(
  connect(mapStateToProps, { getFamilyBudget })(withStyles(styles)(AddFundForm)),
);
