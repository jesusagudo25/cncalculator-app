import PropTypes from 'prop-types';
import { Card, Stack, Typography } from '@mui/material';

export const OverviewFeatures = (props) => {
  const { icon, label, value } = props;

  return (
    <Card>
      <Stack
        alignItems="center"
        direction="column"
        spacing={2}
        sx={{ p: 2, textAlign: 'center' }}
      >
        {icon}
        <div>
          <Typography
            color="text.secondary"
            variant="overline"
          >
            {label}
          </Typography>
          <Typography variant="body1">
            {value}
          </Typography>
        </div>
      </Stack>
    </Card>
  );
};

OverviewFeatures.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};
