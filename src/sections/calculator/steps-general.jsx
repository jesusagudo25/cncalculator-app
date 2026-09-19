import { useEffect, useRef, useState } from 'react';
import { Alert, Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import { GeneralData } from './general-data';
import { Ingredients } from './ingredients';
import { Results } from './results';
const steps = ['Datos generales', 'Ingredientes', 'Resultados'];
export function StepsGeneral() {
 const [activeStep,setActiveStep]=useState(0);
 const [formData,setFormData]=useState({});
 const [error,setError]=useState('');
 const heading=useRef(null);
 useEffect(()=>{if(activeStep>0) heading.current?.focus();},[activeStep]);
 const saveGeneral = data => {setFormData(data);setError('');setActiveStep(1);};
 const saveIngredients = data => {
  const cn=data.generalData.cn;
  setFormData(data);
  if (!data.ingredients.some(item=>item.carbon_nitrogen<=cn)) {setError('Selecciona al menos un ingrediente con C:N menor o igual a '+cn+'.');return;}
  if (!data.ingredients.some(item=>item.carbon_nitrogen>cn)) {setError('Selecciona al menos un ingrediente con C:N mayor a '+cn+'.');return;}
  setError('');setActiveStep(2);
 };
 return <Box sx={{width:'100%'}}><Stepper activeStep={activeStep}>{steps.map(label=><Step key={label}><StepLabel>{label}</StepLabel></Step>)}</Stepper>
 <div className="step-intro"><h2 ref={heading} tabIndex={-1}>{['Define tu mezcla','Elige tus ingredientes','Tu mezcla, lista para preparar'][activeStep]}</h2><p>{['Indica el peso total, la unidad y la relación C:N que buscas.','Selecciona al menos un ingrediente de cada grupo.','Consulta las cantidades y guarda una copia de tus resultados.'][activeStep]}</p></div>
 {activeStep>0 && <div className="summary-strip"><span>Peso total<strong>{formData.generalData.weight} {formData.generalData.units}</strong></span><span>C:N objetivo<strong>{formData.generalData.cn}:1</strong></span></div>}
 {error && <Alert severity="warning" sx={{mt:2}}>{error}</Alert>}
 {activeStep===0 ? <GeneralData formData={formData} setFormData={saveGeneral}/> : activeStep===1 ? <Ingredients formData={formData} setFormData={saveIngredients}/> : <Results formData={formData} setFormData={setFormData}/>}
 {activeStep>0 && <Box className="wizard-actions" sx={{display:'flex',justifyContent:'space-between'}}><Button color="inherit" onClick={()=>{setError('');setActiveStep(activeStep-1);}}>Atrás</Button>{activeStep===2 && <Button onClick={()=>{setFormData({});setError('');setActiveStep(0);}}>Nueva mezcla</Button>}</Box>}
 </Box>;
}
