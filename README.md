# Nexo Impulso

Web de consultoría para pymes en España, creada con Astro 6 y Tailwind CSS 4. Genera HTML estático y solo usa JavaScript para el menú móvil y las preferencias de analítica.

## Instalar y ver en local

Con Node.js 22.12 o posterior, preferiblemente Node 24:

```sh
npm install
npm run dev
```

Abre la URL que muestra Astro. Para revisar la compilación de producción:

```sh
npm run build
npm run preview
```

La vista local permite revisar el HTML del formulario. Netlify gestiona y confirma los envíos en un despliegue con detección de formularios habilitada.

## Editar la web

| Qué cambiar | Archivo o carpeta |
| --- | --- |
| Nombre, dominio HTTPS, menú, correo, LinkedIn, Calendly y WhatsApp | `src/content/sitio.json` |
| Portada, CTA principal y preguntas frecuentes | `src/content/inicio.json` |
| Las tres páginas de servicio y sus resúmenes en la portada | `src/content/servicios/*.json` |
| Método y presentación | `src/content/como-trabajamos.md`, `src/content/quienes-somos.md` |
| Caso y resultado | `src/content/casos/proceso-credito.md` |
| Test, preguntas, recomendaciones y consentimiento opcional | `src/content/test-madurez.json` |
| Formulario y confirmación | `src/content/contacto.json` |
| Artículos y SEO del blog | `src/content/blog/`, `src/content/blog.json` |
| Aviso legal, privacidad y cookies | `src/content/legal/` |

Conserva los campos YAML situados entre las dos líneas de tres guiones en los archivos Markdown. Para añadir un artículo, duplica el artículo de ejemplo, cambia el nombre del archivo, rellena título y descripción y vuelve a compilar.

Los recursos de marca están en `public/`: símbolo `nexo-simbolo.webp`, icono `nexo-icono.png` y banner social `nexo-social.png`.

Puedes añadir logos oficiales SVG en `src/assets/logos/`. Usa el nombre de la marca en minúsculas, separado por guiones, por ejemplo `microsoft-azure.svg`. Las marcas sin un SVG local o incluido se muestran por nombre. La imagen de Open Graph se configura en `imagenSocial` con una ruta como `/nexo-social.png` y el archivo correspondiente en `public/`.

## Desplegar en Netlify

1. Completa los datos de [MARCADORES.md](MARCADORES.md), revisa los textos legales y confirma los datos del caso. Para una revisión privada, restringe el acceso desde el proveedor. El servidor de desarrollo y las previsualizaciones de Netlify emiten `noindex`. La página de confirmación también lo emite.
2. Sube el proyecto a tu repositorio y conéctalo desde Netlify. Si el proyecto está en una carpeta del repositorio, selecciona esa carpeta como directorio base. `netlify.toml` define Node 24, el comando `npm run build` y la carpeta `dist`.
3. En Netlify, habilita la detección de formularios y despliega o vuelve a desplegar para que Netlify lea el HTML. Configura las notificaciones para `diagnostico-inicio` y `diagnostico-contacto`.
4. Haz una prueba desde ambos formularios. Comprueba la página de agradecimiento, el registro y la notificación de cada envío en Netlify. Confirma también el enlace de Calendly.
5. Añade tu dominio definitivo en Netlify y configura `SITE_URL` con su URL HTTPS para el contexto de producción. Si falta, el proyecto consulta `sitio.json` y después la URL de producción de Netlify. Comprueba que `robots.txt` referencia `sitemap.xml` y que las URLs canónicas y la vista previa social apuntan al dominio HTTPS.
6. Ejecuta Lighthouse en producción, en móvil y escritorio. El objetivo es superar 95 en rendimiento, accesibilidad, buenas prácticas y SEO. Revisa manualmente teclado, zoom, contraste, el acordeón y ambas opciones de consentimiento. Elimina las entradas de prueba al finalizar.

[Documentación de Netlify Forms](https://docs.netlify.com/manage/forms/setup/)

## Analítica, contacto externo y privacidad

Plausible está desactivado hasta configurar en `plausibleScript` la URL HTTPS del script personalizado `https://plausible.io/js/pa-….js` desde el panel de Plausible. Al configurarlo, aparece el banner con dos botones del mismo estilo. La preferencia dura hasta 180 días y se puede cambiar desde el pie de página y la política de cookies. Comprueba en la pestaña Red del navegador que visitar o rechazar no carga Plausible y que retirar la elección detiene su carga en la siguiente navegación.

Calendly y WhatsApp son enlaces directos que solo aparecen si tienen un valor configurado. WhatsApp se muestra en móvil y acepta el número con código internacional. Google Fonts carga Inter, Space Grotesk y JetBrains Mono con `display=swap`. Revisa esta conexión, el uso de Netlify y cualquier proveedor externo al completar el aviso de privacidad. Los textos legales son borradores con marcadores.

[Guía de cookies de la AEPD](https://www.aepd.es/es/documento/guia-cookies.pdf) · [Instalación de Plausible](https://plausible.io/docs/script-update-guide)

## Test de madurez

`/test-madurez` calcula en el navegador las notas de procesos, infraestructura, datos e IA, con el mismo peso para cada área. Las recomendaciones se muestran sin identificación. Para habilitar el formulario opcional e independiente `test-madurez`, completa y aprueba la finalidad, el resumen informativo y el consentimiento, configura `email.privacySummary` y `email.consent` y activa `email.enabled` en `src/content/test-madurez.json`. Verifica la detección de dicho formulario antes de ofrecerlo en producción.

Los enlaces de navegación omiten «Casos» mientras haya marcadores de resultado o atribución. La URL `/casos` sigue disponible.
