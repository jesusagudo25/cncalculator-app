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
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

//data file ingredients.json
import ingredientsData from '../../data/ingredients.json';


export const Ingredients = (props) => {

  //recibir props
  const { formData, setFormData } = props;

  //filter ingredientsData, two lists: formData.cn < carbon_nitrogen
  const cn = formData.generalData.cn;

  const filteredLessIngredients = ingredientsData.filter((item) => item.carbon_nitrogen <= cn);
  const filteredMoreIngredients = ingredientsData.filter((item) => item.carbon_nitrogen > cn);

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

  const { ingredients } = formData;
  
  const initialValues = {}
  checkboxLessOptions.forEach((option) => {
    initialValues[`checkboxFields_${option.id}`] = ingredients ? ingredients.some((item) => item.id == option.id) : false; //true or false
  });
  console.log(initialValues);

  checkboxMoreOptions.forEach((option) => {
    initialValues[`checkboxFields_${option.id}`] = ingredients ? ingredients.some((item) => item.id == option.id) : false; //true or false
  });

  const handleSubmit = (values) => {
    // SetDataForm - ingredients Propiedad

    //get selected ingredients
    const selectedIngredients = [];
    for (const key in values) {
      if (values[key]) {
        const id = key.split('_')[1];
        //search ingredient by id
        const ingredient = ingredientsData.find((item) => item.id == id);

        selectedIngredients.push(ingredient);
      }
    }

    setFormData({
      ...formData,
      ingredients: selectedIngredients
    });

  };

  return (
    <div>
      <Card sx={{ p: 5 }}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            console.log(formikProps.values),
            <Form >
              <Box >
                <Typography variant="h4" sx={{ textAlign: 'center' }}>
                  Lista de ingredientes
                </Typography>

                <Stack spacing={5} direction="row" justifyContent="center" sx={{ mt: 3 }}>
                  <Stack spacing={3} sx={{ width: '40%' }} alignItems="flex-end">
                    <Typography variant="h6" sx={{ textAlign: 'center' }}>
                      Ingredientes con CN menor o igual a {cn}
                    </Typography>
                    {checkboxLessOptions.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            checked={formikProps.values[`checkboxFields_${option.id}`]}
                            onChange={formikProps.handleChange}
                            onBlur={formikProps.handleBlur}
                            name={`checkboxFields_${option.id}`}
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
                    <Typography variant="h6" sx={{ textAlign: 'center' }}>
                      Ingredientes con CN mayor a {cn}
                    </Typography>
                    {checkboxMoreOptions.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            checked={formikProps.values[`checkboxFields_${option.id}`]}
                            onChange={formikProps.handleChange}
                            onBlur={formikProps.handleBlur}
                            name={`checkboxFields_${option.id}`}
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

Ingredients.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired
}
