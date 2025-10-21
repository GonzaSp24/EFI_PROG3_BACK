/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("repair_orders", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      customer_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "customers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      device_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "devices",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      tecnico_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      prioridad: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "media",
      },
      fecha_recibido: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fecha_entrega_estimada: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      problema_reportado: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      costo_estimado: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      },
      estado_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "order_statuses",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      descripcion_equipo: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      accesorios_recibidos: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      contacto_preferido: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      presupuesto_autorizado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      anticipo_monto: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
    })

    await queryInterface.addIndex("repair_orders", ["customer_id"])
    await queryInterface.addIndex("repair_orders", ["device_id"])
    await queryInterface.addIndex("repair_orders", ["tecnico_id"])
    await queryInterface.addIndex("repair_orders", ["estado_id"])
    await queryInterface.addIndex("repair_orders", ["fecha_recibido"])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("repair_orders")
  },
}
