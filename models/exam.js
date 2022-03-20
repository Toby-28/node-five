module.exports = {
  // MAKE VALIDATION FUNCTIONS HERE
  // Create new student in the database
  create: function (exam, cb) {},

  getByExamCode: function (exam_code, cb) {},

  getResponseByExamCode: function (exam_code, username, cb) {},

  addQuestion: function (exam_code, question_full, cb) {},

  // Submit Responses
  addResponses: function (username, exam_code, response, cb) {},

  checkResponse: function (username, exam_code, cb) {},
}
