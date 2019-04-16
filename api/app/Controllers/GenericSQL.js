const dbConnection = require('../../database/mySQLconnect')
// const bcrypt = require('bcrypt')

require('dotenv').config()

class GenericSQL {

    constructor(){}

    static async genericInsert({
        tableName,        /* String */
        argumentNameList, /* Array<String> */
        values            /* Array<Arguments> */
    }) {

        return new Promise((resolve, reject) => {
            
            const argNameList = argumentNameList.map((item, idx) => {
                if ( idx === argumentNameList.length - 1)
                    return `${item}`
                return `${item}, `
            }).join('')
    
            const variadicList = argumentNameList.map((item, idx) => {
                if ( idx === argumentNameList.length - 1)
                    return `?`
                return `?, `
            }).join('')
    
            const sql = `
                INSERT INTO ${tableName}
                    ( ${argNameList} )
                VALUES
                    ( ? )`
            console.log(sql)
            dbConnection.query({ sql, values }, (error, tuples) => {
                if (error) {
                    console.log(error)
                    return reject()

                }
                return resolve(tuples)
            })
        })
    }
}

module.exports = GenericSQL

// function foo (a, b, c, d) {
//     let arr = [...arguments, "foobar"]
//     console.log(arr)
// }

// foo (1, 2, 3, 4)