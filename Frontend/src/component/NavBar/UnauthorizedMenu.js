import React from 'react';
import { Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';

const dropdownLink = {
    "color": "#212529",
}

const buttonStyle = {
    background: 'orange',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px',
    color: 'black',
    height: 40,
};

export default function UnauthorizedMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

  return (
        <>
            <Button
                style={buttonStyle}
                onClick={handleClick}
            >
                Menu<MenuIcon fontSize="small" />
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
                <NavLink to="/login" exact style={dropdownLink}>
                    <MenuItem>
                        <ListItemIcon>
                            <AccountBoxIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                    </MenuItem>
                </NavLink>
                <NavLink to="/signup" exact style={dropdownLink}>
                    <MenuItem>
                        <ListItemIcon>
                            <VpnKeyIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Signup" />
                    </MenuItem>
                </NavLink>
            </Menu>
        </>
  );
}