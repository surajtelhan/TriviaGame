var panel = $('#quiz-area');
var countStartNumber = 30;


$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});


var questions = [{
  question: "What color is Luke's Lightsaber in Return of the Jedi?",
  answers: ["Green", "Blue", "Red", "Purple"],
  correctAnswer: "Green",
  image:"assets/images/fun.jpg"
}, {
  question: "Who is NOT in the prequels?",
  answers: ["R2D2", "C3PO", "Luke Skywalker", "Moff Tarkin"],
  correctAnswer: "Moff Tarkin",
  image:"assets/images/fun.jpg"
}, {
  question: "How many planet destroying super weapons have we seen in Star Wars films?",
  answers: ["One", "Two", "Three", "Four"],
  correctAnswer: "Three",
  image:"assets/images/fun.jpg"
}, {
  question: 'What does Anakin hate?',
  answers: ["Sand", "Water", "Fire", "Wind"],
  correctAnswer: "Sand",
  image:"assets/images/fun.jpg"
}, {
  question: 'Who had the high ground?',
  answers: ["Kenobi", "Solo", "Skywalker", "Windu"],
  correctAnswer: "Kenobi",
  image:"assets/images/fun.jpg"
}, {
  question: "Who's the oldest character in this list",
  answers: ["Yoda", "Chewbacca", "Palpatine", "Kit Fisto"],
  correctAnswer: "Yoda",
  image:"assets/images/fun.jpg"
}, {
  question: "What did Padme die from?",
  answers: ["Broken Heart", "Child Birth", "Being Forced Choked", "Old Age"],
  correctAnswer: "Broken Heart",
  image:"assets/images/fun.jpg"
}, {
  question: "What was the order that started the Jedi purge?",
  answers: ["Order 66", "Order 77", "Order 98", "Order 89"],
  correctAnswer: "Order 66",
  image:"assets/images/fun.jpg"
}];




var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>Brag About Your Score!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};