const connection = require('../db/postgreSQL')

module.exports = {
  // MAKE VALIDATION FUNCTIONS HERE
  // Create new student in the database
  create: function (student, cb) {
    const { name, username, password } = student
    connection.query(
      'insert into students(name, username, password) values($1, $2, $3)',
      [name, username, password],
      (err, message) => {
        return cb(err, message)
      }
    )
  },

  findByStudentName: function (username, cb) {
    connection.query(
      'select * from students where username=$1',
      [username],
      (err, results) => {
        return cb(err, results.rows[0])
      }
    )
  },

  // Retrieve student using username
  getByUserName: function (username, cb) {
    connection.query(
      'select * from students where username=$1',
      [username],
      (err, results) => {
        return cb(err, results.rows[0])
      }
    )
  },

  // Update an existing student by username
  update: function (prevusername, student, cb) {
    connection.query(
      'update students set name=$1, username=$2, password=$3 where username=$4',
      [student.name, student.username, student.password, prevusername],
      (err, message) => {
        return cb(err, message)
      }
    )
  },

  // Remove an existing student by username
  remove: function (username, cb) {
    connection.query(
      'delete from students where username=$1',
      [username],
      (err, message) => {
        return cb(err, message)
      }
    )
  },

  // Register student to a course by username and course ID
  register: function (username, course_code, cb) {
    connection.query(
      'insert into student_course(username, coursecode) values($1, $2)',
      [username, course_code],
      (err, message) => {
        return cb(err, message)
      }
    )
  },

  deregister: function (username, course_code, cb) {
    connection.query(
      'delete from student_course where coursecode=$1 and username=$2',
      [course_code, username],
      (err, message) => {
        return cb(err, message)
      }
    )
  },

  getByCourseId: function (username, course_code, cb) {
    connection.query(
      'select * from student_course where coursecode=$1 and username=$2',
      [course_code, username],
      (err, results) => {
        return cb(err, results.rows)
      }
    )
  },
}
