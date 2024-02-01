import { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { subHours, subMinutes } from 'date-fns';
import { Box, Button, Card, Container, Divider, Stack, Typography } from '@mui/material';
import { StepsGeneral } from 'src/sections/calculator/steps-general';

const Page = () => {

  return (
    <>
      <Helmet>
        <title>
          Calculator | C:N Calculator
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
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Typography variant="h4">
                ¿Qué quieres hacer hoy?
              </Typography>

            </Stack>
            <div>
              <Card sx={{ p: 3 }}>
                <StepsGeneral />
              </Card>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
