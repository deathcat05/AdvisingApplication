let mysql = require('mysql');

let connection = mysql.createConnection({
  debug: false,
  host: 'blue.cs.sonoma.edu',
	port: 3306,
	user: 'cs386_nkamm',
	password:'ka3287',
	database: 'cs386_nkamm',
	// timezone: 'PDT'
});

module.exports = connection;