import React, { Component } from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SignInForm from '../../components/SignInForm/SignInForm';
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
    minHeight: '532px',
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
    alignItems: 'center',
  },
  signUpLink: {
    fontWeight: 'bold',
    margin: '1em auto',
  },
  image: {
    width: '60%',
  }
}

class SignInPage extends Component {
  render() {
    
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Grid className={classes.outerGridContainer} container>
          <Grid className={classes.leftColumn} item xs={12} sm={12} md={6}>
            <img className={classes.image} src={LeftColumnImage} alt="" />
            <Typography className={classes.signUpLink} variant="body1" align="center">Don't have an account? <Link to="/signup">Sign up</Link></Typography>
          </Grid>
          <Grid className={classes.rightColumn} item xs={12} sm={12} md={6}>
            <SignInForm />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(SignInPage);
