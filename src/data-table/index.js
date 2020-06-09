const Schema = require('@marvintau/schema');

const Datastore = require('nedb-promise');
const db = new Datastore({
  // filename: path.resolve(__dirname, '../data_store/data.json'),
  // autoload: true
});
db.ensureIndex({fieldName: '_table'});

class DataTable {

  constructor(tableName, schema) {

    if (tableName === undefined) {
      throw {code: 'DEAD_MISSING_TABLE_NAME'}
    } else if (typeof tableName !== 'string') {
      throw {code: 'DEAD_INVALID_TABLE_NAME'}
    } else if (schema === undefined) {
      throw {code: 'DEAD_MISSING_SCHEMA'};
    }

    this.tableName = tableName;
    this.schema = new Schema(schema);
  }

  async create(recs) {

    const _table = this.tableName;

    if (!Array.isArray(recs)){
      recs = [recs];
    }

    const normalizedRecs = [];
    for (let rec of recs) {
      const {data} = this.schema.create(rec);
      normalizedRecs.push(data);
    }
    
    const validated = normalizedRecs.map((rec) => {
      return this.schema.validate(rec);
    })

    const ok = validated.every(({ok}) => ok);
    const traces = validated.filter(({trace}) => trace !== undefined);

    if (ok) try {
      const preparedRecs = recs.map(rec => ({...rec, _table}));
      return db.insert(preparedRecs);
    } catch (error){
      console.log(error);
      throw {code: 'DEAD_ERROR_INSERTING'}
    } else {
      throw {code: 'DEAD_INSERTING_INVALID_DATA', traces}
    }
  }

  async retrieve(crits, {findOne=false}={}) {

    const _table = this.tableName;

    if (findOne) {
      return await db.findOne({_table, ...crits});
    } else {
      return await db.find({_table, ...crits});
    }

  }

  async update(crits, vals) {

    const tabCrits = {_table: this.tableName, ...crits};

    const destDoc = await db.findOne(tabCrits);

    if (!destDoc){
      throw {code:'DEAD_DOC_NOT_FOUND_WITH_GIVEN_CRITS'}
    }

    return db.update(tabCrits, {$set: vals});
  }

  async remove(crits) {
    return db.remove({_table: this.tableName, ...crits}, {multi: true});
  }
}

module.exports = {
  DataTable,
  db
}