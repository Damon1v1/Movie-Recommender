// ----------API KEY FOR TASTE DIVE---------------
// 400280-Schoolpr-9S2V42WM
// ----------API KEY FOR TASTE DIVE---------------

// https://tastedive-api-documentation.readthedocs.io/en/latest/

// "https://www.omdbapi.com/?t=" + filler variable + "&apikey=trilogy"




var questions = [
  {
    title: "What is your favorite genre?",
    choices: ["Action", "Horror", "Comedy", "Drama"],
    movies: ["The Terminator", "Halloween", "The Big Lebowski", "Dead Poets Society"]
    
  },
  {
    title: "Who is the best director of all time?",
    choices: ["Martin Scorsese", "Stevem Spielberg", "Alfred Hitchcock", "Stanley Kubrick"],
    movies: ["Taxi Driver", "Jurassic Park", "Psycho", "2001 A Space Odyssey"]
  },
  {
    title: "Who are you watching movies with?",
    choices: ["Alone", "Friends", "Family", "Significant Other"],
    movies: ["Lost in Translation", "The Empire Strikes Back", "The Iron Giant", "Scott Pilgrim vs the World"]
  },
]
console.log(questions[0].movies[0]);

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

  else {
    getRecommendations();
  }

}


function getRecommendations() {
  //console.log(questions[i].movies[movieNum]);
  $.ajax({
    url: "https://tastedive.com/api/similar?q=Parasite&limit=5&k=400280-Schoolpr-9S2V42WM",
    type: "GET",
    dataType: "jsonp",
    cors: true,
    contentType: "application/json",
    header: {
      'Access-Control-Allow-Origin': '*',
    },
    complete: function(response){
      console.log(response);
      var returnedResponse = response
      $.ajax({
        url: "https://www.omdbapi.com/?t=" + returnedResponse.responseJSON.Similar.Results[0].Name + "&apikey=trilogy",
        type: "GET",
        dataType: "JSON"
      }).then(function(response){
        console.log(response);
      })
    }
    });
    

}

startQuestionnaire();
