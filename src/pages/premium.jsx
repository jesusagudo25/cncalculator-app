import { Helmet } from 'react-helmet-async';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import DocumentTextIcon from '@heroicons/react/24/solid/DocumentTextIcon';
import HomeIcon from '@heroicons/react/24/solid/HomeIcon';
import ShoppingCartIcon from '@heroicons/react/24/solid/ShoppingCartIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import StarIcon from '@heroicons/react/24/solid/StarIcon';
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
    icon: CogIcon,
    name: 'Automation',
    description: 'Save time and money with our automation tools'
  },
  {
    icon: DocumentTextIcon,
    name: 'Reports',
    description: 'Get detailed reports of your sales and performance'
  },
  {
    icon: HomeIcon,
    name: 'Real-time data',
    description: 'Get real-time data on your website and sales'
  },
  {
    icon: StarIcon,
    name: 'Premium support',
    description: 'Get priority support from our team'
  },
  {
    icon: CurrencyDollarIcon,
    name: 'Unlimited budget',
    description: 'No limits on your sales or budget'
  },
  {
    icon: ShoppingBagIcon,
    name: 'Unlimited products',
    description: 'No limits on your products or services'
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
                    color="primary"

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
