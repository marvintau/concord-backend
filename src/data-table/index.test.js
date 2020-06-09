const {DataTable, db} = require('.');

const findTable = async (tableName) => {
  return await db.find({_table: tableName});
}

const randomEmptyArray = (length=10, minLength = 1) => {
  const len = Math.floor(Math.random() * length + minLength);
  return [...Array(len)];
}

const randomString = () => Math.random().toString(35).slice(2, 10);

const exampleDoc = () => {
  const cols = randomEmptyArray().map(() => ({name:randomString()}));
  return {cols};
}

const exampleDocs = () => {
  return randomEmptyArray().map(exampleDoc);
}
describe('data-table', () => {

  beforeEach(async () => {
    await db.remove({_table: 'TEST-DATA-TABLE'});
  })

  test ('create', async () => {

    try {
      new DataTable();
    } catch ({code}) {
      expect(code).toBe('DEAD_MISSING_TABLE_NAME');
    }

    try {
      new DataTable({});
    } catch ({code}) {
      expect(code).toBe('DEAD_INVALID_TABLE_NAME');
    }

    try {
      new DataTable('');
    } catch ({code}) {
      expect(code).toBe('DEAD_MISSING_SCHEMA');
    }

    const DataTableDef = new DataTable('TEST-DATA-TABLE', {cols: [{name:'string'}]});

    try {
      await DataTableDef.create('explicitly wrong');
    } catch ({code, traces}) {
      expect(code).toBe('DEAD_INSERTING_INVALID_DATA');
    }

    const doc = exampleDoc();
    await DataTableDef.create(doc);

    const after = await findTable('TEST-DATA-TABLE');
    expect(after).toHaveProperty('length', 1);

    const [{_table, _id, ...rest}] = after;
    expect(rest).toEqual(doc);
  })


  test ('retrieve & update & remove', async () => {
    
    const DataTableDef = new DataTable('TEST-DATA-TABLE', {cols: [{name:'string'}]});

    const docs = exampleDocs();

    DataTableDef.create(docs);

    const stored = await findTable('TEST-DATA-TABLE');
    expect(docs.length).toBe(stored.length);

    expect(stored.map(({_id, _table, ...rest}) => rest)).toEqual(docs);

    const [{_id}] = stored;

    try {
      await DataTableDef.update({_id: 'olahal'}, {cols: []});
    } catch ({code}) {
      expect(code).toBe('DEAD_DOC_NOT_FOUND_WITH_GIVEN_CRITS');
    }

    await DataTableDef.update({_id}, {cols:[{name:'0'}]});

    const {cols:[{name}]} = await DataTableDef.retrieve({_id}, {findOne:true});
    expect(name).toBe('0');

    await DataTableDef.remove({_id});

    const recordAfterRemove = await DataTableDef.retrieve({_id}, {findOne: true});
    expect(recordAfterRemove).toBe(null);

    const resAfterRemove = await DataTableDef.retrieve({});
    expect(resAfterRemove.length).toBe(docs.length - 1);

  })

})