const connection = require('../db/postgreSQL')

module.exports = {
  // MAKE VALIDATION FUNCTIONS HERE
  // Create new course in the database
  create: function (course, cb) {
    const { courseid, coursename } = course
    connection.query(
      'insert into courses(courseid, coursename) values($1, $2)',
      [courseid, coursename],
      (err, message) => {
        return cb(err, message)
      }
    )
  },

  findByCourseName: (coursename, cb) => {
    connection.query(
      'select * from courses where coursename=$1',
      [coursename],
      (err, results) => {
        return cb(err, results.rows)
      }
    )
  },

  // Retrieve course using courseid
  getByCourseId: function (courseid, cb) {
    connection.query(
      `select * from courses where courseid=$1`,
      [courseid],
      (err, results) => {
        return cb(err, results.rows[0])
      }
    )
  },

  // Update an existing course by courseid
  update: function (prevcourseid, course, cb) {
    const { courseid, coursename } = course
    connection.query(
      'update courses set courseid=$1, coursename=$2 where courseid=$3',
      [courseid, coursename, prevcourseid],
      (err, message) => {
        return cb(err, message)
      }
    )
  },

  // Remove an existing course by courseid
  remove: function (courseid, cb) {
    connection.query(
      'delete from courses where courseid=$1',
      [courseid],
      (err, message) => {
        return cb(err, message)
      }
    )
  },
}
