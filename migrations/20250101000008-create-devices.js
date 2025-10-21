/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("devices", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      brand_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "brands",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      device_model_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "device_models",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      serial_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      physical_state: {
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

    await queryInterface.addIndex("devices", ["serial_number"])
    await queryInterface.addIndex("devices", ["brand_id"])
    await queryInterface.addIndex("devices", ["device_model_id"])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("devices")
  },
}
