const connection = require('../db/postgreSQL')

module.exports = {
  findByAdminName: function (username, cb) {
    connection.query(
      'select * from admins where name=$1',
      [username],
      (err, results) => {
        return cb(err, results.rows[0])
      }
    )
  },
  findByStudentName: function (username, cb) {
    connection.query(
      'select * from students where name=$1',
      [username],
      (err, results) => {
        return cb(err, results.rows[0])
      }
    )
  },
  findByFacultyName: function (username, cb) {
    connection.query(
      'select * from faculty where name=$1',
      [username],
      (err, results) => {
        return cb(err, results.rows[0])
      }
    )
  },
}
