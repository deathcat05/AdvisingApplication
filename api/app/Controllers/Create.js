const dbConnection = require('../../database/mySQLconnect');
const GenericSQL = require('./GenericSQL')
const sha1 = require('sha1');
const moment = require('moment')


require('dotenv').config();

class Create extends GenericSQL {

    constructor() { super() }

    static async createSession(
        advisor_id /*Number*/, 
        duration /*Number*/, 
        start_time, /*String from Datetime*/) {
       return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO AdvisingSession 
                    (advisor_id, duration, start_time, lookup_key)
                VALUES
                    (?, ?, ?, ?)`
            dbConnection.query({ sql, values: [ advisor_id, duration, start_time, sha1(`${advisor_id}${start_time}`) ] }, err => {
                if (err) {
                    console.log("err")
                    console.log(err)
                    return reject()
                }
                return resolve()
            })
            
       })
    }

    // static async createSession(
    //     advisor_id, /* Number */
    //     duration,   /* Number */
    //     start_time, /* String / DateTime */
    // ) {
    //     const data = {
    //         tableName: 'AdvisingSession',
    //         argumentNameList: ['advisor_id', 'duration', 'start_time', 'lookup_key'],
    //         values: [ ...arguments, sha1(`${advisor_id}${start_time}`) ]
    //     }
    //     return await GenericSQL.genericInsert(data)
    // }

    // static async createBlock({
    //     advisor_id,         /* Number */
    //     start_day,          /* String / DateTime */
    //     session_length,     /* Number */
    //     num_sessions_in_day /* Number */
    // }) {
    //     const data = {
    //         tableName: 'AdvisingBlock',
    //         argumentNameList: ['advisor_id', 'start_day', 'session_length', 'num_sessions_in_day'],
    //         values: [...arguments]
    //     }
    //     console.log(data)
    //     return await GenericSQL.genericInsert(data)
    // }

    static async createBlock({
        advisor_id,
        start_day,
        session_length,
        num_sessions_in_day
    }) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO AdvisingBlock
                    (advisor_id, is_deleted, start_day, session_length, num_sessions_in_day)
                VALUES
                    (?, ?, ?, ?, ?)`
            dbConnection.query({ sql, values: [ advisor_id, false, start_day, session_length, num_sessions_in_day ]}, err => {
                if (err)
                    return reject('createBlock error')
                return resolve()
            })
        })
    }

    blockHandler(ctx, next) {
        console.log(this)
        console.log("Create Block")
        return new Promise(async (resolve, reject) => {
            try {

                const dateFormat = 'YYYY-MM-DD hh:mm:ss'
                let { request: { body } } = ctx
                let { advisor_id, start_day, session_length, num_sessions_in_day } = body 
                await Create.createBlock(body)

                for ( let i = 0; i < num_sessions_in_day; i++ ) {
                    const start_time = moment(start_day, dateFormat).add(session_length * i, 'minutes').format(dateFormat)
                    await Create.createSession(advisor_id, session_length, start_time)
                }
                console.log("success")
                ctx.body = { "success": true }
                ctx.status = 200
                return resolve();

            } catch (e) {
                console.log("reject")
                console.log(e)
                ctx.body = { "success": false }
                return reject(e);
            }
        })
    }

    createAdvisor(ctx) {
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
                    console.log(error)
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