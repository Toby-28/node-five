const connection = require('../db/postgreSQL')

module.exports = {
  // MAKE VALIDATION FUNCTIONS HERE
  // Create new student in the database
  create: function (exam, cb) {
    const {
      exam_name,
      exam_code,
      duration_hours,
      duration_minutes,
      course_code,
    } = exam
    connection.query(
      'insert into exam(examname, examcode, durationhours, durationminutes, coursecode) values($1,$2,$3,$4,$5)',
      [exam_name, exam_code, duration_hours, duration_minutes, course_code],
      (err, message) => {
        return cb(err, message)
      }
    )
  },

  getByExamCode: function (exam_code, cb) {
    connection.query(
      'select * from exam where examcode=$1',
      [exam_code],
      (err, results) => {
        return cb(err, results.rows)
      }
    )
  },

  getExamQuestions(exam_code, cb) {
    connection.query(
      'select * from question where examcode=$1',
      [exam_code],
      (err, results) => {
        return cb(err, results.rows)
      }
    )
  },

  getResponseByExamCode: function (exam_code, username, cb) {
    connection.query(
      'select * from responses where examcode=$1 and username=$2',
      [exam_code, username],
      (err, results) => {
        return cb(err, results.rows)
      }
    )
  },

  addQuestion: function (exam_code, question_full, cb) {
    const { question, optionA, optionB, optionC, optionD, key } = question_full
    connection.query(
      'insert into question(question, optionA, optionB, optionC, optionD, key, examcode) values($1,$2,$3,$4,$5,$6,$7)',
      [question, optionA, optionB, optionC, optionD, key, exam_code],
      (err, message) => {
        return cb(err, message)
      }
    )
  },

  // Submit Responses
  addResponses: function (username, exam_code, response, cb) {
    connection.query(
      'insert into responses(username, examcode, response) values($1,$2,$3)',
      [username, exam_code, response],
      (err, message) => {
        return cb(err, message)
      }
    )
  },

  checkResponse: function (username, exam_code, cb) {
    connection.query(
      'select * from responses where username=$1 and examcode=$2',
      [username, exam_code],
      (err, results) => {
        return cb(err, results.rows)
      }
    )
  },
}
