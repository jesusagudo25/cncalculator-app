import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Box, Link, Stack, Typography } from '@mui/material';
import { Logo } from 'src/components/logo';

const TOP_NAV_HEIGHT = 64;

export const TopNav = () => (
  <Box
    component="header"
    sx={{
      backgroundColor: 'neutral.900',
      color: 'common.white',
      position: 'fixed',
      width: '100%',
      zIndex: (theme) => theme.zIndex.appBar
    }}
  >
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        minHeight: TOP_NAV_HEIGHT,
        px: 3
      }}
    >
      <Stack
        alignItems="center"
        direction="row"
        spacing={2}
      >
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: 'inline-flex',
            height: 42,
            width: 42
          }}
        >
          <Logo />
        </Box>
        <Typography
          color="inherit"
          variant="h6"
        >
          C:N Calculator
        </Typography>
      </Stack>
      <Stack
        alignItems="center"
        direction="row"
        spacing={2}
      >
        <Link
          color="inherit"
          href="#"
          target="_blank"
          variant="body2"
        >
          Obten versión Premium
        </Link>
        <Avatar
          src="https://cdn-icons-png.flaticon.com/512/227/227671.png"
          variant="rounded"
        />
      </Stack>
    </Stack>
  </Box>
);
