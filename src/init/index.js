
const {fetchSheetSpec} = require('./sheet-spec');


// for development stage only
(async () => {

  for (let dir of dirs) {
    let {name} = dir;
    dir.manual = processManualPage(name);
  }

  try {
    await remove({table: 'DIRS'});
    await createRecs('DIRS', dirs);
  } catch(err) {
    console.log(err);
  }

})();
