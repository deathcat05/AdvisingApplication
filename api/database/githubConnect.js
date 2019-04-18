let mysql = require('mysql');

let connection = mysql.createConnection({
  debug: false,
  host: 'blue.cs.sonoma.edu',
	port: 8140,
	user: 'cs386_alabossi',
	password:'la5117',
	database: 'cs386_alabossi'
});

module.exports = connection;