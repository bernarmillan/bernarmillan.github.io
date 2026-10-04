// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://bernardomillan.is-a.dev',
  base: '/',
  build: {
    // Mete el CSS dentro del HTML: una petición bloqueante menos en la carga.
    inlineStylesheets: 'always'
  },
  vite: {
    plugins: [tailwindcss()]
  },
  // Cabeceras en `astro dev` y `astro preview`. Sin ellas, Safari (iPad)
  // conservaba una copia vieja del HTML: el formulario que se enviaba era el
  // antiguo y FormSubmit volvió a pedir reactivación. En producción esto no
  // aplica (el hosting pone sus propias cabeceras de caché).
  server: {
    headers: {
      'Cache-Control': 'no-store'
    }
  }
});