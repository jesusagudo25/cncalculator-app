import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CalculateOutlined from '@mui/icons-material/CalculateOutlined';
import HelpOutline from '@mui/icons-material/HelpOutline';
import AutoStoriesOutlined from '@mui/icons-material/AutoStoriesOutlined';
import StarOutline from '@mui/icons-material/StarOutline';
import Close from '@mui/icons-material/Close';
import CalculatorPage from '../pages/calculator';
import { useOffline } from '../pwa';
import '../style/app.css';
const tabs = [['', 'Calculadora', CalculateOutlined], ['support', 'Soporte', HelpOutline], ['blog', 'Blog', AutoStoriesOutlined], ['premium', 'Premium', StarOutline]];
const features = [['Actualización', 'Valores de C:N actualizados y nuevos ingredientes'], ['Humedad', 'Trabaja con valores de humedad'], ['Costo de compost', 'Estima el costo del compost por unidad producida'], ['Costo mínimo', 'Combinación de ingredientes de costo mínimo para mercados competitivos'], ['Ingredientes almacenados', 'Cálculo de mezclas con ingredientes almacenados dentro de tu empresa'], ['Soporte prioritario', 'Ayuda para resolver tus dudas y problemas']];
export default function AppShell() {
 const location = useLocation(), navigate = useNavigate();
 const panel = location.pathname.slice(1);
 const active = ['support', 'blog', 'premium'].includes(panel) ? panel : '';
 const { online, ready } = useOffline();
 const [install, setInstall] = useState(null);
 useEffect(() => { const prompt = e => { e.preventDefault(); setInstall(e); }; const done = () => setInstall(null); window.addEventListener('beforeinstallprompt', prompt); window.addEventListener('appinstalled', done); return () => { window.removeEventListener('beforeinstallprompt', prompt); window.removeEventListener('appinstalled', done); }; }, []);
 const close = () => location.state?.overlay ? navigate(-1) : navigate('/', { replace: true });
 const nav = <nav aria-label="Navegación principal">{tabs.map(([path,label,Icon]) => <button key={path} aria-current={active === path ? 'page' : undefined} onClick={() => path ? navigate('/'+path, {state:{overlay:location.state?.overlay || !active}, replace:!!active}) : active ? close() : navigate('/',{replace:true})}><Icon/><span>{label}</span></button>)}</nav>;
 const external = (href,label) => <Button component="a" href={online ? href : undefined} disabled={!online} target="_blank" rel="noopener noreferrer" variant="contained">{label} ↗</Button>;
 return <div className="app-shell"><a className="skip-link" href="#calculator">Ir a la calculadora</a>
 <header className="app-header"><a className="brand" href="/" onClick={e => {e.preventDefault(); active ? close() : navigate('/');}}><img src="/assets/logo.png" alt=""/><span>C:N <strong>Calculator</strong><small>Mezclas con propósito</small></span></a><div className="desktop-nav">{nav}</div><span className={'connection '+(!online?'offline':'')} role="status"><i/>{!online?'Sin conexión':ready?'Disponible offline':'En línea'}</span></header>
 <main id="calculator"><CalculatorPage/>{install && <Button onClick={async () => {await install.prompt(); setInstall(null);}}>Instalar aplicación</Button>}</main>
 <footer>© {new Date().getFullYear()} C:N Calculator. Todos los derechos reservados.</footer><div className="mobile-nav">{nav}</div>
 <Dialog open={!!active} onClose={close} fullWidth maxWidth="sm" className="context-dialog" aria-labelledby="panel-title"><DialogTitle id="panel-title">{tabs.find(([path])=>path===active)?.[1]}<IconButton aria-label="Cerrar panel" onClick={close} sx={{position:'absolute',right:12,top:12}}><Close/></IconButton></DialogTitle><DialogContent>
 {!online && <p className="offline-notice">Puedes seguir calculando sin conexión. Los enlaces externos y el envío de mensajes necesitan internet.</p>}
 {active==='support' && <div className="panel-content"><h2>Te acompañamos en cada mezcla.</h2><p>Define tus datos, elige ingredientes de ambos grupos y consulta las cantidades recomendadas. Puedes exportar tus resultados a Excel.</p><h3>Aspectos generales sobre el compostaje</h3><p>Conoce las bases del compostaje y de C:N Calculator.</p><video controls preload="none" src="/assets/videos/composting.mp4" aria-label="Aspectos generales del compostaje"/><h3>Cómo usar C:N Calculator</h3><video controls preload="none" src="/assets/videos/how-to-use.mp4" aria-label="Tutorial de la calculadora"/><p>Los videos locales están incluidos en la descarga offline.</p><a href="mailto:info@cncalculator.com">info@cncalculator.com</a><div className="panel-links">{external('https://www.linkedin.com/in/cncalculator','LinkedIn')}{external('https://www.twitter.com/cncalculator','X')}</div></div>}
 {active==='blog' && <div className="panel-content"><span className="eyebrow">SIGUE APRENDIENDO</span><h2>Más ideas para tu compostaje.</h2><p>Visita el blog de C:N Calculator para explorar su contenido sobre compostaje. Se abrirá en otra pestaña para conservar tu mezcla aquí.</p>{external('https://compostconcncalculator.blogspot.com/','Abrir el blog completo')}<p>El blog es un recurso externo y no está disponible offline.</p></div>}
 {active==='premium' && <div className="panel-content"><span className="eyebrow">PLAN PREMIUM</span><h2>Más que una calculadora.</h2><p>Conoce las opciones del plan para tu negocio y consulta al equipo cómo comenzar.</p><div className="feature-grid">{features.map(([title,description])=><article key={title}><StarOutline/><h3>{title}</h3><p>{description}</p></article>)}</div>{external('https://wa.me/573008888888?text=Hola%20me%20gustaría%20saber%20más%20sobre%20el%20plan%20premium','Consultar por WhatsApp')}</div>}
 </DialogContent></Dialog></div>;
}

