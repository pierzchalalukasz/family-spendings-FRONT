/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Navbar from '../../components/Navbar/Navbar';

class HomePage extends Component {
  render() {
    return (
      <div style={{ marginTop: '64px' }}>
        <Navbar />
        <Typography variant="h1" align="center">Welcome to</Typography>
        <Typography variant="h1" align="center">Family Spendings</Typography>
      </div>
    );
  }
}

export default HomePage;
