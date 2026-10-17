# Acuerdos para la tutoría de NutriVida React

Esta guía registra las decisiones de la conversación para retomarlas desde el repositorio.

## Estilos acordados

| Archivo | Responsabilidad | Importación |
|---|---|---|
| `src/index.css` | Base global: tipografía, colores base, body, encabezados y ajustes generales | `src/main.jsx` |
| `src/App.css` | Apariencia de las secciones de NutriVida y refinamientos de Bootstrap | `src/App.jsx` |

Se mantiene el nombre `App.css` con A mayúscula. La separación organiza los estilos; ambos archivos contienen CSS global. Los estilos de ejemplo de Vite se sustituyen por los de NutriVida. La distribución responsive continúa con React Bootstrap.

## Referencias y alcance

- `nutrivida`: fuente de apariencia, textos, imágenes y funcionalidades.
- `tienda-react`: referencia de arquitectura Atomic Design, configuración, React Bootstrap y comentarios estructurados.
- `nutrivida-react`: repositorio destino.
- Los organismos, moléculas y átomos reciben datos y eventos por props; la lógica y la persistencia pertenecen a containers.
- Mantener exactamente cinco niveles en `src/components`: atoms, molecules, organisms, templates y pages.
- No añadir Vitest ni pruebas unitarias durante esta etapa.

## Organización acordada

- `src/context/NutriContext.js`: definición del contexto compartido. El provider con estado y acciones se mantiene en `containers/NutrividaContainer.jsx`.
- `src/data/planesData.js` y `usuariosData.js`: datos iniciales de planes y cuentas.
- `src/data/articulosData.js`: los tres artículos completos; `contenido.js`: portada, misión y equipos; `formularios.js`: etiquetas y configuración de campos.
- `src/utils/`: funciones de validación, formato, almacenamiento, presentación y títulos de rutas.
- `src/components/pages/admin/`: las cinco vistas administrativas.
- `src/components/pages/auth/`: ingreso y registro.
- `src/components/pages/blog/`: listado y una vista de artículo reutilizable para `/blog/1`, `/blog/2` y `/blog/3`.
- `src/components/pages/publicas/`: inicio, nosotros, contacto y página no encontrada.
- `src/components/pages/reservas/`: planes, detalle, carrito, agenda y confirmación.

Las agrupaciones de páginas conservan los cinco niveles Atomic Design. `reservas/` agrupa cinco páginas del mismo recorrido. Reutilizar una vista de artículo mantiene los tres contenidos e imágenes originales en sus rutas respectivas.

## Forma de trabajar

1. Avanzar en este orden: base → utils → atoms → molecules → organisms → templates → pages → containers.
2. Entregar el código de uno a tres archivos como máximo por turno.
3. Indicar la ruta exacta de cada archivo y explicar brevemente qué cambió desde HTML/JS a React.
4. Explicar el uso de React Bootstrap y los breakpoints responsive cuando corresponda.
5. Esperar a que la estudiante pruebe el bloque y confirme que funciona antes de entregar el siguiente.
6. Antes del primer bloque, comprobar si su carpeta local conserva la base inicial de Vite o contiene el proyecto completo del ZIP. Los bloques deben poder ejecutarse sin importar módulos todavía no entregados.

El ZIP de esta rama contiene la versión completa de referencia con la nueva organización y los estilos separados. El código migrado está dentro del ZIP; los archivos de la raíz de esta rama corresponden a la base previa. El README incluido en el ZIP también conserva estos acuerdos.
