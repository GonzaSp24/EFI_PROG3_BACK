/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("quotes", {
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
      numero: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      fecha_emision: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      fecha_vencimiento: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      subtotal: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      impuestos: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      total: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "pendiente",
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

    await queryInterface.addIndex("quotes", ["order_id"])
    await queryInterface.addIndex("quotes", ["numero"])
    await queryInterface.addIndex("quotes", ["estado"])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("quotes")
  },
}
