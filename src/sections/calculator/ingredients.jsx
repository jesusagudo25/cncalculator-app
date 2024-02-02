import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Stack,
  TextField,
} from '@mui/material';

//data file ingredients.json
import ingredientsData from '../../data/ingredients.json';
import { CheckBox } from '@mui/icons-material';

export const Ingredients = (props) => {

  //recibir props
  const { formData, setFormData } = props;

  //filter ingredientsData, two lists: formData.cn < carbon_nitrogen
  const cn = formData.cn;
  console.log(cn);
  const filteredLessIngredients = ingredientsData.filter((item) => item.carbon_nitrogen <= cn);
  const filteredMoreIngredients = ingredientsData.filter((item) => item.carbon_nitrogen > cn);


  const handleSubmit = (values) => {
    // Lógica para manejar el envío del formulario
    console.log(values);
  };

  // Generar opciones de checkbox dinámicamente
  const checkboxLessOptions = filteredLessIngredients.map((item, index) => ({
    label: item.name, // Propiedad en tu objeto de datos que proporciona la etiqueta
    value: `checkboxFields[${item.id}]`, // Propiedad en tu objeto de datos que proporciona el valor
    id: item.id
  }));

  const checkboxMoreOptions = filteredMoreIngredients.map((item, index) => ({
    label: item.name, // Propiedad en tu objeto de datos que proporciona la etiqueta
    value: `checkboxFields[${item.id}]`, // Propiedad en tu objeto de datos que proporciona el valor
    id: item.id
  }));

  return (
    <div>
      <Card sx={{ p: 5 }}>
        <Formik
          initialValues={{
            checkboxFields: Array(checkboxLessOptions.length + checkboxMoreOptions.length).fill(false),
          }}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form >
              <Box >

                <Stack spacing={5} direction="row" justifyContent="center">
                  <Stack spacing={3} sx={{ width: '40%' }} alignItems="flex-end">
                    {checkboxLessOptions.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            checked={formikProps.values.checkboxField}
                            onChange={formikProps.handleChange}
                            onBlur={formikProps.handleBlur}
                            name={`checkboxFields[${option.id}]`}
                            color="primary"
                          />
                        }
                        sx={{ direction: 'rtl' }}
                        label={option.label}
                      />
                    ))}
                    <ErrorMessage name="checkboxFields" component="div" />
                  </Stack>
                  <Divider orientation="vertical" flexItem sx={{ borderColor: '#bdbdbd' }} />
                  <Stack spacing={3} sx={{ width: '40%' }} alignItems="flex-start">
                    {checkboxMoreOptions.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            checked={formikProps.values.checkboxField}
                            onChange={formikProps.handleChange}
                            onBlur={formikProps.handleBlur}
                            name={`checkboxFields[${option.id}]`}
                            color="primary"
                          />
                        }
                        label={option.label}
                      />
                    ))}
                    <ErrorMessage name="checkboxFields" component="div" />
                  </Stack>
                </Stack>

                {/* Submit button (Rodeado con un Box) */}

                <Box sx={{ mt: 3 }}>
                  <Button
                    color="primary"
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Guardar
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
