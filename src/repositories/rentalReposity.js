const Db = require("../config/db")

class RentalRepository extends Db{
    constructor(){
        super("rental")
    }
}

module.exports = new RentalRepository();