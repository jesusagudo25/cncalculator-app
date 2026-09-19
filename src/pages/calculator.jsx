import { Helmet } from 'react-helmet-async';
import { StepsGeneral } from '../sections/calculator/steps-general';
export default function CalculatorPage() {
  return <><Helmet><title>Calculadora | C:N Calculator</title></Helmet>
    <section className="calculator-heading"><div><span className="eyebrow">DEL INGREDIENTE AL COMPOST</span><h1>Tu próxima mezcla empieza aquí.</h1><p>Calcula las cantidades de tus ingredientes, paso a paso.</p></div><span className="leaf-mark" aria-hidden="true">↗</span></section>
    <section className="calculator-card" aria-label="Calculadora de compost"><StepsGeneral /></section><p className="local-note">Tus cálculos se realizan en este dispositivo.</p></>;
}
