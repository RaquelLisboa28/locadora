const Db = require("../config/db")

class CarRepository extends Db {
    constructor(){
        super("car")
    }
}

module.exports = new CarRepository();