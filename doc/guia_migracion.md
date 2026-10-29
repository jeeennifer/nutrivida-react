# NutriVida React: arquitectura y migración

Esta guía documenta la arquitectura, la organización del código y los principales flujos de la aplicación **NutriVida**, desarrollada con React y Vite a partir de su implementación original en HTML, CSS y JavaScript.

Su objetivo es describir las decisiones técnicas del proyecto, la distribución de responsabilidades y el funcionamiento de sus componentes, estados, formularios, reservas y pruebas automatizadas.

Para obtener las instrucciones de instalación y ejecución, consulta el [README principal](../README.md).

## 1. Origen y objetivo de la migración

NutriVida comenzó como una aplicación web desarrollada con HTML, CSS y JavaScript.

La implementación actual utiliza React para organizar las vistas mediante componentes reutilizables y centralizar las operaciones de la aplicación.

| Implementación | Repositorio |
|---|---|
| Sitio NutriVida original | `jeeennifer/nutrivida` |
| Aplicación React actual | `jeeennifer/nutrivida-react` |

La migración conserva las principales funcionalidades del sistema:

- Presentación de la clínica y su equipo.
- Catálogo de planes nutricionales.
- Selección de planes y administración de cantidades.
- Registro e inicio de sesión.
- Reserva y confirmación de citas.
- Blog de nutrición.
- Formulario de contacto.
- Administración de planes y usuarios.

La implementación React utiliza sus propios archivos de código, imágenes, datos y dependencias. No necesita ejecutar el repositorio original.

## 2. Cambios principales de la arquitectura

La migración reemplaza la construcción manual de interfaces por una estructura basada en componentes y estado.

| Sitio original | Implementación React |
|---|---|
| Documentos HTML independientes | Vistas organizadas mediante React Router |
| Encabezado y pie repetidos | Componentes `Header` y `Footer` reutilizables |
| Tarjetas construidas mediante JavaScript | Componentes renderizados mediante `.map()` |
| Manipulación directa del DOM | Representación declarativa basada en estado |
| Eventos mediante `addEventListener` | Eventos de React como `onClick`, `onChange` y `onSubmit` |
| Formularios con lectura directa de campos | Formularios controlados mediante estado |
| Navegación mediante archivos HTML | Navegación con `Link`, `Navigate` y `useNavigate` |
| Operaciones distribuidas entre scripts | Containers, hooks, contexto y utilidades |
| Distribución mediante CSS propio | React Bootstrap complementado con CSS |
| Datos locales del navegador | Persistencia local conectada con el estado de React |

### Renderizado mediante estado

React utiliza el estado para determinar lo que debe mostrar la interfaz.

Cuando cambia la selección de planes, React actualiza los componentes que dependen de esa información.

Por ejemplo:

1. El usuario selecciona un plan.
2. Se ejecuta la función que agrega el plan.
3. Se actualiza el estado del carrito.
4. React vuelve a representar los componentes afectados.
5. Se actualizan el contador, el listado y el total.

No es necesario construir manualmente el HTML del carrito después de cada operación.

## 3. Organización del proyecto

La aplicación está distribuida en carpetas que separan presentación, lógica, datos y utilidades.

```text
src/
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   ├── templates/
│   └── pages/
├── containers/
├── context/
├── data/
├── hooks/
├── utils/
├── App.jsx
├── App.css
├── index.css
├── main.jsx
└── setupTests.js
```

### Responsabilidades

| Parte | Función |
|---|---|
| `components/` | Construcción de la interfaz visual |
| `containers/` | Operaciones, validaciones y navegación |
| `context/` | Declaración del contexto compartido |
| `hooks/` | Lógica reutilizable con hooks personalizados |
| `data/` | Datos iniciales y configuraciones |
| `utils/` | Funciones independientes para operaciones comunes |
| `App.jsx` | Definición de rutas |
| `main.jsx` | Montaje de la aplicación |
| `setupTests.js` | Configuración de pruebas |

Esta separación permite modificar una funcionalidad sin concentrar todas sus responsabilidades en un único archivo.

## 4. Atomic Design

La interfaz de NutriVida utiliza Atomic Design para organizar los componentes en distintos niveles de composición.

### 4.1. Atoms

Los átomos son los elementos visuales más pequeños.

Se encuentran en:

```text
src/components/atoms/
```

Entre ellos:

| Componente | Función |
|---|---|
| `BotonNutrivida` | Botón reutilizable |
| `EntradaCampo` | Entrada de datos |
| `EtiquetaCampo` | Etiqueta de formulario |
| `ImagenNutrivida` | Imagen adaptable |
| `MensajeFormulario` | Visualización de mensajes |
| `PrecioPlan` | Presentación del precio |

Los átomos reciben propiedades y representan elementos concretos de la interfaz.

### 4.2. Molecules

Las moléculas combinan elementos para construir pequeñas unidades funcionales.

Ubicación:

```text
src/components/molecules/
```

Algunos componentes son:

- `CampoFormulario`
- `TarjetaPlan`
- `TarjetaArticulo`
- `TarjetaIntegrante`
- `ControlCupos`
- `ItemCarrito`
- `ResumenCita`
- `TituloSeccion`

Una tarjeta de plan puede combinar imágenes, textos, precios y botones.

### 4.3. Organisms

Los organismos forman secciones completas de una interfaz.

Ubicación:

```text
src/components/organisms/
```

Entre ellos:

- `Header`
- `Footer`
- `GrillaPlanes`
- `GrillaBlog`
- `FormularioNutrivida`
- `CarritoLateral`
- `ListaCarrito`
- `ResumenCarrito`
- `TablaAdministrador`
- `EquipoNutrivida`
- `HeroNutricion`

Un organismo puede utilizar moléculas, átomos u otros componentes necesarios para formar una sección.

### 4.4. Templates

Los templates definen estructuras y distribuciones reutilizables.

Ubicación:

```text
src/components/templates/
```

Los templates implementados son:

| Template | Función |
|---|---|
| `MainTemplate` | Estructura principal de la aplicación |
| `PaginaTemplate` | Distribución de páginas interiores |
| `PortadaTemplate` | Organización de la página de inicio |
| `CarritoTemplate` | Distribución del carrito y su resumen |

Los templates organizan el contenido sin asumir necesariamente las operaciones específicas de cada vista.

### 4.5. Pages

Las páginas componen las vistas finales a partir de los elementos anteriores y sus containers.

Ubicación:

```text
src/components/pages/
```

Las páginas están agrupadas según su funcionalidad:

```text
pages/
├── admin/
├── auth/
├── blog/
├── publicas/
└── reservas/
```

Entre las páginas implementadas están:

- `InicioPage`
- `NosotrosPage`
- `ContactoPage`
- `PlanesPage`
- `DetallePlanPage`
- `BlogPage`
- `ArticuloPage`
- `IngresoPage`
- `RegistroPage`
- `CarritoPage`
- `AgendarCitaPage`
- `ConfirmacionPage`
- `PlanesAdminPage`
- `UsuariosAdminPage`

### Relación entre los niveles

La composición general puede representarse así:

```text
Pages
  ↓
Templates
  ↓
Organisms
  ↓
Molecules
  ↓
Atoms
```

Esta representación describe la jerarquía conceptual, pero no obliga a utilizar todos los niveles en cada pantalla.

Los containers forman una capa separada que proporciona la lógica necesaria para las vistas.

## 5. Patrón Container / Presentational

NutriVida utiliza una separación entre componentes que gestionan la lógica y componentes que representan la interfaz.

### Containers

Los containers se encuentran en:

```text
src/containers/
```

Sus responsabilidades incluyen:

- Obtener datos.
- Consultar el estado compartido.
- Ejecutar operaciones.
- Realizar validaciones.
- Procesar formularios.
- Gestionar acciones del usuario.
- Resolver parámetros de navegación.
- Decidir cuándo navegar hacia otra vista.

Entre ellos:

| Container | Responsabilidad |
|---|---|
| `InicioContainer` | Información de la portada |
| `PlanesContainer` | Catálogo de planes |
| `DetallePlanContainer` | Detalle de un plan |
| `CarritoContainer` | Operaciones del carrito |
| `AgendarCitaContainer` | Validación de fecha y horario |
| `IngresoContainer` | Inicio de sesión |
| `RegistroContainer` | Registro de pacientes |
| `ContactoContainer` | Formulario de contacto |
| `ArticuloContainer` | Obtención de un artículo |
| `PlanesAdminContainer` | Listado administrativo de planes |
| `PlanAdminContainer` | Edición y creación de planes |
| `UsuariosAdminContainer` | Listado administrativo de usuarios |
| `UsuarioAdminContainer` | Edición y creación de usuarios |
| `AccesoContainer` | Protección de rutas |
| `SitioContainer` | Estructura y comportamiento general del sitio |

### Componentes de presentación

Los componentes visuales reciben datos y funciones mediante **props**.

Por ejemplo, una tarjeta recibe:

- Información del plan.
- Precio.
- Imagen.
- Disponibilidad.
- Función que se ejecutará al seleccionar el plan.

La tarjeta no necesita conocer cómo se guardan los datos en el almacenamiento.

### Ejemplo del catálogo

```text
PlanesPage
    ↓
PlanesContainer
    ↓
GrillaPlanes
    ↓
TarjetaPlan
    ↓
Atoms reutilizables
```

El container determina qué información y acciones necesita la interfaz.

Los componentes visuales utilizan esas propiedades para representar el contenido.

## 6. Estado, contexto y hooks

### 6.1. Contexto compartido

El contexto se declara en:

```text
src/context/NutriContext.js
```

Utiliza `createContext` para definir el contexto de NutriVida.

El proveedor se implementa en:

```text
src/containers/NutrividaContainer.jsx
```

Este container mantiene y proporciona información compartida como:

- Planes.
- Usuarios.
- Sesión.
- Última cita.
- Carrito y totales.
- Acciones de creación, edición y eliminación.
- Operaciones de reserva.

Los componentes que necesitan estos datos pueden acceder a ellos sin recibirlos manualmente a través de todas las capas intermedias.

### 6.2. Montaje de la aplicación

El punto de entrada está en:

```text
src/main.jsx
```

La estructura principal es:

```text
StrictMode
    └── BrowserRouter
         └── NutrividaContainer
              └── App
```

`StrictMode` permite realizar comprobaciones adicionales durante el desarrollo.

`BrowserRouter` habilita la navegación con React Router.

`NutrividaContainer` proporciona el estado compartido.

`App` define las rutas y las páginas correspondientes.

El proveedor permanece montado al navegar entre páginas, lo que permite conservar el estado durante la sesión de navegación.

### 6.3. Hook useNutrivida

Ubicación:

```text
src/hooks/useNutrivida.js
```

Este hook permite consultar el contexto compartido de NutriVida.

Los containers lo utilizan para obtener datos y operaciones del proveedor.

También comprueba que se esté utilizando dentro del proveedor correspondiente.

### 6.4. Hook useCarrito

Ubicación:

```text
src/hooks/useCarrito.js
```

Centraliza la lógica del carrito de reservas.

Gestiona:

- Selección de planes.
- Cantidades.
- Cálculo del total.
- Contador de elementos.
- Apertura del panel lateral.
- Mensajes de disponibilidad.
- Eliminación de selecciones.
- Persistencia del carrito.

Entre las funciones disponibles están:

```text
agregarPlan
restarPlan
eliminarDelCarrito
vaciarCarrito
```

El hook recibe el catálogo para trabajar con los precios y cupos actualizados.

### 6.5. Hook useFormulario

Ubicación:

```text
src/hooks/useFormulario.js
```

Reutiliza el comportamiento común de los formularios.

Permite gestionar:

- Valores de los campos.
- Cambios realizados por el usuario.
- Errores.
- Mensajes.
- Estado del formulario.

Cada container mantiene las validaciones y operaciones propias de su funcionalidad.

### 6.6. Flujo de actualización del carrito

```text
Usuario pulsa Agendar
    ↓
TarjetaPlan ejecuta onAgendar(id)
    ↓
PlanesContainer llama a agregarPlan(id, true)
    ↓
useCarrito comprueba los cupos disponibles
    ↓
Se actualiza el estado de la selección
    ↓
React actualiza el contador, carrito y total
    ↓
El nuevo carrito se guarda en localStorage
```

El argumento `true` permite solicitar la apertura del panel lateral después de agregar el plan.

## 7. Datos y utilidades

### 7.1. Datos iniciales

Los datos se encuentran en:

```text
src/data/
```

| Archivo | Contenido |
|---|---|
| `planesData.js` | Planes iniciales, precios, descripciones y cupos |
| `usuariosData.js` | Usuarios iniciales |
| `articulosData.js` | Artículos del blog |
| `contenido.js` | Información y textos de la clínica |
| `formularios.js` | Configuración de campos, etiquetas y formularios |

Los datos están separados de los componentes visuales para facilitar su reutilización y mantenimiento.

### 7.2. Utilidades

Las funciones auxiliares se encuentran en:

```text
src/utils/
```

| Archivo | Responsabilidad |
|---|---|
| `almacenamiento.js` | Lectura y escritura de datos locales |
| `validaciones.js` | Validación de correo, RUN, contraseña, texto, precios y cupos |
| `formato.js` | Formato de precios, fechas e información del carrito |
| `presentacion.js` | Preparación de datos para los componentes visuales |
| `rutas.js` | Obtención de títulos según la ruta |

Estas funciones permiten reutilizar operaciones sin duplicar código entre los containers.

Las funciones de almacenamiento interactúan con el navegador, mientras que las de validación y formato realizan comprobaciones o transformaciones de datos.

## 8. Correspondencia con la implementación original

Las funcionalidades que anteriormente se encontraban en scripts JavaScript se distribuyeron entre las distintas capas de React.

| Responsabilidad original | Implementación React |
|---|---|
| Datos y configuración del sitio | `src/data/` y `src/utils/` |
| Catálogo | `PlanesContainer`, `DetallePlanContainer`, `GrillaPlanes` |
| Carrito | `useCarrito`, `CarritoContainer`, `CarritoLateral` |
| Validaciones | `utils/validaciones.js` y containers |
| Estado de sesión | `NutrividaContainer` |
| Inicio de sesión | `IngresoContainer` |
| Registro | `RegistroContainer` |
| Contacto | `ContactoContainer` |
| Agendamiento | `AgendarCitaContainer` |
| Confirmación | `ConfirmacionContainer` |
| Administración de planes | `PlanesAdminContainer`, `PlanAdminContainer` |
| Administración de usuarios | `UsuariosAdminContainer`, `UsuarioAdminContainer` |

La migración no consiste en convertir cada archivo JavaScript original en un único componente.

Una funcionalidad puede distribuirse entre componentes visuales, containers, hooks, datos y utilidades.

Esto permite separar sus responsabilidades y reutilizar código.

## 9. Navegación con React Router

### 9.1. Definición de rutas

El archivo:

```text
src/App.jsx
```

declara las rutas utilizando `Routes` y `Route`.

Cada ruta determina qué página debe mostrarse.

Por ejemplo:

```jsx
<Route path="planes" element={<PlanesPage />} />
<Route path="planes/:id" element={<DetallePlanPage />} />
```

La primera ruta muestra el catálogo.

La segunda permite mostrar el detalle de un plan según su identificador.

### 9.2. Parámetros dinámicos

Una ruta como:

```text
/planes/:id
```

permite recibir diferentes identificadores.

Por ejemplo:

```text
/planes/1
/planes/2
/planes/3
```

La página puede utilizar el parámetro para buscar el plan correspondiente.

En los containers se utilizan herramientas de React Router, como `useParams`, cuando se necesitan valores de la URL.

### 9.3. Navegación programática

React Router permite cambiar de vista mediante:

- `Link`: enlaces entre rutas.
- `Navigate`: redirección mediante un componente.
- `useNavigate`: navegación desde la lógica de un componente.
- `useLocation`: acceso a información de la ruta actual.
- `Outlet`: representación de las rutas hijas.

Estas herramientas permiten navegar sin recargar completamente la aplicación.

### 9.4. Protección de rutas

`AccesoContainer` comprueba el estado de la sesión y, cuando corresponde, el rol del usuario.

Las rutas de agendamiento y confirmación requieren sesión activa.

Las rutas administrativas requieren una sesión cuyo tipo sea Administrador.

Si no existe una sesión, se redirige al inicio de sesión.

Si un usuario autenticado intenta acceder a una ruta administrativa sin el rol necesario, se le redirige al inicio.

### 9.5. Rutas de la aplicación

| Ruta | Función |
|---|---|
| `/` | Inicio |
| `/nosotros` | Presentación de la clínica |
| `/contacto` | Contacto |
| `/blog` | Listado de artículos |
| `/blog/:id` | Detalle de un artículo |
| `/planes` | Catálogo |
| `/planes/:id` | Detalle de plan |
| `/carrito` | Mis Horas |
| `/login` | Inicio de sesión |
| `/registro` | Registro |
| `/agendar-cita` | Agendamiento |
| `/cita-confirmada` | Confirmación |
| `/admin` | Panel administrativo |
| `/admin/planes` | Gestión de planes |
| `/admin/planes/nuevo` | Nuevo plan |
| `/admin/planes/:id/editar` | Editar plan |
| `/admin/usuarios` | Gestión de usuarios |
| `/admin/usuarios/nuevo` | Nuevo usuario |
| `/admin/usuarios/:run/editar` | Editar usuario |

### 9.6. Compatibilidad con rutas anteriores

La aplicación mantiene compatibilidad con las direcciones HTML de NutriVida original.

Por ejemplo:

```text
/planes.html
    ↓
/planes
```

También permite trasladar identificadores utilizados en direcciones anteriores.

Por ejemplo:

```text
/detalle-plan.html?id=1
    ↓
/planes/1
```

Esto se implementa mediante las rutas de compatibilidad declaradas en `App.jsx` y `RutaAnteriorContainer`.

No es necesario conservar los documentos HTML originales para mostrar estas vistas.

## 10. Formularios y validaciones

Los formularios utilizan campos controlados mediante estado.

El componente visual reutilizable es:

```text
src/components/organisms/FormularioNutrivida.jsx
```

La configuración de los campos se encuentra en:

```text
src/data/formularios.js
```

### Flujo general de un formulario

```text
Usuario escribe un valor
    ↓
onChange comunica el cambio
    ↓
useFormulario actualiza el estado
    ↓
Usuario envía el formulario
    ↓
El container recibe onSubmit
    ↓
Se ejecutan las validaciones
    ↓
¿Los datos son válidos?
    ├── No → Se muestran errores
    └── Sí → Se ejecuta la operación
```

### Validaciones de usuarios

La lógica de validación se comparte mediante:

```text
src/utils/validaciones.js
```

Las reglas incluyen:

| Campo | Validación |
|---|---|
| Correo | Obligatorio, máximo 100 caracteres y dominio permitido |
| RUN | Formato de 7 u 8 dígitos más un carácter final numérico o K |
| Contraseña | Mínimo seis caracteres |
| Texto | Obligatorio y con longitudes según el formulario |
| Precio | Número válido no negativo |
| Cupos | Número entero mayor o igual a cero |

Los dominios permitidos para el correo son:

```text
gmail.com
duoc.cl
```

El RUN se almacena sin puntos ni guion.

La comprobación del RUN valida su estructura, pero no calcula el dígito verificador.

### Registro

`RegistroContainer` valida los campos antes de registrar al paciente.

Comprueba:

- Datos obligatorios.
- Formato del correo.
- Formato del RUN.
- Contraseña.
- Existencia de usuarios con el mismo RUN o correo.

El registro público crea usuarios de tipo Paciente.

### Inicio de sesión

`IngresoContainer` procesa el correo y la contraseña ingresados.

La sesión se administra mediante las operaciones compartidas de NutriVida.

Si el usuario intentaba acceder a una función protegida, el sistema puede conservar su destino para continuar después del inicio de sesión.

### Administración de usuarios

En la creación y edición administrativa se comprueban las reglas de los campos y la existencia de duplicados.

Durante la edición:

- El RUN permanece fijo.
- Una contraseña vacía conserva la anterior.
- Los cambios realizados se reflejan en el estado compartido.

### Formulario de contacto

`ContactoContainer` valida los datos del formulario y muestra el resultado en pantalla.

La confirmación no implica el envío de un correo a un servidor externo.

## 11. Flujo de reservas

La reserva de citas es uno de los flujos principales de NutriVida.

### 11.1. Selección de planes

El usuario puede seleccionar un plan desde el catálogo o su detalle.

La acción se comunica desde el componente visual hacia el container.

El estado del carrito es administrado mediante `useCarrito`.

### 11.2. Control de cantidades

Cada plan dispone de una cantidad limitada de cupos.

El sistema impide agregar cantidades superiores a la disponibilidad actual.

El carrito permite:

- Agregar planes.
- Incrementar cantidades.
- Reducir cantidades.
- Eliminar planes.
- Vaciar la selección.
- Consultar el total.

### 11.3. Acceso a la reserva

La página «Mis Horas» permite revisar los planes seleccionados.

Para continuar hacia el agendamiento se requiere una sesión activa.

Cuando no existe sesión, el usuario debe iniciar sesión antes de continuar.

### 11.4. Selección de fecha y horario

`AgendarCitaContainer` administra los campos de agendamiento.

Comprueba que:

- Exista una fecha.
- La fecha no sea anterior al día actual.
- Se seleccione un horario válido.
- Los datos del formulario sean correctos.

### 11.5. Confirmación de la reserva

La operación de confirmación se implementa en:

```text
src/containers/NutrividaContainer.jsx
```

La función `confirmarCita` realiza las comprobaciones necesarias antes de modificar los cupos.

Su flujo general es:

```text
Usuario confirma la reserva
    ↓
Se comprueba la sesión
    ↓
Se comprueba que el carrito tenga elementos
    ↓
Se consultan los planes disponibles
    ↓
Se comprueban los cupos de toda la selección
    ↓
¿Se puede confirmar?
    ├── No → Se devuelve un mensaje de error
    └── Sí
         ↓
       Se descuentan los cupos
         ↓
       Se guarda la última cita
         ↓
       Se vacía el carrito
         ↓
       Se muestra la confirmación
```

La comprobación de todos los planes ocurre antes de descontar cupos.

Agregar un plan al carrito no descuenta disponibilidad. El descuento se realiza durante la confirmación.

### 11.6. Confirmación visual

La ruta:

```text
/cita-confirmada
```

muestra la información de la última cita correspondiente a la sesión activa.

La información de la cita se mantiene mediante el estado compartido y el almacenamiento local.

### 11.7. Alcance de la disponibilidad

Los cupos corresponden a la disponibilidad general de cada plan.

La aplicación no implementa una agenda centralizada por profesional, fecha y hora.

Tampoco coordina reservas entre diferentes dispositivos mediante un servidor.

## 12. Persistencia con localStorage

El almacenamiento se gestiona principalmente mediante:

```text
src/utils/almacenamiento.js
```

Este módulo centraliza las operaciones de lectura, escritura y eliminación de datos locales.

### Claves utilizadas

```text
planes
usuarios
carrito
sesionActiva
correoSesion
nombreSesion
destinoTrasLogin
ultimaCita
```

### Funcionamiento

Al iniciar la aplicación, se consultan los datos disponibles en `localStorage`.

Si corresponde, se cargan los datos iniciales definidos en `src/data/`.

Cuando el usuario realiza una operación, se actualiza el estado correspondiente.

Los efectos de React permiten conservar determinados cambios en el almacenamiento del navegador.

### Persistencia y estado

El estado de React mantiene la información necesaria para actualizar la interfaz durante su funcionamiento.

`localStorage` permite recuperar los datos después de recargar la página.

Ambos cumplen funciones diferentes y complementarias.

### Sincronización entre pestañas

La aplicación escucha cambios de almacenamiento mediante el evento `storage`.

Esto permite recoger determinados cambios realizados desde otra pestaña del mismo origen.

Esta sincronización no equivale a una base de datos centralizada.

### Consideraciones

- El almacenamiento pertenece al navegador y al origen.
- Los datos pueden desaparecer si se limpia el almacenamiento del sitio.
- Diferentes dispositivos no comparten automáticamente la información.
- Cambiar el origen de ejecución puede hacer que se utilice otro almacenamiento.
- Las contraseñas y la sesión se gestionan localmente, por lo que este mecanismo no proporciona seguridad para datos reales en producción.

## 13. Diseño responsive con React Bootstrap

La aplicación utiliza Bootstrap para organizar visualmente el contenido en diferentes tamaños de pantalla.

### Grilla de doce columnas

Bootstrap distribuye el espacio mediante una grilla de doce columnas.

Las tarjetas de planes y artículos utilizan una distribución equivalente a:

```jsx
<Col xs={12} md={6} lg={4}>
  {/* Contenido de la tarjeta */}
</Col>
```

| Tamaño de pantalla | Columnas por tarjeta | Tarjetas por fila |
|---|---|---|
| Menos de 768 px | 12 | 1 |
| Desde 768 px | 6 | 2 |
| Desde 992 px | 4 | 3 |

Este comportamiento permite adaptar el catálogo a móviles, tablets y pantallas de escritorio.

### Componentes utilizados

Entre los componentes de React Bootstrap utilizados están:

- `Container`
- `Row`
- `Col`
- `Navbar`
- `Image`
- `Table`

### Menú de navegación

El encabezado utiliza:

```jsx
<Navbar expand="lg">
```

Esto permite mostrar un menú colapsable en pantallas pequeñas y una navegación expandida desde el breakpoint `lg`.

### Imágenes

Las imágenes se adaptan al ancho disponible mediante el componente `Image` y la propiedad `fluid`.

El componente `ImagenNutrivida` encapsula este comportamiento para reutilizarlo en las diferentes vistas.

### Carrito

`CarritoTemplate` distribuye el listado de selecciones y el resumen del carrito.

En pantallas grandes puede utilizar una distribución de ocho y cuatro columnas respectivamente.

### Administración

Las tablas administrativas utilizan un contenedor responsive para permitir desplazamiento horizontal cuando su contenido supera el ancho disponible.

### Estilos propios

La aplicación mantiene sus estilos visuales mediante:

```text
src/index.css
src/App.css
```

`index.css` contiene reglas generales.

`App.css` define la apariencia de las secciones, tarjetas, formularios y demás elementos propios de NutriVida.

React Bootstrap proporciona la estructura adaptable y los estilos propios mantienen la identidad visual de la clínica.

## 14. Pruebas automatizadas con Vitest

NutriVida incorpora pruebas automatizadas mediante **Vitest**.

Las herramientas utilizadas son:

| Herramienta | Función |
|---|---|
| Vitest | Ejecución y organización de las pruebas |
| React Testing Library | Renderizado y comprobación de componentes React |
| jest-dom | Matchers adicionales para comprobaciones del DOM |
| jsdom | Entorno de navegador simulado |
| V8 Coverage | Generación de estadísticas de cobertura |

### 14.1. Configuración

La configuración se encuentra en:

```text
vite.config.js
```

La sección de pruebas incluye:

```js
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/setupTests.js',
}
```

`globals: true` permite utilizar las funciones globales de Vitest.

`environment: 'jsdom'` proporciona un entorno DOM para las pruebas de componentes.

`setupFiles` indica qué archivo se ejecutará para preparar el entorno de pruebas.

### 14.2. Archivo de configuración adicional

El archivo:

```text
src/setupTests.js
```

importa:

```js
import '@testing-library/jest-dom/vitest'
```

Esto permite utilizar comprobaciones adicionales sobre los elementos renderizados.

### 14.3. Organización de los tests

Los archivos de pruebas se encuentran junto a los módulos correspondientes.

Ejemplos:

```text
src/components/atoms/BotonNutrivida.test.jsx
src/components/molecules/TarjetaPlan.test.jsx
src/hooks/useCarrito.test.js
src/utils/validaciones.test.js
```

El proyecto incluye **19 archivos de pruebas**.

Este número corresponde a archivos, no necesariamente a la cantidad total de casos de prueba.

### 14.4. Áreas verificadas

Las pruebas existentes se distribuyen entre diferentes responsabilidades.

**Utilidades**

- Validación de datos.
- Formato de información.
- Preparación de datos de presentación.
- Rutas.
- Almacenamiento local.
- Manejo de información de sesión.

**Hooks**

- Gestión del carrito.
- Estado y comportamiento de formularios.

**Átomos**

- Botones.
- Mensajes de formularios.

**Moléculas**

- Campos.
- Tarjetas.
- Títulos.
- Controles de cupos.

**Organismos**

- Avisos de disponibilidad.
- Listado del carrito.
- Resumen del carrito.
- Página no encontrada.

**Containers**

- Comportamiento de `PlanAdminContainer`.

### 14.5. Ejecutar pruebas

Para trabajar con Vitest en modo interactivo:

```bash
npm test
```

Para ejecutar todas las pruebas y finalizar:

```bash
npm run test:run
```

Para ejecutar pruebas y generar el informe de cobertura:

```bash
npm run coverage
```

### 14.6. Comprobaciones

Las pruebas permiten verificar distintas clases de comportamiento:

- Representación correcta de componentes.
- Información mostrada en pantalla.
- Reacciones a eventos.
- Comprobación de valores.
- Manejo de errores.
- Reglas de validación.
- Operaciones del carrito.
- Comportamiento de hooks.
- Operaciones específicas de containers.

Las pruebas automatizadas no sustituyen la revisión manual del funcionamiento completo de la aplicación.

## 15. Verificación del proyecto

Además de ejecutar las pruebas, se pueden realizar las siguientes comprobaciones.

### 15.1. Análisis estático

```bash
npm run lint
```

Oxlint analiza el código para detectar determinados patrones problemáticos.

### 15.2. Compilación

```bash
npm run build
```

Vite genera la versión compilada y comprueba la resolución de los módulos utilizados.

Superar el análisis estático no garantiza que la compilación o todas las pruebas sean correctas.

### 15.3. Revisión funcional

Para verificar el funcionamiento de NutriVida se pueden recorrer los siguientes flujos:

1. Abrir el inicio y las vistas públicas.
2. Consultar los planes y sus detalles.
3. Abrir los artículos del blog.
4. Registrar una cuenta de paciente.
5. Comprobar las validaciones de formularios.
6. Iniciar sesión.
7. Seleccionar planes y modificar cantidades.
8. Comprobar los cupos disponibles.
9. Confirmar una cita.
10. Verificar la persistencia después de recargar.
11. Cerrar sesión y comprobar el acceso a rutas protegidas.
12. Iniciar sesión con una cuenta administrativa.
13. Crear, editar y eliminar planes y usuarios.
14. Revisar la navegación en distintos tamaños de pantalla.

### 15.4. Revisión de compatibilidad

También es importante comprobar:

- Redirecciones desde direcciones HTML anteriores.
- Rutas con parámetros dinámicos.
- Página no encontrada.
- Recarga directa de una ruta.
- Funcionamiento del menú móvil.
- Tablas administrativas.
- Imágenes y recursos estáticos.

## 16. Consideraciones de mantenimiento

La arquitectura permite localizar las responsabilidades de cada funcionalidad siguiendo su flujo.

Para revisar una página, el recorrido habitual es:

```text
App.jsx
    ↓
Page
    ↓
Container
    ↓
Hooks / Context / Utils
    ↓
Componentes visuales
```

No todas las funcionalidades necesitan recorrer todos los niveles.

### Cambios en la interfaz

Cuando un cambio afecta únicamente la representación visual, suele corresponder a un componente de `atoms`, `molecules`, `organisms`, `templates` o a los estilos CSS.

### Cambios en la lógica

Las operaciones específicas de una funcionalidad suelen mantenerse en su container.

Las operaciones compartidas pueden encontrarse en el proveedor, en hooks personalizados o en utilidades.

### Cambios en las validaciones

Las validaciones generales se mantienen en:

```text
src/utils/validaciones.js
```

Las comprobaciones que dependen de un flujo específico pueden mantenerse en su container correspondiente.

### Cambios en los datos iniciales

Los datos iniciales se encuentran en:

```text
src/data/
```

Si ya existe información persistida en el navegador, modificar los valores iniciales no implica necesariamente reemplazar los datos guardados.

### Cambios en las rutas

Las rutas principales se definen en:

```text
src/App.jsx
```

Las rutas de compatibilidad con las direcciones HTML anteriores también se gestionan desde esta estructura.

### Cambios en las pruebas

Las pruebas se mantienen junto al módulo que verifican.

Al modificar una regla de negocio o un componente, corresponde revisar las pruebas relacionadas y comprobar que continúan representando el comportamiento esperado.

## 17. Alcance técnico de la implementación

NutriVida implementa una aplicación React con:

- Arquitectura organizada por componentes.
- Separación de lógica y presentación.
- Estado compartido mediante Context API.
- Hooks personalizados.
- Navegación con React Router.
- Validaciones de formularios.
- Persistencia mediante localStorage.
- Diseño responsive con React Bootstrap.
- Pruebas unitarias y de componentes mediante Vitest.
- Análisis estático y compilación mediante las herramientas del proyecto.

La aplicación conserva las funcionalidades principales de NutriVida y organiza su implementación en módulos con responsabilidades definidas.

El funcionamiento actual depende del almacenamiento local del navegador. La incorporación de un backend, una base de datos centralizada o un servicio real de autenticación y reservas requeriría ampliar la arquitectura existente.

---

Para conocer los comandos de instalación, ejecución, pruebas y compilación, consulta el [README principal](../README.md).