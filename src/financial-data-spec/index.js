const DataTable = require('../data-table');

const spec = {}

class FinancialDataSpec {
  constructor() {
    super('FINANCIAL-DATA', spec);
  }
}

const FinancialDataSpec = new DataTable('FINANCIAL-DATA', spec);

module.exports = {
  FinancialDataSpec
}