import { QueryInterface, DataTypes } from 'sequelize';

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('parameter_store', {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      key: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      value: {
        type: DataTypes.JSON,
        allowNull: false
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    });

    await queryInterface.addIndex('parameter_store', ['key']);
  },
  down: async (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('parameter_store');
  }
};
