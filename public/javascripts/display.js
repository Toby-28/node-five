var questionData = []

// DOM Ready =============================================================
$(document).ready(function () {
  // Display Questions
  fillQuestions()
})

// Functions =============================================================

// Fill Question List
function fillQuestions() {
  // Empty content string
  var questionContent = ''

  // jQuery AJAX call for JSON
  $.getJSON('/make_exam/list', { exam_code: exam_code }, function (data) {
    // Question Content
    questionData = data[0]

    $i = 1
    // For each item in our JSON, add a question line
    $.each(data, function () {
      //questionContent += this.question;
      questionContent += 'Question' + $i + ' :'
      questionContent += this.question + '<br>'
      questionContent +=
        ' A.' +
        this.optiona +
        ' B.' +
        this.optionb +
        ' C.' +
        this.optionc +
        ' D.' +
        this.optiond +
        ' Key' +
        this.key +
        '<br>'

      $i++
    })

    // Inject the whole content string into our existing HTML table
    document.getElementById('temp').innerHTML = questionContent
  })
}
