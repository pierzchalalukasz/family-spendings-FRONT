import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  AppBar, Toolbar, Typography, IconButton, Button, makeStyles, Drawer,
  List, Divider, ListItem, ListItemText, ListItemIcon, useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
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
}));

// eslint-disable-next-line no-shadow
const Navbar = ({ user, logout, history }) => {
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
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon
                onClick={handleDrawerOpen}
              />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            Family Spendings
          </Typography>
          {user
            ? (
              <>
                <Typography>
                  Logged as
                  {' '}
                  {user.name}
                </Typography>
                <Button className={classes.btn} onClick={logout} variant="outlined" color="inherit">LOGOUT</Button>
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
          <List>
            <div>
              <Typography className={classes.adminPanelLabel} variant="overline">
                User Panel
              </Typography>
            </div>
            <Divider />
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
          </List>
        </Drawer>
      )}
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    isAdmin: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default withRouter(
  connect(mapStateToProps, { logout })(Navbar),
);
