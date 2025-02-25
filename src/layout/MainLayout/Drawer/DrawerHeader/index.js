import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import logo from '../../../../assets/images/Anthology-Logo-Vector.svg';

const Logo = () => (
  
        <img src={logo} alt="Anthology logo" style={{ position: 'absolute', 
            top: '10px', 
            height: '110px',
            left: '70px'
          }} />  
);

// ==============================|| DRAWER HEADER ||============================== //


const DrawerHeader = ({ open }) => {
    const theme = useTheme();

    return (
        // only available in paid version
        <DrawerHeaderStyled theme={theme} open={open}>
            <Stack>
                <Logo />
            </Stack>
        </DrawerHeaderStyled>
    );
};

DrawerHeader.propTypes = {
    open: PropTypes.bool
};

export default DrawerHeader;
