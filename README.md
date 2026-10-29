# NutriVida React

**NutriVida** es una aplicación web para una clínica de asesoría nutricional, desarrollada con React y Vite. Permite conocer al equipo clínico, explorar planes nutricionales, consultar artículos, crear cuentas de pacientes y gestionar reservas de citas.

La aplicación también incorpora un panel de administración para gestionar planes nutricionales y usuarios.

El proyecto se desarrolló a partir de la versión original de NutriVida, implementada con HTML, CSS y JavaScript. La nueva arquitectura utiliza componentes reutilizables, navegación mediante React Router, estado compartido, validaciones, persistencia local y pruebas automatizadas.

## Tecnologías utilizadas

| Tecnología | Uso en el proyecto |
|---|---|
| React 19 | Construcción de interfaces mediante componentes, props y estado |
| Vite 8 | Entorno de desarrollo y compilación de la aplicación |
| JavaScript (ES Modules) | Implementación de la lógica y organización del código |
| React Router 7 | Navegación entre páginas y protección de rutas |
| React Bootstrap 2 | Componentes visuales y distribución responsive |
| Bootstrap 5 | Grilla, utilidades y estilos base |
| Vitest 5 | Ejecución de pruebas unitarias y de componentes |
| React Testing Library | Comprobación del comportamiento de componentes React |
| jsdom | Simulación del entorno de navegador durante las pruebas |
| Oxlint | Análisis estático del código |
| localStorage | Persistencia de información en el navegador |

## Instalación y ejecución

### Requisitos

- Node.js 22.12 o superior, o Node.js 24 LTS.
- npm.
- Navegador web actualizado.

### Iniciar el proyecto

Clonar el repositorio:

```bash
git clone https://github.com/jeeennifer/nutrivida-react.git
```

Ingresar a la carpeta:

```bash
cd nutrivida-react
```

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abrir la dirección indicada por Vite en la terminal, normalmente:

```text
http://localhost:5173
```

La aplicación utiliza datos locales y no requiere configurar una API, base de datos o variables de entorno para ejecutarse.

## Comandos disponibles

| Comando | Descripción |
|---|---|
| `npm install` | Instala las dependencias |
| `npm ci` | Realiza una instalación limpia utilizando `package-lock.json` |
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la versión compilada en `dist/` |
| `npm run preview` | Permite visualizar la versión compilada |
| `npm run lint` | Analiza el código con Oxlint |
| `npm test` | Ejecuta Vitest en modo interactivo |
| `npm run test:run` | Ejecuta todas las pruebas una sola vez |
| `npm run coverage` | Ejecuta las pruebas y genera el informe de cobertura |

## Estructura del proyecto

```text
nutrivida-react/
├── doc/
│   └── guia_migracion.md
├── public/
│   └── assets/
│       └── img/
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   ├── templates/
│   │   └── pages/
│   │       ├── admin/
│   │       ├── auth/
│   │       ├── blog/
│   │       ├── publicas/
│   │       └── reservas/
│   ├── containers/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── utils/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   └── setupTests.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

### Responsabilidad de cada carpeta

| Carpeta o archivo | Responsabilidad |
|---|---|
| `public/assets/img/` | Imágenes y recursos gráficos de NutriVida |
| `src/components/atoms/` | Elementos visuales básicos |
| `src/components/molecules/` | Combinaciones pequeñas de componentes |
| `src/components/organisms/` | Secciones completas de la interfaz |
| `src/components/templates/` | Distribuciones reutilizables de páginas |
| `src/components/pages/` | Composición de las distintas vistas |
| `src/containers/` | Lógica de negocio, operaciones, validaciones y navegación |
| `src/context/` | Declaración del contexto compartido |
| `src/hooks/` | Hooks personalizados para lógica reutilizable |
| `src/data/` | Datos iniciales y configuraciones |
| `src/utils/` | Funciones de validación, formato, almacenamiento y presentación |
| `src/App.jsx` | Definición de rutas de navegación |
| `src/main.jsx` | Punto de entrada y montaje de React |
| `src/setupTests.js` | Configuración de las herramientas de pruebas |
| `src/App.css` | Estilos propios de NutriVida |
| `src/index.css` | Estilos generales |
| `vite.config.js` | Configuración de Vite y Vitest |
| `doc/guia_migracion.md` | Documentación técnica de la arquitectura y migración |

Los archivos de pruebas se encuentran junto a los módulos correspondientes, utilizando las extensiones `.test.js` y `.test.jsx`.

## Arquitectura de la aplicación

NutriVida utiliza una arquitectura basada en componentes reutilizables, organizada mediante **Atomic Design** y separación de responsabilidades entre lógica y presentación.

### Atomic Design

Los componentes se distribuyen en cinco niveles:

| Nivel | Responsabilidad | Ejemplos |
|---|---|---|
| Atoms | Elementos básicos de interfaz | `BotonNutrivida`, `EntradaCampo`, `ImagenNutrivida` |
| Molecules | Combinaciones pequeñas de elementos | `CampoFormulario`, `TarjetaPlan`, `ControlCupos` |
| Organisms | Secciones completas de una página | `Header`, `GrillaPlanes`, `FormularioNutrivida` |
| Templates | Estructura y distribución de contenido | `MainTemplate`, `PaginaTemplate`, `CarritoTemplate` |
| Pages | Composición de las vistas | `PlanesPage`, `ArticuloPage`, `IngresoPage` |

Esta organización facilita reutilizar componentes, mantener los estilos y separar las responsabilidades de cada parte de la interfaz.

### Container / Presentational

La aplicación separa la lógica de negocio de la representación visual.

Los **containers** se encargan de consultar datos, ejecutar operaciones, realizar validaciones y gestionar la navegación.

Los **componentes de presentación** reciben información y funciones mediante props para construir la interfaz y comunicar las acciones del usuario.

Por ejemplo:

- `PlanesContainer` obtiene el catálogo y proporciona las acciones relacionadas con la selección de planes.
- `GrillaPlanes` organiza visualmente los planes.
- `TarjetaPlan` representa cada plan y comunica la acción de agendar.

### Estado y contexto

`NutrividaContainer` proporciona el estado compartido de planes, usuarios, sesión y reservas.

El contexto se declara en `src/context/NutriContext.js` y se consulta mediante el hook `useNutrivida`.

El hook `useCarrito` administra la selección de planes, cantidades, totales y estado del panel lateral.

El hook `useFormulario` reutiliza el manejo de valores, errores y mensajes de formularios.

## Funcionalidades

### Sitio público

- Página de inicio con presentación de la clínica y planes destacados.
- Información sobre NutriVida y su equipo clínico.
- Catálogo de planes nutricionales.
- Vista de detalle de cada plan.
- Blog de nutrición con artículos y páginas de detalle.
- Formulario de contacto con validaciones y confirmación en pantalla.

### Pacientes y reservas

- Registro de pacientes.
- Inicio y cierre de sesión.
- Selección de planes desde el catálogo o sus detalles.
- Panel lateral con resumen de planes seleccionados.
- Página «Mis Horas» con cantidades y totales.
- Control de disponibilidad según los cupos de cada plan.
- Agendamiento mediante selección de fecha y horario.
- Confirmación de la cita realizada.

### Administración

El acceso administrativo requiere iniciar sesión con una cuenta de tipo Administrador.

Incluye:

- Panel de administración.
- Listado de planes nutricionales.
- Creación, edición y eliminación de planes.
- Listado de usuarios registrados.
- Creación, edición y eliminación de usuarios.
- Actualización de la información de los planes utilizados en el carrito.

## Navegación y rutas

La aplicación utiliza React Router para mostrar las páginas según la dirección solicitada.

### Rutas públicas

| Ruta | Vista |
|---|---|
| `/` | Inicio |
| `/nosotros` | Información de la clínica |
| `/contacto` | Formulario de contacto |
| `/blog` | Artículos de nutrición |
| `/blog/:id` | Detalle de un artículo |
| `/planes` | Catálogo de planes |
| `/planes/:id` | Detalle de un plan |
| `/carrito` | Mis Horas |
| `/login` | Inicio de sesión |
| `/registro` | Registro de pacientes |

### Rutas de pacientes autenticados

| Ruta | Vista |
|---|---|
| `/agendar-cita` | Selección de fecha y horario |
| `/cita-confirmada` | Confirmación de reserva |

### Rutas administrativas

| Ruta | Vista |
|---|---|
| `/admin` | Panel principal |
| `/admin/planes` | Administración de planes |
| `/admin/planes/nuevo` | Crear plan |
| `/admin/planes/:id/editar` | Editar plan |
| `/admin/usuarios` | Administración de usuarios |
| `/admin/usuarios/nuevo` | Crear usuario |
| `/admin/usuarios/:run/editar` | Editar usuario |

Los parámetros `:id` y `:run` representan valores variables utilizados para identificar recursos.

Las rutas desconocidas muestran una página no encontrada.

La aplicación también conserva redirecciones desde las direcciones HTML utilizadas anteriormente por NutriVida.

## Datos y persistencia

Los datos iniciales de la aplicación se encuentran en `src/data/`.

Incluyen:

- Planes nutricionales.
- Usuarios iniciales.
- Artículos del blog.
- Contenido de presentación.
- Configuración de formularios.

La aplicación utiliza `localStorage` para conservar información entre recargas del navegador.

Los principales datos persistidos son:

- Planes.
- Usuarios.
- Carrito de reservas.
- Sesión activa.
- Última cita confirmada.
- Destino de navegación después del inicio de sesión.

Los datos se almacenan en el navegador y dependen del origen desde el cual se ejecuta la aplicación.

## Validaciones y reglas de negocio

### Usuarios

- El registro público crea cuentas con rol Paciente.
- No se permiten cuentas duplicadas por RUN o correo.
- El correo debe pertenecer a `gmail.com` o `duoc.cl`.
- La contraseña debe contener al menos seis caracteres.
- El RUN se valida por formato, sin puntos ni guion y sin comprobar matemáticamente el dígito verificador.
- Al editar un usuario, el RUN permanece fijo.
- Dejar vacía la contraseña durante una edición conserva la contraseña existente.

### Planes y reservas

- Los precios se expresan en pesos chilenos (CLP).
- Los precios no pueden ser negativos.
- Los cupos deben ser números enteros mayores o iguales a cero.
- Las cantidades seleccionadas están limitadas por los cupos disponibles.
- La confirmación de una reserva requiere una sesión activa.
- La fecha de reserva no puede ser anterior al día actual.
- El horario debe pertenecer a las opciones disponibles.
- Antes de confirmar una cita se comprueban nuevamente los cupos.
- Los cupos se descuentan al confirmar la reserva, no al agregar un plan al carrito.

### Cuenta inicial de administración

| Correo | Contraseña | Rol |
|---|---|---|
| `admin@gmail.com` | `Admin123` | Administrador |

Para utilizar el flujo de paciente, se puede crear una cuenta desde `/registro`.

## Diseño responsive

La aplicación utiliza React Bootstrap y Bootstrap para adaptar la distribución a diferentes tamaños de pantalla.

Entre sus características se encuentran:

- Distribución mediante `Container`, `Row` y `Col`.
- Tarjetas de planes y artículos adaptables a una, dos o tres columnas.
- Menú de navegación colapsable en pantallas pequeñas.
- Imágenes adaptables mediante `Image fluid`.
- Distribución flexible del carrito y su resumen.
- Tablas administrativas con desplazamiento horizontal cuando es necesario.

Los estilos propios se encuentran en `App.css` e `index.css` y mantienen la identidad visual de NutriVida.

## Pruebas automatizadas

NutriVida utiliza **Vitest** como herramienta de pruebas, junto con React Testing Library y jsdom.

La configuración se encuentra en:

```text
vite.config.js
src/setupTests.js
```

El proyecto incluye 19 archivos de pruebas distribuidos dentro de `src/`.

### Áreas cubiertas

- Validaciones de datos.
- Formato y presentación de información.
- Almacenamiento local y sesión.
- Gestión del carrito.
- Comportamiento de formularios.
- Componentes visuales reutilizables.
- Controles y avisos de disponibilidad.
- Listados y resúmenes.
- Comportamiento de un container administrativo.

### Ejecutar las pruebas

Modo interactivo:

```bash
npm test
```

Ejecución completa de una sola vez:

```bash
npm run test:run
```

Informe de cobertura:

```bash
npm run coverage
```

### Otras verificaciones

Análisis estático:

```bash
npm run lint
```

Compilación:

```bash
npm run build
```

Las pruebas automatizadas permiten verificar comportamientos específicos del código, mientras que la revisión manual permite comprobar los flujos completos de navegación, reservas, administración y diseño responsive.

## Compilación y despliegue

Para generar una versión de producción:

```bash
npm run build
```

Los archivos resultantes se generan en la carpeta `dist/`.

Para revisar localmente esa versión:

```bash
npm run preview
```

Al utilizar React Router con `BrowserRouter`, el servidor de alojamiento debe estar configurado para servir `index.html` cuando se soliciten directamente las rutas de la aplicación.

La configuración actual utiliza la raíz del dominio. Para desplegar en un subdirectorio puede ser necesario ajustar la configuración de Vite, el router y las rutas de recursos.

## Alcance y limitaciones

NutriVida funciona como una aplicación con persistencia local y no dispone de un servidor ni de una base de datos centralizada.

Por esta razón:

- Los cambios no se comparten automáticamente entre dispositivos.
- Los cupos no se gestionan mediante un servidor central.
- El formulario de contacto muestra una confirmación, pero no envía correos.
- Las cuentas y contraseñas se almacenan localmente.
- El control de acceso se implementa en el cliente.

El almacenamiento local y las restricciones de acceso del navegador no proporcionan un mecanismo de seguridad adecuado para proteger datos reales en producción.

## Documentación técnica

La documentación detallada de la arquitectura, la migración, la navegación, las validaciones y las pruebas está disponible en:

[Guía de arquitectura y migración de NutriVida](doc/guia_migracion.md)