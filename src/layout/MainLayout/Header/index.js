// project import
import AppBarStyled from './AppBarStyled';
import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { AppBar, IconButton, Toolbar, useMediaQuery, Button } from '@mui/material';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useMsal } from '@azure/msal-react';


const Header = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const { instance } = useMsal();


  const iconBackColor = 'grey.100';
  const iconBackColorOpen = 'grey.200';

  const handleLogout = () => {
    // Perform logout logic here
    // For example, clear user session, remove tokens, etc.
    // Then navigate to the login page
    // window.location.href = '/';
    instance.logout();

  };

  const mainHeader = (
    <Toolbar>
      <IconButton
        disableRipple
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor, ml: { xs: 0, lg: -2 } }}
      >
        {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </IconButton>

      {/* Add the login button */}
      <div >
      <Button style={{ display: 'flex',position:'relative', left:'1500px'}} color="secondary" onClick={handleLogout}>
        Logout
        
      </Button>
    </div>
    </Toolbar>
  );

  const appBar = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`
    }
  };

  return (
    <>
      {!matchDownMD ? (
        <AppBarStyled open={open} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
};

Header.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func
};

export default Header;