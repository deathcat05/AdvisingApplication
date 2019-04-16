const dbConnection = require('../../database/mySQLconnect');
const sha1 = require('sha1');


require('dotenv').config();

class Create {

    constructor() {}

    async createSession(
        advisor_id /*Number*/, 
        duration /*Number*/, 
        start_time, /*String from Datetime*/) {
        /*
insert into AdvisingSession 
	(advisor_id, , duration,start_time, lookup_key)
VALUES
        */
       return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO AdvisingSession 
                    (advisor_id, duration, start_time, lookup_key)
                VALUES
                    (?, ?, ?, ?)`
            dbConnection.query({ sql, values: [ advisor_id, duration, start_time, sha1(`${advisor_id}${start_time}`) ] }, err => {
                if (err)
                    return reject()
                return resolve()
            })
            
       })

    }

    async createBlock(ctx) {
        return 
    }

    async createAdvisor(ctx) {

        return new Promise((resolve, reject) => {
            
            let { request: { body } } = ctx

            const query = `
                INSERT INTO Advisor 
                    (advisor_id, first_name, last_name, h_password, email)
                VALUES
                    (?, ?, ?, ?, ?);
                `
            dbConnection.query({
                sql: query,
                values: Object.keys(body).map(k => body[k])
            }, (error, tuples) => {
                if (error) {
                    return reject ("Error In createAdvisor")
                }
                ctx.body = { "success": true, ...tuples }
                ctx.status = 200
                return resolve()
            })
        }).catch(err => {
            console.log(err)
            ctx.body = { "success": false}
        })
    }

    async createAdvisee(ctx) {
        return new Promise((resolve, reject) => {
              
            let { request: { body } } = ctx
    
            const query = `
                INSERT INTO Advisee
                    (student_id, first_name, last_name, h_password, email)
                VALUES
                    (?, ?, ?, ?, ?);
                    `
            dbConnection.query({
                    sql: query,
                    values: Object.keys(body).map(k => body[k])
            }, (error, tuples) => {
                if ( error ) {
                    return reject("Error In Function: createAdvisee")
                }
                ctx.body = { "success": true, ...tuples }
                ctx.status = 200
                return resolve()
            })
        }).catch(err => {
            console.log(err)
            ctx.body = { "success": false }
        })
    }

}

module.exports = Create;