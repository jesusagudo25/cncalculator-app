import { Helmet } from 'react-helmet-async';

//import CogIcon from '@heroicons/react/24/solid/CogIcon';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import ChatBubbleOvalIcon from '@heroicons/react/24/solid/ChatBubbleOvalLeftIcon';
import FunnelIcon from '@heroicons/react/24/solid/FunnelIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import ChatBubbleBottomCenterTextIcon from '@heroicons/react/24/solid/ChatBubbleBottomCenterTextIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';

import {
  Box,
  Card,
  Container,
  Link,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  Avatar,
  Button,
  Divider
} from '@mui/material';

import { subDays, subHours, subMinutes } from 'date-fns';

import { OverviewFeatures } from 'src/sections/premium/overview-features';

const features = [
  {
    icon: ArrowPathIcon,
    name: 'Actualización',
    description: 'Valores de C:N actualizados y nuevos ingredientes'
  },
  {
    icon: ChatBubbleOvalIcon,
    name: 'Humedad',
    description: 'Cálculo de humedad en ingredientes'
  },
  {
    icon: FunnelIcon,
    name: 'Costo de compost',
    description: 'Calcula el costo de compostaje'
  },
  {
    icon: CurrencyDollarIcon,
    name: 'Costo minimo',
    description: 'Combinación de ingredientes de costo mínimo'
  },
  {
    icon: ChatBubbleBottomCenterTextIcon,
    name: 'Foros y grupos',
    description: 'Acceso a foros y grupos de discusión'
  },
  {
    icon: CogIcon,
    name: 'Soporte prioritario',
    description: 'Soporte prioritario en línea'
  }
];

const Page = () => (
  <>
    <Helmet>
      <title>
        Premium | C:N Calculator
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
              Plan Premium
            </Typography>
          </div>
          <div>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3} direction="column" sx={{ p: 1.5, alignItems: 'center', justifyContent: 'center' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: 1,
                    overflow: 'hidden',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '60%',
                    gap: 2  
                  }}
                >
                  <Typography variant="h3">
                    Más que una calculadora
                  </Typography>

                  <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{ textAlign: 'justify' }}
                  >
                    Con nuestro plan premium, obtienes acceso a una serie de características que te ayudarán a mejorar tu negocio. Desde la automatización hasta el soporte prioritario, tenemos todo lo que necesitas para llevar tu negocio al siguiente nivel.
                  </Typography>

                  <Button
                    sx={{ backgroundColor: '#F09E54', color: 'primary.contrastText',  '&:hover': { backgroundColor: '#FE8235' } }}
                    onClick={() => {
                      //enviar mesaje whatsapp
                      window.open('https://wa.me/573008888888?text=Hola%20me%20gustaría%20saber%20más%20sobre%20el%20plan%20premium', '_blank');
                    }}
                    
                    variant="contained"
                    size="large"
                  >
                    Comenzar
                  </Button>
                </Box>
              </Stack>
              <Divider sx={{ marginTop: '1rem' }} />
              <div style={{ marginTop: '2rem' }}>
                <Grid
                  container
                  spacing={3}
                >
                  {
                    features.map((feature) => (
                      <Grid
                        xs={12}
                        md={4}
                      >

                        <OverviewFeatures
                          icon={
                            <Avatar
                              sx={{
                                backgroundColor: 'primary.main',
                                color: 'primary.contrastText',
                                height: 56,
                                width: 56
                              }}
                            >
                              <SvgIcon>
                                <feature.icon />
                              </SvgIcon>
                            </Avatar>
                          }
                          label={feature.name}
                          value={feature.description}
                          key={feature.name}
                        />
                      </Grid>
                    ))
                  }




                </Grid>
              </div>
            </Card>

          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

export default Page;
