/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container, Grid, Typography, Paper, withStyles,
} from '@material-ui/core';
import { getFamily } from '../../actions/familyActions';
import Navbar from '../../components/Navbar/Navbar';

const styles = {
  container: {
    marginTop: '64px',
  },
  paper: {
    padding: '1em',
    margin: '1em 0',
  },
};

class DashboardPage extends Component {
  constructor(props) {
    super(props);

    // eslint-disable-next-line no-shadow
    const { getFamily, familyId } = this.props;

    getFamily(familyId);
  }

  render() {
    const { family, isLoading, classes } = this.props;

    return (
      <div className={classes.container}>
        <Navbar />
        {!isLoading && (
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={3}>
                <Paper className={classes.paper} square>
                  <Typography variant="body2">
                    Family name
                  </Typography>
                  <Typography variant="h5">
                    {family.name}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <Paper className={classes.paper} square>
                  <Typography variant="body2">
                    Family budget
                  </Typography>
                  <Typography variant="h5">
                    {family.budget}
                    $
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Paper className={classes.paper} square>
                  <Typography variant="body2">
                    Family ID
                  </Typography>
                  <Typography variant="h5">
                    {family._id}
                  </Typography>
                </Paper>
                <Typography variant="body2" align="center">*If you want new members to join your family, they need to signup with this family ID.</Typography>
              </Grid>
            </Grid>
          </Container>
        )}
      </div>
    );
  }
}

DashboardPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  getFamily: PropTypes.func.isRequired,
  familyId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  family: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    budget: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = state => ({
  familyId: state.auth.user.familyId,
  family: state.family.family,
  isLoading: state.family.isLoading,
});

export default connect(mapStateToProps, { getFamily })(withStyles(styles)(DashboardPage));
