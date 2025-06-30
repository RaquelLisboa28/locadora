const Db = require("../config/db");

class ClientRepository extends Db {
  constructor() {
    super("client");
  }
}

module.exports = new ClientRepository();  