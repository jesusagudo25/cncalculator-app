import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Card,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  SvgIcon
} from '@mui/material';
import ExcelIcon from '@mui/icons-material/Download';


export const Results = (props) => {

  const { formData, setFormData } = props;

  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const cn = parseFloat(formData.generalData.cn);
  const weight = parseFloat(formData.generalData.weight);
  const units = formData.generalData.units;

  const calculate = () => {

    let averageCarbonLess = 0;
    let averageCarbonMore = 0;
    let averageNitrogenLess = 0;
    let averageNitrogenMore = 0;

    let contLess = 0;
    let contMore = 0;

    formData.ingredients.forEach((item, index) => {
      if (item.carbon_nitrogen <= cn) {
        averageCarbonLess += parseFloat(item.carbon);
        console.log(averageCarbonLess);
        averageNitrogenLess += parseFloat(item.nitrogen);
        contLess++;
      } else {
        averageCarbonMore += parseFloat(item.carbon);
        averageNitrogenMore += parseFloat(item.nitrogen);
        contMore++;
      }


    })

    const C1 = averageCarbonLess / contLess;
    const C2 = averageCarbonMore / contMore;

    const N1 = averageNitrogenLess / contLess;
    const N2 = averageNitrogenMore / contMore;

    const partialWeightLess = weight * ((C2) - (cn * N2)) / ((C2 - C1) + (cn * N1) - (cn * N2));
    console.log(partialWeightLess);
    
    const partialWeightMore = weight * ((cn * N1) - (C1)) / ((C2 - C1) + (cn * N1) - (cn * N2));

    const minorDryLess = Math.round(((partialWeightLess / contLess) + Number.EPSILON) * 100) / 100
  
    const minorDryMore = Math.round(((partialWeightMore / contMore) + Number.EPSILON) * 100) / 100

    formData.ingredients.forEach((item, index) => {
      if (item.carbon_nitrogen <= cn) {
        result.push({
          ingredient_id: item.id,
          name: item.name,
          amount: minorDryLess,
        })
      } else {
        result.push({
          ingredient_id: item.id,
          name: item.name,
          amount: minorDryMore,
        })
      }
    });


    setResult(result);
    setIsLoading(false);
  };

  const exportToExcel = (data) => {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      saveAsExcelFile(excelBuffer, 'results');
    });
  }

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data = new Blob([buffer], { type: EXCEL_TYPE });
      FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    });
  }

  

  useEffect(() => {
    calculate();
  }, [formData]);

  return (
    <div>
      <Card sx={{ p: 5 }}>
        <Box >

          <Typography variant="h4" sx={{ textAlign: 'center', mt: 2 }}>
            Resultados
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
            En base a los datos ingresados, se recomienda la siguiente mezcla:
          </Typography>


          <Stack spacing={5} direction="row" justifyContent="center" sx={{ mt: 3 }}>

              <TableContainer sx={{ width: '100%', borderRadius: 2, boxShadow: 2, shadow: 2, border: 1, borderColor: 'divider' }}>
                <Table sx={{ width: "100%", tableLayout: "fixed", borderRadius: 2 }} >
                  <TableHead >
                    <TableRow>
                      <TableCell sx={{ textAlign: 'center', width: '50%' }}>
                        Ingredientes
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        Cantidad
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoading ? <TableRow><TableCell colSpan={2}>Cargando...</TableCell></TableRow> : result.map((row, index) => (
                      <TableRow
                        key={index}
                      >
                        <TableCell sx={{ textAlign: 'center' }}>
                          {row.name}
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          {row.amount} {units}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                

              </TableContainer>

          </Stack>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', pt: 2 }}>
            <Button onClick={() => exportToExcel(result)} sx={{ mt: 2, mb: 2, ml: 2 }} variant="contained" color="primary">
                Exportar a Excel
                <SvgIcon
                  fontSize="small"
                  color="white"
                  sx={{ ml: 1 }}
                >
                  <ExcelIcon />
                </SvgIcon>
            </Button>
          </Box>
        </Box>
      </Card>
    </div>
  )
}

Results.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func
}
