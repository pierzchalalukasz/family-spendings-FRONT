import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import Navbar from '../../components/Navbar/Navbar';
import SignUpSuccess from '../../assets/SignUpSuccess.svg';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
  },
  image: {
    width: '75%',
    maxWidth: '250px',
  },
});

const SignUpSuccessPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Navbar />
      <img className={classes.image} src={SignUpSuccess} alt="" />
      <Typography>You successfully signed up!</Typography>
      <Typography>Now you can sign into your account.</Typography>
    </div>
  );
};

export default SignUpSuccessPage;
