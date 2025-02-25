// project import
import AppBarStyled from "./AppBarStyled";
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { AppBar, IconButton, Toolbar, useMediaQuery, Box } from "@mui/material";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import logo from '../../../assets/images/anth_logo.png';


import HeaderContent from "./HeaderContent";

const Header = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));

  const iconBackColor = "grey.100";
  const iconBackColorOpen = "grey.200";

  const mainHeader = (
    <Toolbar   ml={{xs:2, lg:-2}} >
      <Box sx={{ flexGrow: 1, }}>
        {/* <IconButton
          disableRipple
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          color="secondary"
          sx={{
            color: "text.primary",
            bgcolor: open ? iconBackColorOpen : iconBackColor,
            ml: { xs: 0, lg: -2 },
          }}
        > */}
          {/* {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} */}
        {/* </IconButton> */}
        <img src={logo} alt="anth_logo" style={{ position: 'absolute', 
            top: '9px', 
            height: '40px',
            // left: '70px'
          }} />
      </Box>
      <HeaderContent />
    </Toolbar>
  );

  const appBar = {
    position: "fixed",
    color: "inherit",
    elevation: 2,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
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
  handleDrawerToggle: PropTypes.func,
};

export default Header;
