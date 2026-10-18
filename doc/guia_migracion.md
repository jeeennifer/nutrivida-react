# NutriVida React: guía de migración y estudio

Esta guía explica cómo se transformó el sitio HTML, CSS y JavaScript en la aplicación React actual. Para instalar y ejecutar el proyecto, consulta el [README principal](../README.md).

## 1. Punto de partida y objetivo

| Repositorio | Papel en la migración |
|---|---|
| `jeeennifer/nutrivida` | Fuente del contenido, las imágenes, la apariencia y las funcionalidades |
| `jeeennifer/tienda-react` | Referencia de arquitectura, configuración, React Bootstrap y comentarios estructurados |
| `jeeennifer/nutrivida-react` | Base Vite y destino de la implementación |

Se conservaron las funciones de la clínica: planes, selección de horas, reservas, cuentas, blog, contacto y administración. La referencia de tienda se utilizó para organizar el código; las funcionalidades implementadas corresponden a NutriVida.

**El resultado es autónomo:** para ejecutarlo basta con esta carpeta y sus dependencias npm. Los otros repositorios explican su origen, pero no son dependencias de ejecución.

## 2. Qué cambia al pasar del sitio estático a React

| Sitio original | Implementación React |
|---|---|
| Un documento HTML por vista | Una aplicación con páginas seleccionadas mediante React Router |
| Encabezado y pie repetidos en los HTML | Componentes `Header` y `Footer` dentro del marco compartido |
| Construcción de tarjetas mediante cadenas HTML | Componentes reutilizables renderizados con `.map()` y una `key` estable |
| Lectura y modificación de elementos del DOM | Estado de React y props que determinan lo que se muestra |
| Eventos conectados con `addEventListener` | Props como `onClick`, `onChange` y `onSubmit` |
| Campos leídos directamente al enviar | Formularios controlados con valores y errores en el estado |
| Cambios de página mediante direcciones HTML | `Link`, `Navigate` y `useNavigate` |
| Datos y operaciones distribuidos en scripts | `data`, `utils`, contexto, hooks y containers |
| Distribución estructural hecha con CSS propio | Grillas y componentes de React Bootstrap, complementados con CSS visual |

React actualiza la interfaz cuando cambia el estado. Por ejemplo, agregar un plan modifica la selección y provoca que se actualicen el contador, el listado y el total sin escribir manualmente su HTML.

`localStorage` continúa proporcionando persistencia. El estado de React permite actualizar la pantalla durante el uso; el almacenamiento permite recuperar información después de recargar.

## 3. Orden de construcción y responsabilidades

| Parte | Qué se preparó | Para qué sirve |
|---|---|---|
| Base | Vite, dependencias, `index.html`, `main.jsx` y estilos | Arrancar y montar la aplicación |
| Utilidades | Almacenamiento, formatos, validaciones, presentación y títulos | Compartir operaciones independientes de React |
| Datos | Planes, usuarios, artículos, contenido y formularios | Separar la información de su representación |
| Átomos | Botones, entradas, etiquetas, imágenes, precios y mensajes | Definir las piezas visuales básicas |
| Moléculas | Tarjetas, campos completos, control de cupos y resúmenes | Combinar piezas para una función concreta |
| Organismos | Grillas, formularios, cabecera, pie, tablas y secciones | Construir bloques completos de interfaz |
| Templates | Marco general y distribuciones reutilizables | Definir dónde se coloca el contenido |
| Contexto y hooks | Contexto compartido y mecánica reutilizable | Facilitar el acceso al estado y la gestión de formularios |
| Containers | Operaciones, decisiones, validaciones y navegación | Conectar las reglas de negocio con la UI |
| Pages y rutas | Composición de vistas y reglas de acceso | Mostrar la vista correspondiente a la URL |

Esta tabla describe las dependencias de construcción. Las páginas y los containers se conectaron progresivamente por funcionalidad.

## 4. Atomic Design aplicado al proyecto

Dentro de `src/components/` existen cinco niveles:

| Nivel | Ejemplos reales | Qué debe conocer |
|---|---|---|
| `atoms/` | `BotonNutrivida`, `EntradaCampo`, `ImagenNutrivida`, `PrecioPlan` | Las props necesarias para representar una pieza |
| `molecules/` | `TarjetaPlan`, `CampoFormulario`, `ControlCupos` | Los datos y acciones de una composición pequeña |
| `organisms/` | `GrillaPlanes`, `FormularioNutrivida`, `TablaAdministrador`, `Header` | La información de una sección completa |
| `templates/` | `MainTemplate`, `PaginaTemplate`, `PortadaTemplate`, `CarritoTemplate` | La distribución y los espacios de contenido |
| `pages/` | `PlanesPage`, `ArticuloPage`, `UsuarioAdminPage` | Qué template y container componen una vista |

Las importaciones entre niveles visuales avanzan hacia abajo:

```text
Pages → Templates → Organisms → Molecules → Atoms
```

Esta línea indica la dirección permitida, no obliga a utilizar todos los niveles en cada pantalla. Los containers forman una capa de lógica externa a esa jerarquía visual.

### Ejemplo: el catálogo

1. `PlanesPage` compone `PaginaTemplate` con `PlanesContainer` como contenido.
2. `PlanesContainer` obtiene los planes y prepara sus datos para la presentación.
3. `GrillaPlanes` distribuye los planes en filas y columnas.
4. `TarjetaPlan` representa cada plan y comunica la acción de agendar.
5. `ImagenNutrivida`, `PrecioPlan` y `BotonNutrivida` aportan piezas de la tarjeta.

`MainTemplate` define el marco de todo el sitio y recibe cabecera, pie y elementos superpuestos. Los demás templates distribuyen el contenido de las vistas dentro de ese marco.

## 5. Container / Presentational

La separación responde a dos responsabilidades:

| Lógica: containers y hooks | Presentación: átomos, moléculas y organismos |
|---|---|
| Consultar y modificar el estado | Representar los valores recibidos |
| Ejecutar validaciones y operaciones | Mostrar errores, mensajes y resultados |
| Resolver parámetros y decisiones de navegación | Comunicar acciones mediante callbacks |
| Acceder al almacenamiento cuando corresponde | Recibir los datos mediante props |

Un botón puede ejecutar `onAgendar(plan.id)` sin decidir cómo se guarda el plan. Esa función llega desde el container.

En el catálogo, el recorrido real de una acción es:

```text
Clic en Agendar
  → TarjetaPlan llama a onAgendar(id)
  → PlanesContainer llama a agregarPlan(id, true)
  → NutrividaContainer comprueba los cupos y actualiza la selección
  → React vuelve a representar contador, carrito y total
  → Un efecto persiste el carrito en localStorage
```

El segundo argumento `true` solicita abrir el panel lateral. La tarjeta conserva la misma responsabilidad visual aunque la operación de reserva cambie en el futuro.

## 6. Contexto, proveedor, hooks, datos y utilidades

### Tres piezas diferentes para compartir estado

| Archivo | Responsabilidad |
|---|---|
| `src/context/NutriContext.js` | Declara `ContextoNutrivida` con `createContext` |
| `src/containers/NutrividaContainer.jsx` | Mantiene el estado, implementa las operaciones y proporciona el valor del contexto |
| `src/hooks/useNutrivida.js` | Permite a los containers consultar ese contexto y comprueba que exista un proveedor |

Declarar un contexto no crea por sí solo el catálogo ni la sesión. Es `NutrividaContainer` quien mantiene esos datos y expone funciones como `agregarPlan`, `ingresar`, `guardarUsuario` y `confirmarCita`.

`main.jsx` monta una única instancia del router y del proveedor:

```text
StrictMode
  └── BrowserRouter
      └── NutrividaContainer
          └── App
```

Al cambiar de página, el proveedor continúa montado y conserva el estado compartido.

### Hooks

- `useNutrivida`: acceso compartido al contexto desde los containers.
- `useFormulario`: valores, errores, mensajes, estado de envío y navegación diferida de formularios.

Cada container conserva las validaciones y operaciones específicas de su formulario. Los estados exclusivos de una funcionalidad pueden permanecer en su container; los hooks extraen la mecánica que se reutiliza.

### Datos

| Archivo en `src/data/` | Contenido |
|---|---|
| `planesData.js` | Los cuatro planes iniciales, sus descripciones, precios y cupos |
| `usuariosData.js` | Las cuentas iniciales de demostración |
| `articulosData.js` | Los tres artículos completos |
| `contenido.js` | Textos y datos de presentación del sitio |
| `formularios.js` | Títulos, campos, etiquetas y opciones de formularios |

Son módulos JavaScript. En un objeto, una clave válida como `titulo` puede escribirse sin comillas; su valor de texto sí lleva comillas. JSON exige comillas dobles también en las claves.

### Utilidades

| Archivo en `src/utils/` | Responsabilidad |
|---|---|
| `almacenamiento.js` | Lectura y escritura local, sesión y destino después del ingreso |
| `validaciones.js` | Comprobaciones de correo, texto, contraseña y RUN |
| `formato.js` | Precios, fechas, rutas de imágenes y sincronización del carrito |
| `presentacion.js` | Preparar valores que recibirá la UI, como precios y subtotales formateados |
| `rutas.js` | Obtener el título del documento según la dirección actual |

Estos módulos no usan hooks de React. Algunas funciones, como las de almacenamiento, interactúan con el navegador; otras son transformaciones puras de datos.

## 7. Correspondencia de los scripts originales

| JavaScript original | Ubicación de su responsabilidad en React |
|---|---|
| `datos.js` | `data/planesData.js`, `data/usuariosData.js`, `utils/almacenamiento.js` y `NutrividaContainer` |
| `catalogo.js` | `PlanesContainer`, `DetallePlanContainer`, `GrillaPlanes` y `DetallePlan` |
| `carrito.js` | `NutrividaContainer`, `CarritoContainer`, `SitioContainer`, `ListaCarrito` y `CarritoLateral` |
| `validaciones.js` | `utils/validaciones.js` y las comprobaciones específicas de cada container |
| `sesion.js`, `admin-auth.js` | Estado de sesión en `NutrividaContainer`, `AccesoContainer` y `SitioContainer` |
| `login.js` | `IngresoContainer` |
| `registro.js` | `RegistroContainer` |
| `contacto.js` | `ContactoContainer` |
| `agendar-cita.js` | `AgendarCitaContainer` y `confirmarCita` en `NutrividaContainer` |
| `cita-confirmada.js` | `ConfirmacionContainer` y `ConfirmacionCita` |
| `admin-planes.js` | `PlanesAdminContainer` y `TablaAdministrador` |
| `admin-plan-form.js` | `PlanAdminContainer` y `FormularioNutrivida` |
| `admin-usuarios.js` | `UsuariosAdminContainer` y `TablaAdministrador` |
| `admin-usuario-form.js` | `UsuarioAdminContainer` y `FormularioNutrivida` |

La migración divide responsabilidades de cada script entre datos, operaciones y presentación. Por eso la correspondencia no siempre es de un archivo original a un único archivo React.

## 8. Páginas, rutas y recursos: tres conceptos distintos

| Concepto | Ejemplo | Significado |
|---|---|---|
| Ruta de un archivo | `src/components/pages/reservas/PlanesPage.jsx` | Dónde está guardado el código |
| Ruta de navegación | `/planes` | Qué vista solicita el usuario en el navegador |
| Ruta de un recurso | `/assets/img/plan-consulta.jpg` | Dónde se obtiene una imagen servida por la aplicación |

La carpeta `reservas/` agrupa catálogo, detalle, selección y confirmación porque pertenecen al mismo flujo. Su nombre no añade `/reservas` a las direcciones del navegador.

Un import como `../context/NutriContext` busca un archivo dentro de `src`, relativo al archivo que lo importa. No consulta el repositorio HTML original.

### Correspondencia de vistas

| Vista original | Ruta React |
|---|---|
| `index.html` | `/` |
| `nosotros.html` | `/nosotros` |
| `contacto.html` | `/contacto` |
| `planes.html` | `/planes` |
| `detalle-plan.html?id=1` | `/planes/1` |
| `blog.html` | `/blog` |
| `blog-detalle-1.html` | `/blog/1` |
| `blog-detalle-2.html` | `/blog/2` |
| `blog-detalle-3.html` | `/blog/3` |
| `login.html` | `/login` |
| `registro.html` | `/registro` |
| `carrito.html` | `/carrito` |
| `agendar-cita.html` | `/agendar-cita` |
| `cita-confirmada.html` | `/cita-confirmada` |
| `admin-home.html` | `/admin` |
| `admin-planes.html` | `/admin/planes` |
| `admin-plan-form.html` | `/admin/planes/nuevo` |
| `admin-plan-form.html?id=1` | `/admin/planes/1/editar` |
| `admin-usuarios.html` | `/admin/usuarios` |
| `admin-usuario-form.html` | `/admin/usuarios/nuevo` |
| `admin-usuario-form.html?run=111111111` | `/admin/usuarios/111111111/editar` |

Los valores de ID y RUN son ejemplos. React Router obtiene los valores reales mediante parámetros de ruta.

### Una página para los tres artículos

`ArticuloPage` es una única estructura reutilizable. `ArticuloContainer` lee el parámetro `id`, busca el artículo en `articulosData.js` y entrega su contenido a `ArticuloBlog`.

Así, `/blog/1`, `/blog/2` y `/blog/3` siguen mostrando tres artículos diferentes. Lo que se comparte es la estructura de presentación.

La misma idea se aplica al detalle de planes. Los formularios administrativos también reutilizan una página para creación y edición según la ruta.

### Compatibilidad con las direcciones anteriores

`RUTAS_ANTERIORES`, en `App.jsx`, reconoce los nombres de los diecinueve HTML originales. `RutaAnteriorContainer` interpreta los parámetros necesarios y redirige con `Navigate`.

```text
/detalle-plan.html?id=1 → /planes/1
```

Esa compatibilidad conserva enlaces antiguos. No abre documentos del otro repositorio ni necesita que exista su carpeta. Los enlaces actuales de la aplicación utilizan las rutas React.

## 9. Formularios y reglas que se conservaron

`FormularioNutrivida` representa campos y mensajes a partir de la configuración y las props recibidas. Cada container define los valores iniciales y lo que debe ocurrir al enviar.

El proceso habitual es:

1. `onChange` actualiza los valores controlados mediante `useFormulario`.
2. El container recibe el envío y evita la recarga del formulario.
3. Ejecuta las validaciones y reúne los errores por campo.
4. Si hay errores, la UI los muestra con los valores que el usuario escribió.
5. Si los datos son válidos, ejecuta la operación y muestra el resultado o navega.

| Regla | Comportamiento actual |
|---|---|
| Correo | Dominios `gmail.com` o `duoc.cl`, máximo 100 caracteres |
| RUN | 7 u 8 dígitos y un número o `K` al final, sin puntos ni guion; se valida formato |
| Contraseña | Mínimo seis caracteres |
| Duplicados | Registro y administración comprueban RUN y correo |
| Edición de usuarios | RUN bloqueado; contraseña vacía conserva la guardada |
| Acceso administrativo | Requiere sesión con rol Administrador |
| Reserva | Requiere sesión, selección, fecha desde hoy, horario válido y cupos suficientes |
| Contacto | Valida los campos y muestra una confirmación local |

El registro público crea pacientes. Los roles Paciente y Nutricionista utilizan el sitio público; Administrador puede acceder al panel.

## 10. Flujo de reserva y persistencia

1. El paciente agrega planes al carrito desde el catálogo o el detalle.
2. Las cantidades se limitan a los cupos disponibles y el total se calcula como precio por cantidad.
3. Antes de agendar se exige una sesión. Si falta, se conserva el destino para continuar después del ingreso.
4. `AgendarCitaContainer` valida la fecha y el horario.
5. `NutrividaContainer.confirmarCita` vuelve a comprobar la sesión y los cupos de todos los planes seleccionados.
6. Si la selección completa es válida, descuenta cupos, guarda la cita y vacía el carrito.
7. Se muestra `/cita-confirmada`, con la última cita asociada al correo conectado.

Agregar un plan no descuenta cupos. El descuento ocurre al confirmar. Los cupos son generales por plan; el modelo no administra disponibilidad independiente por profesional, día y horario.

Las claves locales utilizadas son:

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

`data/` aporta los datos iniciales cuando no existe una lista válida guardada. Una lista vacía guardada sigue siendo una lista válida: no se repuebla automáticamente.

El estado compartido también recibe cambios de otras pestañas mediante el evento `storage`. Esto sincroniza pestañas del mismo origen; no crea una base de datos compartida entre equipos.

Cambiar el puerto, el navegador o el dominio cambia el almacenamiento disponible. Por eso los datos del sitio HTML no aparecen automáticamente en otra dirección de Vite.

## 11. De CSS estructural a React Bootstrap

Bootstrap utiliza una grilla de doce columnas. En planes y blog:

```jsx
<Col xs={12} md={6} lg={4}>
  {/* Tarjeta correspondiente */}
</Col>
```

| Ancho de pantalla | Columnas ocupadas por tarjeta | Tarjetas por fila |
|---|---:|---:|
| Menos de 768 px | 12 de 12 | 1 |
| Desde 768 px (`md`) | 6 de 12 | 2 |
| Desde 992 px (`lg`) | 4 de 12 | 3 |

El navegador aplica primero la distribución móvil y la ajusta al alcanzar cada breakpoint.

Otros ejemplos del proyecto:

- El hero apila imagen y texto en móvil y los distribuye en dos columnas desde `md`.
- El equipo clínico utiliza `xs={12} md={6} lg={3}`.
- `CarritoTemplate` separa listado y resumen con `lg={8}` y `lg={4}`.
- `Navbar expand="lg"` utiliza menú colapsable en pantallas pequeñas.
- `ImagenNutrivida` encapsula `Image fluid`.
- `TablaAdministrador` utiliza `Table responsive` para contener el desplazamiento horizontal.

Los colores, tamaños, fondos y detalles visuales propios siguen definidos en CSS. La grilla resuelve la distribución responsive, mientras esos estilos conservan la apariencia de NutriVida.

### Separación de estilos

| Archivo | Contenido | Importado por |
|---|---|---|
| CSS de Bootstrap | Base y estilos de los componentes de la librería | `main.jsx` |
| `src/index.css` | Tipografía, base del documento y reglas globales | `main.jsx` |
| `src/App.css` | Secciones, tarjetas, formularios y ajustes visuales de NutriVida | `App.jsx` |

Los estilos de ejemplo de Vite se sustituyeron por los del proyecto. Se conserva `App.css` porque tiene una responsabilidad concreta dentro de esta separación.

## 12. Cómo comprobar y estudiar la implementación

### Comandos actuales

```bash
npm run lint
npm run build
```

- **Lint** revisa patrones del código con Oxlint.
- **Build** compila la aplicación y comprueba que Vite pueda resolver sus importaciones.
- **Revisión en navegador** permite comprobar navegación, comportamiento y presentación.

Que lint termine sin errores no garantiza que build pase: una ruta de importación incorrecta puede detectarse al compilar.

### Recorrido funcional

1. Abrir las vistas públicas y los tres artículos.
2. Registrar un paciente y comprobar los errores de campos y duplicados.
3. Ingresar, agregar planes, cambiar cantidades y confirmar una cita.
4. Recargar para comprobar la persistencia y cerrar sesión.
5. Ingresar como administrador y crear, editar y eliminar datos de prueba.
6. Comprobar restricciones de acceso, una dirección HTML anterior y una ruta desconocida.
7. Revisar el menú, las tarjetas, las imágenes y las tablas en móvil, tablet y escritorio.

Para estudiar un flujo, empieza por su ruta en `App.jsx`, localiza la página, sigue hacia su container y observa qué props recibe el organismo. Después revisa las funciones compartidas que utiliza.

### Errores frecuentes

| Síntoma | Qué revisar |
|---|---|
| `UNRESOLVED_IMPORT` | Carpeta, nombre, mayúsculas y ruta relativa del archivo |
| No se encuentra `NutriContext` | Su ubicación debe ser `src/context/NutriContext.js` |
| El hook indica que falta el proveedor | El container debe estar dentro de `NutrividaContainer` |
| Aparece un error de router anidado | `BrowserRouter` se monta una sola vez en `main.jsx` |
| Una imagen no carga | Archivo en `public/assets/img/` y URL `/assets/img/...` |
| Un cambio en los datos iniciales no aparece | Puede existir una versión guardada en `localStorage` |
| Una ruta falla al recargar en el hosting | El servidor necesita fallback a `index.html` |

### Etapa pendiente: Vitest

Vitest todavía no está instalado ni configurado. Tampoco existen `setupTests.js`, archivos de tests ni scripts `test` en esta versión.

La siguiente etapa podrá incorporar pruebas de validaciones, cantidades y cupos, registro e ingreso, reservas y acceso según el rol. Esa incorporación requiere sus propias dependencias y configuración; no se ejecuta todavía con los comandos del proyecto.