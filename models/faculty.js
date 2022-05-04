const connection = require('../db/postgreSQL')

module.exports = {
  // MAKE VALIDATION FUNCTIONS HERE
  // Create new student in the database
  create: function (faculty, cb) {
    const { name, username, password } = faculty
    connection.query(
      'insert into faculty(name, username, password) values($1, $2, $3)',
      [name, username, password],
      (err, message) => {
        return cb(err, message)
      }
    )
  },

  // Retrieve faculty using username
  getByUserName: function (username, cb) {
    connection.query(
      'select * from faculty where username=$1',
      [username],
      (err, results) => {
        return cb(err, results.rows[0])
      }
    )
  },

  findByFacultyName: function (username, cb) {
    connection.query(
      'select * from faculty where username=$1',
      [username],
      (err, results) => {
        return cb(err, results.rows[0])
      }
    )
  },

  // Update an existing faculty by username
  update: function (prevusername, faculty, cb) {
    connection.query(
      'update faculty set name=$1, username=$2, password=$3 where username=$4',
      [faculty.name, faculty.username, faculty.password, prevusername],
      (err, message) => {
        return cb(err, message)
      }
    )
  },

  // Remove an existing faculty by username
  remove: function (username, cb) {
    connection.query(
      'delete from faculty where username=$1',
      [username],
      (err, message) => {
        return cb(err, message)
      }
    )
  },

  // Assign faculty to a course by username and course ID
  assign: function (username, course_code, cb) {
    connection.query(
      'insert into facultycourse(username, coursecode) values($1, $2)',
      [username, course_code],
      (err, message) => {
        return cb(err, message)
      }
    )
  },

  unassign: function (username, course_code, cb) {
    connection.query(
      'delete from facultycourse where username=$1 and coursecode=$2',
      [username, course_code],
      (err, message) => {
        return cb(err, message)
      }
    )
  },

  getByCourseId: function (username, course_code, cb) {
    connection.query(
      'select * from facultycourse where username=$1 and coursecode=$2',
      [username, course_code],
      (err, results) => {
        return cb(err, results.rows)
      }
    )
  },
}
