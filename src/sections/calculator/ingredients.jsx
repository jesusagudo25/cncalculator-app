import { useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import ingredientsData from '../../data/ingredients.json';
export function Ingredients({formData,setFormData}) {
 const [query,setQuery]=useState('');
 const cn=formData.generalData.cn;
 const initialValues=Object.fromEntries(ingredientsData.map(item=>[item.id,formData.ingredients?.some(selected=>selected.id===item.id)||false]));
 const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 return <Formik initialValues={initialValues} onSubmit={values=>setFormData({...formData,ingredients:ingredientsData.filter(item=>values[item.id])})}>{formik=><Form>
 <TextField label="Buscar ingrediente" value={query} onChange={e=>setQuery(e.target.value)} fullWidth sx={{mt:3}}/>
 <p aria-live="polite">{Object.values(formik.values).filter(Boolean).length} ingredientes seleccionados</p>
 <div className="ingredient-grid">{[true,false].map(less=>{
 const items=ingredientsData.filter(item=>(less?item.carbon_nitrogen<=cn:item.carbon_nitrogen>cn)&&normalize(item.name).includes(normalize(query)));
 return <section className="ingredient-group" key={String(less)}><h3>C:N {less?'menor o igual a':'mayor a'} {cn}</h3>{items.map(item=><FormControlLabel className="ingredient-option" key={item.id} control={<Checkbox name={String(item.id)} checked={formik.values[item.id]} onChange={formik.handleChange}/>} label={item.name}/>)}{!items.length&&<p>No hay coincidencias en este grupo.</p>}</section>;
 })}</div><Button type="submit" variant="contained" size="large">Calcular mi mezcla</Button></Form>}</Formik>;
}
