import React, { Component } from 'react';
import { Grid, withStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SignUpTabs from '../../components/SignUpTabs/SignUpTabs';
import LeftColumnImage from '../../assets/LeftColumnImage.svg';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center', 
    minHeight: '100vh', 
    width: '100%',
  },
  outerGridContainer: {
    width: '75%',
    minHeight: '90%',
    margin: '0 auto',
    boxShadow: '5px 5px 5px #ccc',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    background: 'linear-gradient(45deg, #dae2f8, #d6a4a4)',
  },
  rightColumn: {
    display: 'flex', 
    justifyContent: 'center',
  },
  signInLink: {
    fontWeight: 'bold',
    margin: '1em auto',
  },
  image: {
    width: '60%',
  }
}

class SignUpPage extends Component {
  render() {

    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Grid className={classes.outerGridContainer} container>
          <Grid className={classes.leftColumn} item xs={12} sm={12} md={6}>
            <img className={classes.image} src={LeftColumnImage} alt="" />
            <Typography className={classes.signInLink} variant="body1" align="center">Have an account yet? <Link to="/signin">Sign in</Link></Typography>
          </Grid>
          <Grid className={classes.rightColumn} item xs={12} sm={12} md={6}>
            <SignUpTabs />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(SignUpPage);
