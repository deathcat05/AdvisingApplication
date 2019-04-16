const dbConnection = require('../../database/mySQLconnect')
const bcrypt = require('bcrypt')

require('dotenv').config()

class GenericSQL {

    async genericInsert(
        tableName,        /* String */
        argumentNameList, /* Array<String> */
        values            /* Array<Arguments> */
    ) {

        return new Promise((resolve, reject) => {
            
            const argNameList = argumentNameList.map((item, idx) => {
                if ( idx === argumentNameList.length - 1)
                    return `${item}`
                return `${item},`
            }).join('')
    
            const variaticList = argumentNameList.map((item, idx) => {
                if ( idx === argumentNameList.length - 1)
                    return `?`
                return `?,`
            }).join('')
    
            const sql = `
                INSERT INTO ${tableName}
                    ( ${argNameList} )
                VALUES
                    ( ${variadicList} )
            `
    
            dbConnection.query({ sql, values }, (error, tuples) => {
                if (error)
                    return reject()
                return resolve(tuples)
            })
        })
    }
}

class User extends GenericSQL {

    static async createAdvisee() {}
    static async createAdvisor() {}

 

}