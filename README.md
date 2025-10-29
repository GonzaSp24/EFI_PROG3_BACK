# TechFix Backend API

Sistema de gestión para taller de reparación de dispositivos electrónicos.

## Requisitos

- Node.js 18+
- MySQL 8.0+
- npm o yarn

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
\`\`\`bash
npm install
\`\`\`

3. Configurar variables de entorno:
   - Copiar `.env.example` a `.env`
   - Configurar las credenciales de la base de datos

4. Crear la base de datos:
\`\`\`sql
CREATE DATABASE techfixdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
\`\`\`

5. Inicializar la base de datos (crear tablas):
\`\`\`bash
npm run dev
\`\`\`
   - Asegúrate de tener `SYNC_DB=true` en tu `.env` la primera vez

6. Poblar con datos de prueba:
\`\`\`bash
npm run seed
\`\`\`

## Scripts Disponibles

- `npm run dev` - Inicia el servidor en modo desarrollo con nodemon
- `npm start` - Inicia el servidor en modo producción
- `npm run seed` - Puebla la base de datos con datos de prueba

## Estructura del Proyecto

\`\`\`
backend/
├── config/              # Configuración de la base de datos
├── controllers/         # Controladores de las rutas
├── middleware/          # Middleware de autenticación y validación
├── models/              # Modelos de Sequelize (CommonJS)
├── routes/              # Definición de rutas
├── scripts/             # Scripts de utilidad (seeders, etc.)
├── src/
│   ├── config/          # Configuración (ES6)
│   └── models/          # Modelos de Sequelize (ES6)
├── utils/               # Utilidades (nodemailer, etc.)
├── validators/          # Validadores de datos
├── server.js            # Punto de entrada del servidor
└── .env                 # Variables de entorno
\`\`\`

## API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/forgot-password` - Recuperar contraseña
- `POST /api/auth/reset-password` - Restablecer contraseña

### Usuarios
- `GET /api/users` - Listar usuarios
- `GET /api/users/:id` - Obtener usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

### Clientes
- `GET /api/customers` - Listar clientes
- `POST /api/customers` - Crear cliente
- `GET /api/customers/:id` - Obtener cliente
- `PUT /api/customers/:id` - Actualizar cliente
- `DELETE /api/customers/:id` - Eliminar cliente

### Órdenes de Reparación
- `GET /api/repair-orders` - Listar órdenes
- `POST /api/repair-orders` - Crear orden
- `GET /api/repair-orders/:id` - Obtener orden
- `PUT /api/repair-orders/:id` - Actualizar orden
- `DELETE /api/repair-orders/:id` - Eliminar orden

### Dispositivos
- `GET /api/devices` - Listar dispositivos
- `GET /api/brands` - Listar marcas
- `GET /api/device-models` - Listar modelos

### Inventario
- `GET /api/parts` - Listar repuestos
- `POST /api/parts` - Crear repuesto
- `GET /api/suppliers` - Listar proveedores

### Facturación
- `GET /api/invoices` - Listar facturas
- `POST /api/invoices` - Crear factura
- `GET /api/quotes` - Listar presupuestos
- `POST /api/payments` - Registrar pago

## Credenciales de Prueba

Después de ejecutar el seeder:

**Administrador:**
- Email: `admin@techfix.com`
- Password: `admin123`

**Técnico:**
- Email: `tecnico@techfix.com`
- Password: `admin123`

## Testing con Postman

1. Importar la colección de Postman (próximamente)
2. Configurar la variable de entorno `baseUrl` a `http://localhost:3001`
3. Probar el endpoint de health check: `GET /health`
4. Autenticarse con `POST /api/auth/login`
5. Usar el token JWT en los headers: `Authorization: Bearer <token>`

## Notas de Desarrollo

- La primera vez que ejecutes el servidor, asegúrate de tener `SYNC_DB=true` para crear las tablas
- Después de la primera ejecución, cambia `SYNC_DB=false` para evitar sincronizaciones innecesarias
- NUNCA uses `DB_FORCE=true` en producción (elimina todas las tablas)
- El seeder se puede ejecutar múltiples veces, usa `ignoreDuplicates` para evitar errores

## Próximos Pasos

1. Testear todos los endpoints en Postman
2. Implementar validaciones adicionales
3. Agregar más seeders según necesites
4. Configurar el frontend para consumir esta API
