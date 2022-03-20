var fs = require('fs')
const pool = require('../db/postgreSQL')

async function resetfunction() {
  await pool.query('select now()', async (err, result) => {
    if (err) {
      throw err
    }
    try {
      var sql = await fs.readFileSync('migration.sql').toString()
      await pool.query(sql)
    } catch (err) {
      throw err
    }

    console.log('database is ok')
  })
}

resetfunction()
