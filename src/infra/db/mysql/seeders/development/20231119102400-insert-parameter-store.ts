import { QueryInterface } from 'sequelize';

export = {
  up: async (queryInterface:QueryInterface) => {
     await queryInterface.bulkInsert('parameter_store', [{
      key: 'chave1',
      value: JSON.stringify({chave1: 'valor1'}),
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  }
};
