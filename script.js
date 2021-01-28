// ----------API KEY FOR TASTE DIVE---------------
// 400280-Schoolpr-9S2V42WM
// ----------API KEY FOR TASTE DIVE---------------

// https://tastedive-api-documentation.readthedocs.io/en/latest/

// "https://www.omdbapi.com/?t=" + filler variable + "&apikey=trilogy"




var questions = [
  {
    title: "What is your favorite genre?",
    choices: ["Action", "Horror", "Comdedy", "Drama"],
    movies: ["The Terminator", "Halloween", "The Big Lebowski", "Dead Poets Society"]
    
  },
  {
    title: "Who is the best director of all time?",
    choices: ["Martin Scorsese", "Stevem Spielberg", "Alfred Hitchcock", "Stanley Kubrick"],
    movies: ["Taxi Driver", "Jurassic Park", "Psycho", "2001 A Space Odyssey"]
  },
  {
    title: "Who are watching movies with?",
    choices: ["Alone", "Friends", "Family", "Significant Other"],
    movies: ["Lost in Translation", "The Empire Strikes Back", "The Iron Giant", "Scott Pilgrim vs the World"]
  },
]


var currentQuestionIndex = 0;
var questionTitle = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var recommendDIV = document.getElementById("recommendations");
var userChoice = [];

function startQuestionnaire() {
    var currentQuestion = questions[currentQuestionIndex]

    questionTitle.textContent = currentQuestion.title
    choicesEl.innerHTML = ""

    currentQuestion.choices.forEach(function(choices, i) {
        // create new button for each choice
        var choicesNode = document.createElement("button");
        choicesNode.setI
        choicesNode.setAttribute("class", "choice");
        choicesNode.id= "choice-btn";
        choicesNode.setAttribute("value", choices);
        choicesNode.setAttribute("indexVal", i);
        choicesNode.textContent = i + 1 + ". " + choices;
      
        
        choicesNode.onclick = questionClick;
        // display on the page
        choicesEl.appendChild(choicesNode);
      });
};

function questionClick(){

  userChoice.push(this.attributes.indexVal);
  console.log(userChoice);
  
  currentQuestionIndex++

  if (currentQuestionIndex != questions.length) {
    startQuestionnaire();
  }


}

function getRecommendations(){

}

startQuestionnaire();
