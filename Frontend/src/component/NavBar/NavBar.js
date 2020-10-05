import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import './NavrBar.css'
import { NavLink, Link } from 'react-router-dom';
import UnauthorizedMenu from './UnauthorizedMenu'
import AuthorizedMenu from './AuthorizedMenu';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, ListItemText } from '@material-ui/core';
import logo from '../../img/be4bc4c2-a23e-4217-a5ea-fef7c2a6bd13_200x200.png'

const buttonStyle = {
  background: 'orange',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px',
  color: 'black',
  height: 40,
  marginRight: 30
};

function NavBar (props){

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    if (Cookies.get('jwt') === undefined || Cookies.get('jwt') === "undefined"){
      return (
        <div>
          <AppBar position="fixed" style={{backgroundColor:'transparent', height: '8%'}}>
            <Toolbar>
              <Typography style={{flexGrow: 1}}>
                <NavLink to="/" tag={Link} style={{textDecoration: 'none'}}>
                  <Button style={{color: 'black'}} >
                  <MenuItem>
                      <img src={logo} alt="EZ-Garage" style={{height: 40}} />
                  </MenuItem>
                  </Button>
                </NavLink>
              </Typography>  
              <Button
                style={buttonStyle}
                onClick={handleClick}
              >
                Choose A City
              </Button>
              <Menu
                  getContentAnchorEl={null}
                  anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                  }}
                  transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                  }}
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
              >   
                  <NavLink to="/index" style={{color: "black"}}>
                      <MenuItem>
                          <ListItemText primary="New York City" />
                      </MenuItem>
                  </NavLink>
              </Menu>
              <UnauthorizedMenu />
            </Toolbar>
          </AppBar>
        </div>
      );
    } else {
      return (
        <AppBar position="fixed" style={{backgroundColor:'transparent', height: '8%'}}>
            <Toolbar>
              <Typography style={{flexGrow: 1}}>
                <NavLink to="/" tag={Link} style={{textDecoration: 'none'}}>
                  <Button style={{color: 'black'}} >
                  <MenuItem>
                      <img src={logo} alt="EZ-Garage" style={{height: 40}} />
                  </MenuItem>
                  </Button>
                </NavLink>
              </Typography>    
              <Button
                style={buttonStyle}
                onClick={handleClick}
              >
                Choose A City
              </Button>
              <Menu
                  getContentAnchorEl={null}
                  anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                  }}
                  transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                  }}
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
              >   
                  <NavLink to="/index" style={{color: "black"}}>
                      <MenuItem>
                          <ListItemText primary="New York City" />
                      </MenuItem>
                  </NavLink>
              </Menu>
          <AuthorizedMenu user={props.user} total_earning={props.total_earning} logOut={props.logOut} />
        </Toolbar>
      </AppBar>
      )
    }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(NavBar);