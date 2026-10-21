# NutriVida React

Aplicación web académica de **NutriVida — Clínica de Asesoría Nutricional**, desarrollada por Vicente, Michael y Jennifer para **DSY1104**. Permite conocer al equipo, consultar planes nutricionales, leer artículos y reservar citas. Incluye registro de pacientes y un panel de administración de planes y usuarios.

## Tecnologías

| Tecnología | Uso |
|---|---|
| React 19 | Interfaz basada en componentes y gestión del estado |
| Vite 8 | Servidor de desarrollo y compilación para producción |
| React Bootstrap 2 y Bootstrap 5 | Componentes visuales y sistema de grillas responsive |
| React Router 7 | Navegación y control de acceso a las vistas |
| JavaScript con módulos ES | Lógica de la aplicación |
| Oxlint | Análisis estático del código |

## Instalación y ejecución

**Requisitos:** Node.js 22 LTS, desde la versión 22.12, o Node.js 24 LTS; npm.

Desde la carpeta del proyecto:

```bash
npm install
npm run dev
```

Abre la dirección que indique Vite en la terminal, normalmente `http://localhost:5173`.

| Comando | Descripción |
|---|---|
| `npm install` | Instala las dependencias |
| `npm ci` | Realiza una instalación limpia usando `package-lock.json` |
| `npm run dev` | Inicia el servidor de desarrollo con recarga automática |
| `npm run lint` | Revisa el código con Oxlint |
| `npm run build` | Genera la aplicación compilada en `dist/` |
| `npm run preview` | Permite revisar localmente una compilación generada |

La aplicación funciona con datos locales. Su ejecución no requiere API, base de datos ni variables de entorno. El código, los datos iniciales y las imágenes están incluidos en este proyecto.

## Estructura del proyecto

```text
nutrivida-react/
├── public/
│   └── assets/img/
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
│   ├── hooks/
│   ├── data/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── App.css
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

| Carpeta o archivo | Responsabilidad |
|---|---|
| `public/assets/img/` | Imágenes del sitio, disponibles mediante `/assets/img/...` |
| `src/components/` | Componentes organizados en cinco niveles de Atomic Design |
| `src/containers/` | Estado, operaciones, validaciones de los flujos y navegación |
| `src/context/` | Declaración del contexto compartido |
| `src/hooks/` | Lógica reutilizable de acceso al contexto y formularios |
| `src/data/` | Planes y usuarios iniciales, artículos, textos y configuración de formularios |
| `src/utils/` | Funciones de almacenamiento, formato, validación, presentación y títulos |
| `src/App.jsx` | Definición de rutas de la aplicación |
| `src/main.jsx` | Montaje de React, router y proveedor del estado compartido |
| `src/index.css` | Base global de estilos |
| `src/App.css` | Apariencia de NutriVida y ajustes de sus componentes |
| `docs/` | Documentación técnica y de estudio |

## Arquitectura y separación de responsabilidades

### Atomic Design

| Nivel | Responsabilidad | Ejemplos |
|---|---|---|
| Átomos | Elementos visuales básicos | `BotonNutrivida`, `EntradaCampo`, `ImagenNutrivida` |
| Moléculas | Combinaciones pequeñas de elementos | `CampoFormulario`, `TarjetaPlan`, `ControlCupos` |
| Organismos | Secciones completas de una interfaz | `Header`, `GrillaPlanes`, `FormularioNutrivida` |
| Templates | Estructura y distribución del contenido | `MainTemplate`, `PaginaTemplate`, `CarritoTemplate` |
| Pages | Composición de cada vista y conexión con su container | `PlanesPage`, `ArticuloPage`, `IngresoPage` |

Las dependencias entre niveles visuales se dirigen hacia niveles inferiores. Una página puede utilizar un template y un organismo sin pasar por todos los niveles intermedios.

### Container / Presentational

Los containers consultan los datos, ejecutan las operaciones y deciden la navegación. Los átomos, moléculas y organismos reciben valores y callbacks mediante props para mostrar la interfaz y comunicar las acciones del usuario.

Por ejemplo, `PlanesContainer` obtiene el catálogo y proporciona la acción de agendar; `GrillaPlanes` muestra las tarjetas con los datos recibidos.

El estado compartido se gestiona mediante `NutrividaContainer`. Su contexto se declara en `context/NutriContext.js` y se consulta desde los containers mediante `useNutrivida`. El hook `useFormulario` comparte la mecánica de valores, errores y mensajes de los formularios.

## Diseño responsive

La aplicación utiliza un enfoque mobile-first con React Bootstrap:

- `Container`, `Row` y `Col` distribuyen el contenido.
- Los listados de planes y artículos usan `xs={12} md={6} lg={4}`: una, dos o tres tarjetas por fila.
- El equipo clínico utiliza hasta cuatro columnas en pantallas grandes.
- `Navbar expand="lg"` proporciona el menú colapsable para pantallas menores a 992 px.
- `Image fluid` adapta las imágenes al ancho disponible.
- El carrito distribuye listado y resumen en dos columnas desde el breakpoint `lg`.
- Las tablas administrativas permiten desplazamiento dentro de su contenedor mediante `Table responsive`.

`index.html` incluye `lang="es"` y la etiqueta viewport. Los estilos propios conservan la identidad visual verde y blanca y complementan los componentes Bootstrap.

## Funcionalidades y navegación

### Sitio público

- Inicio con presentación de la clínica y planes destacados.
- Información del equipo clínico y del proyecto.
- Catálogo y detalle de planes nutricionales.
- Blog con tres artículos y una vista de detalle reutilizable.
- Formulario de contacto con validación y confirmación en pantalla.

### Pacientes y reservas

- Registro e inicio y cierre de sesión.
- Selección de planes desde el catálogo y su detalle.
- Panel lateral y página «Mis Horas» para modificar cantidades, eliminar selecciones y consultar totales.
- Agendamiento con fecha, horario y comprobación de cupos.
- Confirmación de la última cita asociada al correo de la sesión activa.

### Administración

- Acceso al panel según el rol Administrador.
- Creación, edición y eliminación de planes.
- Creación, edición y eliminación de usuarios.
- Actualización de los datos del carrito cuando se modifica un plan.

### Rutas principales

| Ruta | Vista o función | Acceso |
|---|---|---|
| `/` | Inicio | Público |
| `/nosotros` | Información de la clínica y del equipo | Público |
| `/contacto` | Formulario de contacto | Público |
| `/blog` | Listado de artículos | Público |
| `/blog/:id` | Detalle de un artículo | Público |
| `/planes` | Catálogo de planes | Público |
| `/planes/:id` | Detalle de un plan | Público |
| `/carrito` | Mis Horas | Público |
| `/login` | Inicio de sesión | Público |
| `/registro` | Registro de pacientes | Público |
| `/agendar-cita` | Selección de fecha y horario | Con sesión |
| `/cita-confirmada` | Confirmación de la última cita | Con sesión |
| `/admin` | Inicio del panel | Administrador |
| `/admin/planes` | Gestión de planes | Administrador |
| `/admin/planes/nuevo` | Creación de un plan | Administrador |
| `/admin/planes/:id/editar` | Edición de un plan | Administrador |
| `/admin/usuarios` | Gestión de usuarios | Administrador |
| `/admin/usuarios/nuevo` | Creación de un usuario | Administrador |
| `/admin/usuarios/:run/editar` | Edición de un usuario | Administrador |

`:id` y `:run` son parámetros variables. Las direcciones desconocidas muestran una página con acceso al inicio. También se reconocen las direcciones HTML anteriores y se redirigen a su equivalente en React.

## Datos y reglas principales

Los datos iniciales se definen en `src/data/`. Los cambios de planes, usuarios, selección y sesión se conservan mediante `localStorage`, junto con la última cita. El almacenamiento pertenece al navegador y al origen desde el que se abre la aplicación.

- Los precios se expresan en pesos chilenos (CLP).
- Las cantidades seleccionadas no pueden superar los cupos disponibles.
- Confirmar una reserva comprueba la selección completa antes de descontar cupos y vaciar el carrito.
- El registro público crea usuarios con rol Paciente y comprueba duplicados por RUN o correo.
- Los correos admitidos pertenecen a `gmail.com` o `duoc.cl`.
- La contraseña requiere un mínimo de seis caracteres.
- El RUN se valida por formato, sin puntos ni guion y sin cálculo del dígito verificador.
- Al editar usuarios, el RUN permanece fijo y una contraseña vacía conserva la existente.

### Cuenta de demostración

| Correo | Contraseña | Rol |
|---|---|---|
| `admin@gmail.com` | `Admin123` | Administrador |

Para probar el flujo de paciente, se puede crear una cuenta desde `/registro`. 

### Alcance

La aplicación implementa una simulación académica con persistencia local. Las reservas no se coordinan entre dispositivos y el contacto muestra una confirmación sin enviar correos. Las cuentas y contraseñas se almacenan localmente; el control de acceso se realiza en el cliente.

## Verificación y pruebas

```bash
npm run lint
npm run build
```

Oxlint revisa el código y Vite comprueba la compilación y la resolución de los módulos importados. La revisión funcional abarca navegación, formularios, sesiones, reservas, administración y adaptación a distintos tamaños de pantalla.

**Vitest está pendiente de incorporación.** Esta versión no incluye configuración de Vitest, archivos de pruebas unitarias ni comandos `npm test`.

## Compilación y despliegue

```bash
npm run build
npm run preview
```

La carpeta `dist/` contiene la versión compilada. El hosting debe servir `index.html` para las rutas de la aplicación, de modo que React Router pueda resolver direcciones como `/planes/1` al abrirlas directamente o recargar.

La configuración actual utiliza la raíz del dominio. Un despliegue en un subdirectorio requiere ajustar la base de Vite, el router y las rutas de recursos.
