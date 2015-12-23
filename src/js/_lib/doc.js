var uuid = require('time-uuid/get-by-time');
var Storage = require('../_util/storage');

function Doc(){
  if (!Storage.hasData){
  }

  stash.doc = this.ID = uuid();
}
 
module.exports = Doc;
