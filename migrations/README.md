# Sequelize Migrations

Este directorio contiene todas las migraciones de Sequelize para crear la estructura de la base de datos.

## Orden de ejecución

Las migraciones están numeradas para ejecutarse en el orden correcto respetando las dependencias de claves foráneas:

1. **Catálogos** (roles, order_statuses, payment_methods)
2. **Usuarios** (users, customers)
3. **Dispositivos** (brands, device_models, devices, customer_devices)
4. **Órdenes** (repair_orders, order_histories, repair_tasks, diagnostics, test_checklist_items)
5. **Inventario** (suppliers, parts, part_compatibilities, inventory_movements)
6. **Facturación** (quotes, quote_items, invoices, payments)
7. **Compartido** (attachments)

## Comandos útiles

### Ejecutar todas las migraciones
\`\`\`bash
npx sequelize-cli db:migrate
\`\`\`

### Revertir la última migración
\`\`\`bash
npx sequelize-cli db:migrate:undo
\`\`\`

### Revertir todas las migraciones
\`\`\`bash
npx sequelize-cli db:migrate:undo:all
\`\`\`

### Ver estado de las migraciones
\`\`\`bash
npx sequelize-cli db:migrate:status
\`\`\`

## Configuración

Asegúrate de tener configuradas las variables de entorno en tu archivo `.env`:

\`\`\`env
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_base_datos
\`\`\`

## Notas importantes

- Las migraciones usan `BIGINT` para IDs y claves foráneas
- Se incluyen índices para optimizar consultas frecuentes
- Las relaciones usan `CASCADE` para actualizaciones y `RESTRICT` o `SET NULL` para eliminaciones según el caso
- Los timestamps (`created_at`, `updated_at`) se manejan automáticamente
