const DataTable = require('../data-table');

class Page extends DataTable {

  constructor(schema) {
    super('PAGE', schema);
  }

}

 
async function fetchDir(givenLoadPoint='/') {
  const dirs = await retrieveRecs({table: 'DIRS'});

  const loadedPages = dirs.filter(({loadPoint}) => loadPoint === givenLoadPoint);

  for (let page of loadedPages){

    if (page.data !== undefined ){
      page.data = await fetchSheetSpec(page.data);
    }
  }

  return Object.fromEntries(loadedPages.map(({loadPoint, name, ...rest}) => [name, {name, ...rest}]))
}

module.exports = {fetchDir}
