// ----------API KEY FOR TASTE DIVE---------------
// 400280-Schoolpr-9S2V42WM
// ----------API KEY FOR TASTE DIVE---------------

// https://tastedive-api-documentation.readthedocs.io/en/latest/

// "https://www.omdbapi.com/?t=" + filler variable + "&apikey=trilogy"



// create array to store questions, choices, and the associated base movies
var questions = [
  {
    title: "What is your favorite genre?",
    choices: ["Action", "Horror", "Comedy", "Drama"],
    movies: ["The Terminator", "Halloween", "The Big Lebowski", "Dead Poets Society"]
    
  },
  {
    title: "Who is the best director of all time?",
    choices: ["Martin Scorsese", "Steven Spielberg", "Alfred Hitchcock", "Stanley Kubrick"],
    movies: ["Taxi Driver", "Jurassic Park", "Psycho", "2001 A Space Odyssey"]
  },
  {
    title: "Who are you watching movies with?",
    choices: ["Alone", "Friends", "Family", "Significant Other"],
    movies: ["Lost in Translation", "The Empire Strikes Back", "The Iron Giant", "Scott Pilgrim vs the World"]
  },
]
console.log(questions[0].movies[0]);
// start array with the index of 0
var currentQuestionIndex = 0;
// grab html dom elements
var questionTitle = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var recommendDIV = document.getElementById("recommendations");
// establish empty array to hold index value of the user's choice
var userChoice = []

function startQuestionnaire() {
    var currentQuestion = questions[currentQuestionIndex]

    questionTitle.textContent = currentQuestion.title
    choicesEl.innerHTML = ""

    // for each loop to append array items to page
    currentQuestion.choices.forEach(function(choices, i) {
        // create new button for each choice
        var choicesNode = document.createElement("button");
        // establishes id for choice buttons for styling
        choicesNode.id= "choice-btn";
        // establishes button class
        choicesNode.setAttribute("class", "choice");
        // establishes button value
        choicesNode.setAttribute("value", choices);
        // grabs index value for each button
        choicesNode.setAttribute("indexVal", i);
        choicesNode.textContent = i + 1 + ". " + choices;
      
        // adds listener to each button to run questionClick function on click 
        choicesNode.onclick = questionClick;
        // display on the page
        choicesEl.appendChild(choicesNode);
      });
};

function questionClick(){
  // push button array index value to empty array
  userChoice.push(this.getAttribute("indexVal"));
  console.log(userChoice);
  
  // move to next question
  currentQuestionIndex++
  
  // check to see if we're out of questions
  // if not run again with new question
  if (currentQuestionIndex != questions.length) {
    startQuestionnaire();
    
  }
  // if we're out of questions run getRecommendations
  else {
    getRecommendations();
  }

}


function getRecommendations() {

  // for loop through the userChoice array
  for (i = 0; i < userChoice.length; i++) {
    // parse each array item as an integer
    var choiceIndex = parseInt(userChoice[i], 10);
    

    console.log(typeof choiceIndex)
    console.log(choiceIndex)
      
    // run though each
    var similarMovie = questions[i].movies[choiceIndex];
    
  $.ajax({
    url: "https://tastedive.com/api/similar?q="+ similarMovie + "&limit=5&k=400280-Schoolpr-9S2V42WM",
    type: "GET",
    dataType: "jsonp",
    cors: true,
    contentType: "application/json",
    header: {
      'Access-Control-Allow-Origin': '*',
    },
    complete: function(response){
      if(response !== undefined && response !=  null && response.Similar !== undefined &&
        response.Similar != null && response.Similar.Results.length > 0) {
        }
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
}
startQuestionnaire();
