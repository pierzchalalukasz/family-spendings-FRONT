/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Paper, Tabs, Tab, Box, makeStyles,
} from '@material-ui/core';
import JoinFamilyForm from '../JoinFamilyForm/JoinFamilyForm';
import RegisterFamilyForm from '../RegisterFamilyForm/RegisterFamilyForm';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff',
    width: '60%',
    margin: '0 auto',
  },
  tab: {
    width: '50%',
    minWidth: '50%',
  },
  appBar: {
    background: '#fff',
    color: '#000',
  },
  indicator: {
    background: '#7556ee',
  },
});

function SignUpTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Tabs
          classes={{ indicator: classes.indicator }}
          value={value}
          onChange={handleChange}
        >
          <Tab classes={{ root: classes.tab }} label="Sign up & register family" {...a11yProps(0)} />
          <Tab classes={{ root: classes.tab }} label="Sign up using family id" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <RegisterFamilyForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <JoinFamilyForm />
      </TabPanel>
    </Paper>
  );
}

export default SignUpTabs;
