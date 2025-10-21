/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("attachments", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      entidad_tipo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      entidad_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      nombre_archivo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ruta_archivo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo_mime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tamano: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      subido_por: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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

    await queryInterface.addIndex("attachments", ["entidad_tipo", "entidad_id"])
    await queryInterface.addIndex("attachments", ["subido_por"])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("attachments")
  },
}
