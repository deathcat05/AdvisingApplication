const dbConnection = require('../../database/mySQLconnect')
const GenericSQL = require('./GenericSQL');
const bcrypt = require('bcrypt')

require('dotenv').config()


class User extends GenericSQL {

    static async createAdvisee() {}
    static async createAdvisor() {}


}