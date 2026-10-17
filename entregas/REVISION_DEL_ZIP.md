# Revisión de portabilidad del ZIP de NutriVida React

## Resultado

El ZIP contiene **113 archivos del proyecto** y no depende del entorno cloud de Codex para ejecutarse. Se revisaron su inventario completo, los archivos de configuración, los scripts npm, las dependencias, las rutas de recursos y las referencias a herramientas o directorios del entorno.

Esta versión contiene la migración completa con `context/`, `data/` y las páginas agrupadas por funcionalidad dentro de `components/pages/`. Conserva la separación entre `src/index.css` y `src/App.css`. Se actualizaron las importaciones y el README; los datos, los textos, los estilos y las funcionalidades conservan el comportamiento de la entrega anterior.

| Dato | Valor |
|---|---|
| Archivo | `entregas/nutrivida-react-migrado.zip` |
| Carpeta al descomprimir | `nutrivida-react/` |
| Tamaño | 4.675.483 bytes, aproximadamente 4,7 MB |
| Archivos incluidos | 113 |
| SHA-256 | `a5a2d841cf5cc15da17ba407cd6d1ed3153f5344fafcc9b7578a9317fe407ce3` |

La rama `entrega/migracion-nutrivida-estructura` incorpora el ZIP actualizado, este informe y `ETAPA_2_ACUERDOS.md` sobre la entrega anterior. **La versión migrada está dentro del ZIP**; al abrir los archivos de la raíz de esta rama se sigue viendo la base previa a la migración. `main` no se modifica con esta entrega.

## 1. Qué NO se incluyó del entorno cloud

No están dentro del ZIP:

- `.cloud-onboarding/`, `.migration-nutrivida/` ni los scripts de instalación del entorno.
- Los scripts Python que extrajeron contenido, generaron archivos, empaquetaron o recorrieron la aplicación para verificarla.
- Playwright, Chromium, capturas de pantalla, informes temporales o datos del navegador de verificación.
- `node_modules/`, `dist/`, cachés de npm, logs o directorios temporales.
- `.git/`, configuraciones de autenticación de Git, tokens de GitHub, proxies o certificados del entorno.
- Variables `.env`, credenciales cloud, direcciones internas de esta máquina o rutas de ejecución como `/workspace`, `/tmp` o `/mnt`.
- Parámetros especiales de los servidores usados aquí, como los puertos 5174/5175 o `--host 0.0.0.0`.

El README menciona que se excluyeron archivos cloud. Es una explicación de la entrega y no una dependencia de ejecución.

Para usar el proyecto **no necesitas Python, Playwright, Chromium, Codex, Docker ni las instrucciones de onboarding de esta conversación**. Necesitas Node.js y npm.

## 2. Archivos opcionales que sí están en el ZIP

Opcional significa que no es necesario para abrir o ejecutar la aplicación; puede seguir siendo útil para desarrollar o reproducir la instalación.

| Archivo | Para qué sirve | ¿Depende de la nube? | Qué tener en cuenta |
|---|---|---|---|
| `.nvmrc` | Recomienda Node.js 24 a gestores de versiones compatibles | No | Lo añadí para documentar una versión comprobada. Puedes ignorarlo o eliminarlo si ya gestionas tu versión de Node. No cambia la versión de Node por sí solo. |
| `.oxlintrc.json` | Configuración de las reglas de Oxlint | No | Ya existía en tu base y se conservó sin cambios. Se usa en la revisión de código; no es necesario para `npm run dev`. |
| `.gitignore` | Evita subir dependencias, builds y archivos locales a Git | No | Ya existía y se conservó sin cambios. No interviene en la interfaz, pero conviene mantenerlo en el repositorio. |
| `README.md` | Guía de arquitectura, ejecución, rutas y convenciones | No | Es documentación del proyecto; la aplicación no lo importa. |
| `public/assets/img/hero-inicio.jpg` | Imagen conservada del sitio original | No | Actualmente no tiene referencias en el código migrado. La portada utiliza `hero-inicio2.png`. Podrías quitar `hero-inicio.jpg` sin afectar la versión actual. |

Las **15 imágenes** incluidas coinciden byte por byte con sus originales de `nutrivida`. La imagen sin uso mencionada arriba proviene de tu sitio, no de una solución para este entorno.

## 3. Dependencias de desarrollo y configuración normal

### Herramientas que puedes conservar aunque no se usen en producción

- `oxlint`: ya estaba en la base. Sirve para `npm run lint`; no es una dependencia de la interfaz en el navegador.
- `@types/react` y `@types/react-dom`: ya estaban en la base. Ayudan al editor con los tipos y el autocompletado; esta migración utiliza JavaScript/JSX, por lo que no son imprescindibles para ejecutar la aplicación.

Si en el futuro eliminas Oxlint, debes actualizar también el script `lint` y su configuración. No se ha eliminado porque formaba parte de tu proyecto y sigue siendo útil para revisar el código.

### Herramientas necesarias para desarrollar y compilar

- `vite` y `@vitejs/plugin-react` están en `devDependencies`, pero **sí son necesarios** para `npm run dev` y `npm run build`. No debes borrar todas las dependencias de desarrollo pensando que son exclusivas de esta nube.
- `react`, `react-dom`, `bootstrap` y `react-bootstrap` son dependencias propias de la aplicación.
- `react-router-dom` se añadió para las vistas y la navegación de NutriVida. No es una adaptación al entorno cloud.

`vite.config.js`, `.oxlintrc.json` y `.gitignore` son idénticos a los que estaban en la base original de `nutrivida-react`. No contienen ajustes particulares de esta máquina.

### Por qué conviene conservar `package-lock.json`

El lockfile no es un archivo de la nube: fija las versiones y las comprobaciones de integridad de las dependencias. `npm install` puede generar uno nuevo si lo borras, pero conservarlo ayuda a repetir la instalación comprobada. `npm ci` lo necesita.

Los paquetes se descargan del registro público `registry.npmjs.org`; no se configuró un registro privado ni un proxy propio del proyecto. Las entradas de paquetes opcionales para Linux, Windows o macOS son normales en las herramientas de compilación: npm selecciona las adecuadas para tu sistema al instalar. No se incluyeron binarios de `node_modules` de esta máquina.

No se añadió Vitest, ninguna suite de pruebas unitarias ni dependencias de testing al proyecto entregado.

## 4. Requisitos para ejecutarlo en tu equipo

La recomendación comprobada es **Node.js 24 LTS**. Los requisitos declarados por Vite y su plugin son `^20.19.0 || >=22.12.0`; React Router requiere Node 20 o superior. Node 24 es una elección compatible, no una obligación impuesta por la nube.

Después de descomprimir, entra en la carpeta que contiene `package.json`:

```bash
cd nutrivida-react
npm install
npm run dev
```

`npm install` debe instalar también las dependencias de desarrollo, como hace normalmente. Un comando con `--omit=dev` no prepara las herramientas necesarias para desarrollar con Vite.

Abre la dirección que muestre Vite. El puerto habitual es 5173; puede elegir otro si está ocupado. No hace falta copiar el puerto utilizado en esta conversación ni abrir `index.html` mediante doble clic.

La copia extraída del propio ZIP se verificó con instalación limpia, compilación, lint y ejecución del servidor. Su lockfile quedó sin modificaciones después de instalar.

## 5. Comportamientos del proyecto que debes conocer

Estos puntos pertenecen al diseño de la aplicación y a la migración, no a la infraestructura cloud:

1. **Persistencia local.** Usuarios, sesión, planes, selección y última cita se guardan en `localStorage`, como en el proyecto original. Cambiar de puerto, dominio o navegador no transfiere esos datos automáticamente.
2. **Datos de demostración.** `src/data/usuariosData.js` incluye las cuentas de ejemplo originales y la contraseña de demostración del administrador. Esto no es una credencial de esta nube ni un token de GitHub. La sesión es una simulación académica en el navegador, no autenticación de servidor.
3. **Sin backend ni correo real.** El formulario de contacto conserva la confirmación local del original. No existe un servicio de email, una API clínica ni una base de datos remota configurada.
4. **Rutas de imágenes y despliegue.** Los recursos usan rutas desde la raíz del sitio, como `/assets/img/logo.png`. Funcionan con la ejecución local documentada. Si publicas bajo una subcarpeta, por ejemplo en ciertos despliegues de GitHub Pages, hay que adaptar `base`, `basename` y las rutas de recursos.
5. **Recarga de rutas.** Para publicar una SPA con `BrowserRouter`, el hosting debe devolver `index.html` en rutas de aplicación que no correspondan a archivos reales. Vite ya lo resuelve al ejecutar desarrollo y preview.
6. **Compatibilidad de URLs.** `RutaAnteriorContainer.jsx` mantiene los marcadores antiguos `.html`. Es una función de compatibilidad con tu sitio anterior; no es una dependencia de la nube. Si deseas retirarla, hay que ajustar también las rutas de `App.jsx`.
7. **Semillas y datos existentes.** Los datos que ya existan en `localStorage` tienen prioridad sobre las listas iniciales. Editar `planesData.js` o `usuariosData.js` no reemplaza automáticamente una lista guardada en tu navegador.

## 6. Cómo descargar desde esta rama

Abre `entregas/nutrivida-react-migrado.zip` en GitHub y usa **Download raw file / Descargar archivo**. Después descomprime el archivo para obtener la carpeta del proyecto migrado.

El botón general **Code → Download ZIP** de GitHub descarga toda la rama: dentro de esa descarga también encontrarás `entregas/nutrivida-react-migrado.zip`, que contiene la migración.

Si vas a copiar la migración sobre tu clon existente, conserva su carpeta `.git` y revisa los cambios antes de hacer commits. Para probarla por separado puedes descomprimirla en otra carpeta sin tocar tu copia de trabajo actual.

**Conclusión:** no hay que retirar ningún archivo por ser exclusivo del entorno cloud. Los elementos opcionales de la entrega son herramientas/documentación normales del proyecto y una imagen original actualmente sin uso.

## 7. Separación de CSS acordada para la Etapa 2

- `src/index.css` se importa desde `src/main.jsx` y contiene las reglas globales.
- `src/App.css` se importa desde `src/App.jsx` y contiene los estilos de las secciones de NutriVida.
- Se conservaron todas las reglas CSS y su secuencia. La reorganización actual actualiza ubicaciones e importaciones sin cambiar los estilos visuales.
- La compilación y Oxlint pasan. La comprobación de apariencia compara portada, planes y contacto a 360, 768 y 1440 px.
- El README registra esta división y la tutoría con uno a tres archivos por turno, esperando confirmación antes del siguiente bloque.

## 8. Organización actual del proyecto completo

- `src/context/NutriContext.js` declara el contexto; el estado y las acciones permanecen en `containers/NutrividaContainer.jsx`.
- `src/data/` contiene `planesData.js`, `usuariosData.js`, `articulosData.js`, `contenido.js` y `formularios.js`.
- `src/utils/` queda dedicado a las funciones reutilizables de validación, formato, almacenamiento, presentación y títulos.
- Las 18 páginas se agrupan en `components/pages/admin/` (5), `auth/` (2), `blog/` (2), `publicas/` (4) y `reservas/` (5).
- Se conservan los cinco niveles Atomic Design. Todas las importaciones relativas resuelven a archivos existentes y no hay importaciones ascendentes entre niveles.
- La vista `components/pages/blog/ArticuloPage.jsx` muestra los tres artículos según `/blog/:id`, con sus textos e imágenes independientes.
- Los planes, usuarios, formularios y contenidos se compararon con la versión anterior y conservan exactamente los mismos valores.
- Los archivos CSS, las dependencias y los componentes visuales de átomos, moléculas, organismos y templates no cambian en esta reorganización.
- El ZIP incluye el proyecto completo con README e imágenes. Excluye herramientas del entorno, `node_modules`, `dist`, `.git` y los informes externos de `entregas/`.
