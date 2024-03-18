import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { GeneralData } from './general-data';
import { Ingredients } from './ingredients';
import { Results } from './results';
import { Card, Stack } from '@mui/material';

const steps = ['Datos generales', 'Selección de ingredientes', 'Resultado'];

export const StepsGeneral = (props) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [formData, setFormData] = React.useState({});

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    console.log(formData);

    const {cn } = formData.generalData ? formData.generalData : 0;

    if (activeStep === 0 && !formData.generalData) {
      alert('Por favor, complete los datos generales');
      return;
    }

    if (activeStep === 1 && !formData.ingredients) {
      alert('Por favor, seleccione los ingredientes');
      return;
    }

    if(activeStep === 1 && formData.ingredients.length ){
      console.log('No hay ingredientes seleccionados');
      const countCnLess = formData.ingredients.filter((item) => item.carbon_nitrogen <= cn).length;
      const countCnMore = formData.ingredients.filter((item) => item.carbon_nitrogen > cn).length;
      if(countCnLess < 1){
        alert('No hay ingredientes con C:N menor o igual a ' + cn);
        return;
      }
      if(countCnMore < 1){
        alert('No hay ingredientes con C:N mayor a ' + cn);
        return;
      }
    }
      
    
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    //setActiveStep(0);
    location.reload();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <div>
            <Card sx={{ p: 5 }}>
              <Box >
                <Stack spacing={3}>
                  <img src="/assets/images/fertilizer.png" alt="logo" style={{ width: '100px', height: '100px', margin: 'auto' }} />
                  <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }} variant="h4">
                    ¡Gracias {formData.generalData.name} por utilizar nuestra calculadora!
                  </Typography>
                  <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }} variant="body1">
                    Por favor, tome nota de los resultados y no olvide guardarlos.
                  </Typography>
                </Stack>
              </Box>
            </Card>
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reiniciar</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>

          {
            activeStep === 0 ? <GeneralData formData={formData} setFormData={setFormData} /> :
              activeStep === 1 ? <Ingredients formData={formData} setFormData={setFormData} /> :
                activeStep === 2 ? <Results formData={formData} setFormData={setFormData} /> : null
          }

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atrás
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

StepsGeneral.propTypes = {

};