/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  AppBar, Toolbar, Typography, IconButton, makeStyles, Drawer,
  List, Divider, ListItem, ListItemText, ListItemIcon, useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../../actions/authActions';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    padding: '.5em 1em',
    margin: '0 .5em',
    border: '1px solid #f2f2f2',
  },
  btn: {
    marginLeft: '2em',
  },
  adminPanelLabel: {
    fontWeight: 'bold',
    color: '#707070',
    marginLeft: '1em',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
}));

const Navbar = ({
  user, family, logout, history,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigateTo = to => {
    if (history.location.pathname === to) {
      return;
    }

    history.push(to);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {user && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              onClick={handleDrawerOpen}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            Family Spendings
          </Typography>
          {user && family
            ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', marginRight: '2em' }}>
                  <Typography style={{ fontSize: '.6rem' }}>
                    Family budget
                  </Typography>
                  <Typography>
                    {family.budget}
                    $
                  </Typography>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginRight: '1em' }}>
                  <Typography style={{ fontSize: '.6rem' }}>
                    Logged as
                  </Typography>
                  <Typography>
                    {user.name}
                  </Typography>
                </div>
              </>
            )
            : (
              <>
                <Link className={classes.link} to="/signup" color="inherit">SIGN UP</Link>
                <Link className={classes.link} to="/signin" color="inherit">SIGN IN</Link>
              </>
            )}
        </Toolbar>
      </AppBar>
      {user && (
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List className={classes.list}>
            <div>
              <div>
                <Typography className={classes.adminPanelLabel} variant="overline">
                  User Panel
                </Typography>
              </div>
              <Divider />
              <ListItem button key="dashboard" onClick={() => navigateTo('/dashboard')}>
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button key="add-spending" onClick={() => navigateTo('/add-spending')}>
                <ListItemIcon><AddShoppingCartIcon /></ListItemIcon>
                <ListItemText primary="Add spending" />
              </ListItem>
              {user.isAdmin && (
                <>
                  <List>
                    <div>
                      <Typography className={classes.adminPanelLabel} variant="overline">
                        Admin Panel
                      </Typography>
                    </div>
                    <Divider />
                    <ListItem button key="add-fund" onClick={() => navigateTo('/add-fund')}>
                      <ListItemIcon><LocalAtmIcon /></ListItemIcon>
                      <ListItemText primary="Add fund" />
                    </ListItem>
                  </List>
                </>
              )}
            </div>
            <div>
              <Divider />
              <ListItem button key="logout" onClick={() => logout()}>
                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </div>
          </List>
        </Drawer>
      )}
    </div>
  );
};

Navbar.defaultProps = {
  user: null,
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    isAdmin: PropTypes.bool,
  }),
  family: PropTypes.shape({
    budget: PropTypes.number,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  family: state.family.family,
});

export default withRouter(
  connect(mapStateToProps, { logout })(Navbar),
);
