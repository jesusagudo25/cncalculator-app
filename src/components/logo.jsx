import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

export const Logo = (props) => {
  const { color: colorProp = 'primary' } = props;
  const theme = useTheme();

  const color = colorProp === 'primary'
    ? theme.palette.primary.main
    : colorProp === 'black'
      ? '#1D262D' : '#FFFFFF';

  return (
    <img alt="Logo" src="/assets/logo.png"  />
  );
};

Logo.propTypes = {
  color: PropTypes.oneOf(['black', 'primary', 'white'])
};
