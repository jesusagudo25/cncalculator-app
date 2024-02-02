import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Stack,
  TextField,
} from '@mui/material';

//data file ingredients.json
import ingredientsData from '../../data/ingredients.json';
import { CheckBox } from '@mui/icons-material';

export const Ingredients = () => {

  const handleSubmit = (values) => {
    // Lógica para manejar el envío del formulario
    console.log(values);
  };

  // Generar opciones de checkbox dinámicamente
  const checkboxOptions = ingredientsData.map((item, index) => ({
    label: item.name, // Propiedad en tu objeto de datos que proporciona la etiqueta
    value: `checkboxFields[${index}]`, // Nombre de campo de formulario
  }));

  console.log(checkboxOptions);


  return (
    <div>
      <Card sx={{ p: 5 }}>
        <Formik
          initialValues={{
            checkboxFields: Array(ingredientsData.length).fill(false),
          }}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form >
              <Box >
                <Stack spacing={3}>
                  {checkboxOptions.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={formikProps.values.checkboxField}
                          onChange={formikProps.handleChange}
                          onBlur={formikProps.handleBlur}
                          name={`${index}`}
                          color="primary"
                        />
                      }
                      label={option.label}
                    />
                  ))}
                  <ErrorMessage name="checkboxFields" component="div" />
                </Stack>

                {/* Submit button (Rodeado con un Box) */}

                <Box sx={{ mt: 3 }}>
                  <Button
                    color="primary"
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Save settings
                  </Button>
                  </Box>

              </Box>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  )
}

Ingredients.propTypes = {}
