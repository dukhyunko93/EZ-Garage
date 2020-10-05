import React from 'react';
import { Button, Menu, MenuItem, ListItemIcon, ListItemText, Divider }  from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MenuIcon from '@material-ui/icons/Menu';
import AddBoxIcon from '@material-ui/icons/AddBox';
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

export default function AuthorizedMenu(props) {
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
                {`Hello, ${props.user[0]?.first_name} `}<MenuIcon fontSize="small" />
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
                <NavLink to="/profile" exact style={dropdownLink}>
                    <MenuItem>
                        <ListItemIcon>
                            <AccountBoxIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </MenuItem>
                </NavLink>
                <NavLink to="/listingform" exact style={dropdownLink}>
                    <MenuItem>
                        <ListItemIcon>
                            <AddBoxIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Create Lisitng" />
                    </MenuItem>
                </NavLink>
                <NavLink to="/" onClick={props.logOut} exact style={dropdownLink}>
                    <MenuItem>
                        <ListItemIcon>
                            <VpnKeyIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Log Out" />
                    </MenuItem>
                </NavLink>
                <Divider />
                <MenuItem>
                    <ListItemText primary={`Total Earnings: $${props.total_earning}`} />
                </MenuItem>
            </Menu>
        </>
  );
}