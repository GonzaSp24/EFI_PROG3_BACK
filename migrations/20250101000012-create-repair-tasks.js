/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("repair_tasks", {
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
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      assigned_to: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "pendiente",
      },
      fecha_inicio: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      fecha_fin: {
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

    await queryInterface.addIndex("repair_tasks", ["order_id"])
    await queryInterface.addIndex("repair_tasks", ["assigned_to"])
    await queryInterface.addIndex("repair_tasks", ["estado"])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("repair_tasks")
  },
}
