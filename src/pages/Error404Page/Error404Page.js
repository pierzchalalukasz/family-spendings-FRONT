import React from 'react';
import { Typography } from '@material-ui/core';
import Navbar from '../../components/Navbar/Navbar';

const Error404Page = () => (
  <div style={{ marginTop: '64px' }}>
    <Navbar />
    <Typography variant="h1" align="center">404</Typography>
    <Typography variant="h3" align="center">Page Not Found</Typography>
  </div>
);

export default Error404Page;
