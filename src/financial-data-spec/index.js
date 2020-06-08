const DataTable = require('../data-table');

const spec = {}

class FinancialDataSpec {
  constructor() {
    super('FINANCIAL-DATA', spec);
  }

  update() {
    throw {code: 'DEAD_UPDATE_NOT_ALLOWED'};
  }

  remove() {
    throw {code: 'DEAD_REMOVE_NOT_ALLOWED'};
  }
}

const FinancialDataSpec = new DataTable('FINANCIAL-DATA', spec);

module.exports = {
  FinancialDataSpec
}