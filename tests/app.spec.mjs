import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
const data=JSON.parse(readFileSync('src/data/ingredients.json','utf8'));
const low=data.find(item=>item.carbon_nitrogen<='30');
const high=data.find(item=>item.carbon_nitrogen>'30');
async function general(page) {
 await page.getByLabel('Nombre completo').fill('Prueba compost');
 await page.getByRole('button',{name:'Continuar a ingredientes'}).click();
}
async function calculate(page) {
 await page.getByRole('checkbox',{name:low.name,exact:true}).check();
 await page.getByRole('checkbox',{name:high.name,exact:true}).check();
 await page.getByRole('button',{name:'Calcular mi mezcla'}).click();
 await expect(page.getByRole('table')).toBeVisible();
}
test('móvil: flujo, paneles conservan datos, validación y resultados originales',async ({page})=>{
 await page.setViewportSize({width:360,height:800});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');
 await page.getByLabel('Nombre completo').fill('Prueba compost');
 await page.getByRole('button',{name:'Soporte',exact:true}).filter({visible:true}).click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await page.getByRole('button',{name:'Cerrar panel'}).click();
 await expect(page.getByLabel('Nombre completo')).toHaveValue('Prueba compost');
 await general(page);
 await page.getByRole('button',{name:'Calcular mi mezcla'}).click();
 await expect(page.getByRole('alert')).toBeVisible();
 await calculate(page);
 const C1=Number(low.carbon),C2=Number(high.carbon),N1=Number(low.nitrogen),N2=Number(high.nitrogen);
 const expectedLow=Math.round((30*(C2-30*N2)/((C2-C1)+30*N1-30*N2)+Number.EPSILON)*100)/100;
 const expectedHigh=Math.round((30*(30*N1-C1)/((C2-C1)+30*N1-30*N2)+Number.EPSILON)*100)/100;
 await expect(page.getByRole('row').filter({hasText:low.name})).toContainText(`${expectedLow} Libras`);
 await expect(page.getByRole('row').filter({hasText:high.name})).toContainText(`${expectedHigh} Libras`);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:'test-results/mobile-results.png',fullPage:true});
 expect(errors).toEqual([]);
});
test('producción: recarga offline, Excel sin visita previa y videos locales',async ({page,context})=>{
 await page.goto('/');
 await expect(page.getByRole('status')).toHaveText('Disponible offline',{timeout:60000});
 await page.evaluate(()=>navigator.serviceWorker.ready);
 await context.setOffline(true);
 await page.reload();
 await expect(page.getByRole('status')).toHaveText('Sin conexión');
 await general(page);await calculate(page);
 const downloadPromise=page.waitForEvent('download');
 await page.getByRole('button',{name:'Exportar a Excel'}).click();
 const download=await downloadPromise;
 expect(download.suggestedFilename()).toBe('results.xlsx');
 expect(await download.failure()).toBeNull();
 await page.goto('/support');
 await expect(page.getByRole('dialog')).toBeVisible();
 const response=await page.evaluate(async()=>{const r=await fetch('/assets/videos/composting.mp4',{headers:{Range:'bytes=0-99'}});return {status:r.status,size:(await r.arrayBuffer()).byteLength};});
 expect(response).toEqual({status:206,size:100});
 await page.getByRole('button',{name:'Cerrar panel'}).click();
 await page.getByRole('button',{name:'Blog',exact:true}).filter({visible:true}).click();
 await expect(page.getByText('Abrir el blog completo')).toHaveAttribute('aria-disabled','true');
});
test('responsive y rutas de compatibilidad',async ({page})=>{
 for(const width of [360,390,768,1024,1440]) {
  await page.setViewportSize({width,height:900});await page.goto('/calculator');
  await expect(page.getByLabel('Nombre completo')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:`test-results/layout-${width}.png`,fullPage:true});
 }
 await page.goto('/premium');await expect(page.getByRole('dialog')).toBeVisible();
 await page.getByRole('button',{name:'Cerrar panel'}).click();await expect(page).toHaveURL('/');
 await page.getByRole('button',{name:'Soporte',exact:true}).filter({visible:true}).click();await page.goBack();
 await expect(page.getByRole('dialog')).not.toBeVisible();
});
