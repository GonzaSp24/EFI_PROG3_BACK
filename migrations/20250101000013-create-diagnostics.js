/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("diagnostics", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      order_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "repair_orders",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      solucion_propuesta: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      costo_estimado: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      },
      fecha_diagnostico: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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

    await queryInterface.addIndex("diagnostics", ["order_id"])
    await queryInterface.addIndex("diagnostics", ["tecnico_id"])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("diagnostics")
  },
}
