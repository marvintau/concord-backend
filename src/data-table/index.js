const Schema = require('@marvintau/schema');

class DataTable {

  constructor(tableName, schema) {

    this.tableName = tableName;
    this.schema = new Schema(schema);

    if (tableName === undefined) {
      throw {code: 'DEAD_TABLENAME_NOT_SPECIFIED'}
    }

  }

  async create(recs) {

    if (!Array.isArray(recs)){
      recs = [recs];
    }

    const normalizedRecs = recs.map(this.schema.create);
    
    const ok = normalizedRecs.every((rec) => {
      const {ok} = this.schema.validate(rec);
      return ok;
    })

    if (ok) try {
      const preparedRecs = records.map(rec => ({...rec, table}));
      return db.insert(preparedRecs);
    } catch {
      throw {code: 'DEAD_ERROR_INSERTING'}
    } else {
      throw {code: 'DEAD_INSERTING_INVALID_DATA'}
    }
  }

  async retrieve({dataTable, excludeDataTable=true, ...restCrits}) {

    const tableName = this.tableName;

    if (dataTable === undefined){
      const result = await db.find({tableName, ...restCrits});
      if (excludeDataTable){
        result = result.map(({data, ...restDoc}) => ({...restDoc}));
      }
      return result;
    } else {
      const resultDoc = await db.findOne({tableName, ...restCrits});
      if (!resultDoc) {
        throw {code: 'DEAD_DOC_NOT_FOUND'}
      }
      if (resultDoc.data && resultDoc.data[dataTable]){
        return result.doc.data[dataTable];
      } else {
        throw {code: 'DEAD_DATA_NOT_EXIST'}
      }
    }

  }

  // General update
  // non-datatable fields will be directly updated.
  // datatable will be overwritten.
  // 
  // Note: Make sure the POST method supports large amount of data, when uploading
  // big datatable.
  async update({vals, ...restCrits}) {

    const tableName = this.tableName;
    const destDoc = await db.findOne({tableName, ...restCrits});

    if (!destDoc){
      throw {code:'DEAD_DOC_NOT_FOUND_WITH_GIVEN_CRITS'}
    }

    if (dataTable === undefined){
      return db.update(restCrits, vals);
    }
  }

  async remove(crits) {
    return db.remove(crits, {multi: true});
  }
}

module.exports = {
  DataTable
}