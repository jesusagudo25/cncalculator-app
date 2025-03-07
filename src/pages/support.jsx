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
            <div>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={4}
                >
                  <Stack spacing={1}>
                    <Typography variant="h6">
                      Aspectos generales sobre el compostaje
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                    >
                      Los novatos en el tema encontrarán en este apartado nociones básicas que le guiarán en sus primeras experiencias de compostaje; mientras que los más expertos identificarán las bases teóricos que dan origen a C:N calculator.
                      <br />
                      <br />
                      A continuación, te presentamos los aspectos generales sobre el compostaje que debes conocer para sacar el máximo provecho de la calculadora.
                    </Typography>
                  </Stack>
                </Grid>
                <Grid
                  xs={12}
                  md={8}
                >
                  <Card>
                    <Stack

                      sx={{ p: 3, gap: 2, alignItems: 'center', justifyContent: 'center' }}
                      flexDirection={{ xs: 'column', md: 'row' }}
                    >

                      <Stack spacing={3} direction="column" sx={{ alignItems: 'center', justifyContent: 'center' }}>
                        <ReactPlayer
                          url="/assets/videos/composting.mp4"
                          controls
                          style={{ borderRadius: 8 }}
                        />
                        <Typography color="text.secondary"
                          variant="body2">
                          ¿Necesitas ayuda? <Link href="mailto:info@cncalculator.com" color="primary">Contáctanos</Link>
                        </Typography>
                      </Stack>


                      <Stack spacing={3} direction="column">
                        <Link href="mailto:info@cncalculator.com">
                          <Avatar
                            alt="Email"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Email_icon.png"
                            sx={{ width: 35, height: 35 }}
                          />
                        </Link>

                        <Link href="https://www.linkedin.com/in/cncalculator">
                          <Avatar
                            alt="LinkedIn"
                            src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png"
                            sx={{ width: 35, height: 35 }}
                          />

                        </Link>

                        <Link href="https://www.twitter.com/cncalculator">
                          <Avatar
                            alt="X"
                            src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?w=740&t=st=1710128335~exp=1710128935~hmac=89628088b195563fe404c00a3d2d9812b026eb919661d0faaa4da1578da7dcfa"
                            sx={{ width: 35, height: 35 }}
                          />

                        </Link>

                      </Stack>
                    </Stack>
                  </Card>
                </Grid>
                <Grid
                  xs={12}
                  md={4}
                >
                  <Stack spacing={1}>
                    <Typography variant="h6">
                      Como usar C:N calculator
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                    >
                      Amigo usuario, tienes a tu disposición una herramienta que simplifica el cálculo de las cantidades de insumos o ingredientes para tu compostaje, centrándose  en la relación Carbono: Nitrogeno (C:N). En este apartado aprenderás a usar los cuadros de dialogo disponible en la calculadora C:N calculator y podrás obtener las “recetas” o “formulas” para tu abono compost.
                      <br />
                      <br />
                      Si te gusta investigar  encontrarás la  oportunidad para realizar ensayos o experimentos y si eres emprendedor tendrás nuevos productos que ofertar.
                      <br />
                      <br />
                      A continuación, te presentamos un video tutorial sobre cómo usar la calculadora C:N.
                    </Typography>
                  </Stack>
                </Grid>
                <Grid
                  xs={12}
                  md={8}
                >
                  <Card>
                    <Stack

                      sx={{ p: 3, gap: 2, alignItems: 'center', justifyContent: 'center' }}
                      flexDirection={{ xs: 'column', md: 'row' }}
                    >

                      <Stack spacing={3} direction="column" sx={{ alignItems: 'center', justifyContent: 'center' }}>
                        <ReactPlayer
                          url="/assets/videos/how-to-use.mp4"
                          controls
                          style={{ borderRadius: 8 }}
                        />
                        <Typography color="text.secondary"
                          variant="body2">
                          ¿Necesitas ayuda? <Link href="mailto:info@cncalculator.com" color="primary">Contáctanos</Link>
                        </Typography>
                      </Stack>

                      <Stack spacing={3} direction="column">
                        <Link href="mailto:info@cncalculator.com">
                          <Avatar
                            alt="Email"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Email_icon.png"
                            sx={{ width: 35, height: 35 }}
                          />
                        </Link>

                        <Link href="https://www.linkedin.com/in/cncalculator">
                          <Avatar
                            alt="LinkedIn"
                            src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png"
                            sx={{ width: 35, height: 35 }}
                          />

                        </Link>

                        <Link href="https://www.twitter.com/cncalculator">
                          <Avatar
                            alt="X"
                            src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?w=740&t=st=1710128335~exp=1710128935~hmac=89628088b195563fe404c00a3d2d9812b026eb919661d0faaa4da1578da7dcfa"
                            sx={{ width: 35, height: 35 }}
                          />

                        </Link>

                      </Stack>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </div>
            {/*             <Stack spacing={3} >

              <Card sx={{ width: '100%' }}>
                <Stack spacing={3} direction="column" sx={{ p: 1.5, alignItems: 'center', justifyContent: 'center' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      borderRadius: 1,
                      overflow: 'hidden',
                      alignItems: 'center',
                      flexDirection: 'column',

                      gap: 2
                    }}
                  >
                    <Typography variant="h3">
                      Aspectos fundamentales de la agronomía
                    </Typography>

                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ textAlign: 'justify' }}
                    >
                      La calculadora C:N es una herramienta que te permite calcular la relación Carbono:Nitrógeno de tus suelos, con el fin de ayudarte a tomar decisiones informadas sobre el manejo de tus cultivos. A continuación, te presentamos los aspectos fundamentales de la agronomía que debes conocer para sacar el máximo provecho de la calculadora.
                    </Typography>

                    <ReactPlayer
                      url="/assets/agronomy.mp4"
                      controls
                      style={{ borderRadius: 8 }}
                    />

                    <Typography variant="h6">
                      ¿Necesitas ayuda?
                    </Typography>

                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ textAlign: 'justify' }}
                    >
                      Si tienes alguna pregunta o necesitas ayuda con la calculadora, no dudes en contactarnos. Estamos aquí para ayudarte.
                    </Typography>

                    <Stack spacing={3} direction="row" sx={{ p: 1.5, alignItems: 'center', justifyContent: 'center' }}>
                      <Link href="mailto:info@cncalculator.com">
                        <Avatar
                          alt="Email"
                          src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Email_icon.png"
                        />
                      </Link>

                      <Link href="https://www.linkedin.com/in/cncalculator">
                        <Avatar
                          alt="LinkedIn"
                          src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png"
                        />

                      </Link>

                      <Link href="https://www.twitter.com/cncalculator">
                        <Avatar
                          alt="X"
                          src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?w=740&t=st=1710128335~exp=1710128935~hmac=89628088b195563fe404c00a3d2d9812b026eb919661d0faaa4da1578da7dcfa"
                        />

                      </Link>

                    </Stack>
                    



                  </Box>
                </Stack>

              </Card>

            </Stack> */}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
