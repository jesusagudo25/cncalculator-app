import { Helmet } from 'react-helmet-async';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Card,
  FormHelperText,
  MenuItem,
  Stack,
  TextField,
  Unstable_Grid2 as Grid,
  Button
} from '@mui/material';

const unitsOptions = ['Libras', 'Kilogramos', 'Gramos', 'Miligramos'];

const initialValues = {
  units: 'Libras',
  weight: '30',
  cn: '30',
  name: '',
  submit: null
};

const validationSchema = Yup.object({
  name: Yup
    .string()
    .max(255)
    .required('Nombre es requerido'),
  units: Yup
    .string()
    .max(255)
    .required('Unidades es requerido'),
  weight: Yup
    .number()
    .required('Peso es requerido')
    .min(1, 'El valor mínimo es 1')
    .max(100, 'El valor máximo es 100'),
  cn: Yup
    .number()
    .required('C:N es requerido')
    .min(25, 'El valor mínimo es 25')
    .max(30, 'El valor máximo es 30')
});


export const GeneralData = (props) => {

  //recibir props
  const { formData, setFormData } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      helpers.setStatus({ success: true });
      helpers.setSubmitting(false);
      setFormData(values);
    }
  });

  //submit form

  return (
    <div>
      <Card sx={{ p: 5 }}>
        <form onSubmit={formik.handleSubmit}>

          <Box >
            <Stack spacing={3}>
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Nombre completo"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                placeholder="Ingrese su nombre completo"
                type="text"
              />

              <TextField
                error={Boolean(formik.touched.units && formik.errors.units)}
                fullWidth
                helperText={formik.touched.units && formik.errors.units}
                label="Unidades"
                name="units"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                select
                value={formik.values.units}
              >
                {unitsOptions.map((unitOption) => (
                  <MenuItem
                    key={unitOption}
                    value={unitOption}
                  >
                    {unitOption}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                error={Boolean(formik.touched.weight && formik.errors.weight)}
                fullWidth
                helperText={formik.touched.weight && formik.errors.weight}
                label="Peso"
                name="weight"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.weight}
                placeholder="Ingrese su peso"
                type="number"
              />

              <TextField
                error={Boolean(formik.touched.cn && formik.errors.cn)}
                fullWidth
                helperText={formik.touched.cn && formik.errors.cn}
                label="C:N"
                name="cn"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.cn}
                placeholder="Ingrese el C:N"
                type="number"
              />

            </Stack>
            {formik.errors.submit && (
              <FormHelperText
                error
                sx={{ mt: 3 }}
              >
                {formik.errors.submit}
              </FormHelperText>
            )}

            <Box sx={{ mt: 3 }}>
              <Button
                color="primary"
                size="medium"
                type="submit"
                variant="contained"
              >
                Guardar
              </Button>
            </Box>

          </Box>
        </form>
      </Card>
    </div>

  )
}

GeneralData.propTypes = {}
