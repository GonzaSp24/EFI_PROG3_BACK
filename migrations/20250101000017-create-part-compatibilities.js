/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("part_compatibilities", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      part_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "parts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      device_model_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "device_models",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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

    await queryInterface.addIndex("part_compatibilities", ["part_id"])
    await queryInterface.addIndex("part_compatibilities", ["device_model_id"])
    await queryInterface.addIndex("part_compatibilities", ["part_id", "device_model_id"], { unique: true })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("part_compatibilities")
  },
}
