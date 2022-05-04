var express = require('express'),
  router = express.Router(),
  Exam = require('../models/exam'),
  Student = require('../models/student')

router.get('/', isLoggedInAsStudent, function (req, res) {
  res.render('exams/take_exam_code_entry', {
    title: 'Enter Exam Code',
    username: req.user.username,
  })
})

router.post('/exam', isLoggedInAsStudent, function (req, res) {
  var exam_code = req.body.exam_code
  var username = req.body.username
  Exam.getByExamCode(exam_code, function (err, doc1) {
    if (err) res.send('Some error occured')
    else if (doc1[0]) {
      Student.getByCourseId(username, doc1[0].coursecode, function (err, doc) {
        if (err) res.send('Some error occured')
        else if (doc[0]) {
          Exam.checkResponse(username, exam_code, function (err, doc) {
            if (err) res.send('Some error occured')
            else if (doc[0]) res.redirect('/take_exam')
            else {
              res.render('exams/take_exam', {
                title: 'Take Exam',
                exam_code: exam_code,
                username: username,
              })
            }
          })
        } else res.redirect('/take_exam')
      })
    } else res.redirect('/take_exam')
  })
})

router.get('/list', isLoggedInAsStudent, function (req, res) {
  var results = {}
  Exam.getByExamCode(req.query.exam_code, function (err, docs) {
    if (err) res.send('some error occured')
    else {
      results.exam = docs[0]
      Exam.getExamQuestions(req.query.exam_code, (err, docs) => {
        if (err) res.send('some error occured')
        else {
          results.question_list = docs
          console.log(results)
          res.json(results)
        }
      })
    }
  })
})

router.post('/submit', isLoggedInAsStudent, function (req, res) {
  var username = req.body.username
  var exam_code = req.body.exam_code

  var object = req.body
  var response = []
  for (var key in object) {
    response.push(object[key])
  }
  response.pop()
  response.pop()

  Exam.addResponses(username, exam_code, response, function (err, docs) {
    if (err) res.send('some error occured')
    else
      res.render('exams/exam_submit', {
        title: 'Response Submitted Successfully',
        response: response,
        username: username,
        exam_code: exam_code,
      })
  })
})

router.get('/performance', isLoggedInAsStudent, function (req, res) {
  res.render('exams/view_performance_code_entry', {
    title: 'Enter Exam Code',
    username: req.user.username,
  })
})

router.post('/performance_view', isLoggedInAsStudent, function (req, res) {
  var username = req.body.username
  var exam_code = req.body.exam_code

  Exam.checkResponse(username, exam_code, function (err, doc) {
    if (err) res.send('Some error occured')
    else if (doc[0]) {
      Exam.getExamQuestions(exam_code, function (err, docs) {
        if (err) res.send('some error occured')
        else {
          var answers = docs

          Exam.getResponseByExamCode(
            exam_code,
            username,
            function (err, results) {
              if (err) res.send('some error occured')
              else {
                var correct = 0
                var attempts = 0
                var response = results[0].response

                for (let index = 0; index < answers.length; index++) {
                  if (response[index] !== ' ') attempts++
                  if (answers[index].key === response[index]) correct++
                }

                res.render('exams/performance', {
                  title: 'Result',
                  total_questions: answers.length,
                  attempted: attempts,
                  correct: correct,
                })
              }
            }
          )
        }
      })
    } else {
      res.render('exams/view_performance_code_entry', {
        title: 'Enter Exam Code',
        username: req.user.username,
      })
    }
  })
})

module.exports = router

function isLoggedInAsStudent(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated() && req.user.usertype == 'student') return next()

  // if they aren't redirect them to the home page
  res.redirect('/')
}
