// ----------API KEY FOR TASTE DIVE---------------
// 400280-Schoolpr-9S2V42WM
// ----------API KEY FOR TASTE DIVE---------------

// https://tastedive-api-documentation.readthedocs.io/en/latest/

// "https://www.omdbapi.com/?t=" + filler variable + "&apikey=trilogy"
var questions = [
  {
    title: "Who are you watching with?",
    choices: [
      "Alone",
      "Wife", 
      "Friends",
      "Family"],
  },
  {
    title: "What is your Emotions?",
    choices: [
      "Happy",
      "Depressed",
      "Excited",
      "Whatever"],
  },
  {
    title: "What do you feel like watching?",
    choices: [
      "Comedy",
      "Romantic",
      "Action",
      "Horror"
    ],
  },
]


var currentQuestionIndex = 0;
var questionTitle = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var recommendDIV = document.getElementById("recommendations");

function startQuestionnaire() {
    var currentQuestion = questions[currentQuestionIndex]

    questionTitle.textContent = currentQuestion.title
    choicesEl.innerHTML = ""

    currentQuestion.choices.forEach(function(choices, i) {
        // create new button for each choice
        var choicesNode = document.createElement("button");
        choicesNode.setAttribute("class", "choice");
        choicesNode.setAttribute("value", choices);
      
        choicesNode.textContent = i + 1 + ". " + choices;
      
        
        choicesNode.onclick = questionClick;
      
        // display on the page
        choicesEl.appendChild(choicesNode);
      });
};

function questionClick(){
  
  currentQuestionIndex++

  if (currentQuestionIndex != questions.length) {
    startQuestionnaire();
  }
}
startQuestionnaire();
