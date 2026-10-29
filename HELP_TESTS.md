# Guía de Comandos del Proyecto

## Iniciar el Proyecto
Para comenzar a trabajar en el proyecto localmente, ejecuta:
```bash
npm install
npm run dev
```

---

## Ejecución de Tests

### Correr todos los tests
```bash
npm run test:run
```

### Correr un solo test
Puedes ejecutar un archivo de prueba específico usando su ruta completa o simplemente una palabra clave de su nombre:

```bash
# Opción 1: Ruta completa
npm run test:run -- src/components/atoms/BotonNutrivida.test.jsx

# Opción 2: Filtrar por nombre
npm run test:run -- BotonNutrivida

# Opción 3: Usar el alias corto de npm
npm t -- BotonNutrivida
```

---

## Actualizaciones de Node (Entorno Duoc)
Si necesitas actualizar o cambiar la versión de Node.js utilizando **NVM**, usa los siguientes comandos:

```bash
# Instalar y usar una versión específica (ej. 22.11.0)
nvm install 22.11.0
nvm use 22.11.0

# Instalar y usar la última versión LTS (Soporte a Largo Plazo)
nvm install lts
nvm use lts
```
