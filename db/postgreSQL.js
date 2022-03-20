const Pool = require('pg').Pool

const connectionString = 'postgresql://postgres:hushnud.22@localhost:5432/exam'

const connection = new Pool({
  connectionString: connectionString,
})

module.exports = connection
