import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function Navigation(){
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
      console.log(anchorEl);
    };

    return(
        <div>
            <AppBar position="static">
                <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
                    <MenuIcon />
                    <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    >
                    <MenuItem onClick={handleClose} component={Link} to='/'>
                        Customers
                    </MenuItem>
                    
                    <MenuItem onClick={handleClose} component={Link} to='/trainings'>
                        Trainings
                    </MenuItem>
                    </Menu>
                </IconButton>
                <Typography variant="h6">
                    Personal trainer
                </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}