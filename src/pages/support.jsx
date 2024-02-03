import { Helmet } from 'react-helmet-async';

import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  FormHelperText,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
  Link
} from '@mui/material';
import ReactPlayer from 'react-player';


const Page = () => {


  return (
    <>
      <Helmet>
        <title>
          Soporte | C:N Calculator
        </title>
      </Helmet>
      <Box
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">
                Soporte
              </Typography>
            </div>
            <Stack spacing={3} direction="row">

                <Card sx={{ width: '50%' }}>
                  <Stack
                    spacing={3}
                    sx={{ p: 3 }}
                  >
                    <Typography variant="h4">
                      Funcionalidades de la aplicación
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', borderRadius: 1, overflow: 'hidden' }}>
                      <ReactPlayer
                        url="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
                        width="100%"
                        height="100%"
                        controls
                      />
                    </Box>
                  </Stack>
                </Card>

                <Card sx={{ width: '50%' }}>
                  <Stack
                    spacing={3}
                    sx={{ p: 3 }}
                  >
                    <Typography variant="h4">
                      Contacto
                    </Typography>
                    <Typography
                    color="text.secondary"
                    variant="body2"
                  >
                    Puedes contactarnos a través de los siguientes medios:
                    {' '}
                    <ul>
                      <li>
                        <Link
                          color="primary"
                          href="mailto:a"
                          target="_blank"
                          variant="inherit"
                        >
                          Correo electrónico
                        </Link>
                      </li>
                      <li>
                        <Link
                          color="primary"
                          href="https://www.facebook.com/"
                          target="_blank"
                          variant="inherit"
                        >
                          Facebook
                        </Link>
                      </li>
                      <li>
                        <Link
                          color="primary"
                          href="https://www.instagram.com/"
                          target="_blank"
                          variant="inherit"
                        >
                          Instagram
                        </Link>
                      </li>
                      <li>
                        <Link
                          color="primary"
                          href="https://www.linkedin.com/"
                          target="_blank"
                          variant="inherit"
                        >
                          LinkedIn
                        </Link>
                      </li>
                      <li>
                        <Link
                          color="primary"
                          href="https://www.twitter.com/"
                          target="_blank"
                          variant="inherit"
                        >
                          Twitter
                        </Link>
                      </li>
                    </ul>

                    
                  </Typography>
                  </Stack>
                </Card>

                <Card sx={{ width: '50%' }}>
                  <Stack
                    spacing={3}
                    sx={{ p: 3 }}
                  >
                    <Typography variant="h4">
                      Aspectos agronómicos
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', borderRadius: 1, overflow: 'hidden' }}>
                      <ReactPlayer
                        url="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
                        width="100%"
                        height="100%"
                        controls
                      />
                    </Box>
                  </Stack>
                </Card>

              </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
