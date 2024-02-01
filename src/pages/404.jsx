import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Button, Container, Typography } from '@mui/material';

const Page = () => (
  <>
    <Helmet>
      <title>
        Error: No encontrado | C:N Calculator
      </title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.paper',
        flexGrow: 1
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          px: 5,
          py: 14,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            '& img': {
              maxWidth: '100%'
            }
          }}
        >
          <img src="/assets/illustration-not-found.svg" />
        </Box>
        <Typography
          align="center"
          sx={{ my: 2 }}
          variant="h3"
        >
          No encontrado
        </Typography>
        <Typography
          align="center"
          color="text.secondary"
          variant="body2"
        >
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </Typography>
        <Button
          to="/"
          component={RouterLink}
          sx={{ mt: 2 }}
        >
          Volver al inicio
        </Button>
      </Container>
    </Box>
  </>
);

export default Page;
