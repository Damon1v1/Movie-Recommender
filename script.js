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
    movies: ["Taxi Driver", "Jurassic Park", "Psycho", "2001: A Space Odyssey"]
  },
  {
    title: "Who are you watching movies with?",
    choices: ["Alone", "Friends", "Family", "Significant Other"],
    movies: ["Lost in Translation", "The Empire Strikes Back", "The Iron Giant", "Clueless"]
  },
]

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
  // establish variable to hold dom element for movie info content
  var movieDiv = $("<div class='movie'>");
  // for loop through the userChoice array
  for (i = 0; i < userChoice.length; i++) {
    // parse each array item as an integer and store the current index for reference purposes
    var choiceIndex = parseInt(userChoice[i], 10);
      
    // search movies array and get item by user's choice
    var similarMovie = questions[i].movies[choiceIndex];
    
    // ajax call to taste dive to find similar movies to a starting reference
  $.ajax({
    url: "https://tastedive.com/api/similar?q="+ similarMovie + "&limit=5&k=400280-Schoolpr-9S2V42WM",
    type: "GET",
    dataType: "jsonp",
    cors: true,
    contentType: "application/json",
    header: {
      'Access-Control-Allow-Origin': '*',
    },
    // function to run once tastedive api call is complete
    complete: function(response){
      // storing tastedive api response into variable
      var returnedResponse = response
      // ajax call to omdb with information from tastedive plugged into omdb search query 
      $.ajax({
        url: "https://www.omdbapi.com/?t=" + returnedResponse.responseJSON.Similar.Results[0].Name + "&apikey=trilogy",
        type: "GET",
        dataType: "JSON"
      }).then(function(response){
          // storing omdb response into object
          omdbResponse = response;
          // pass new movieDiv and omdbResponse to printMovieInfo and runs it
          printMovieInfo(movieDiv, omdbResponse);
        })
      }
    })
  }
}


function printMovieInfo(movieDiv, omdbResponse){
  // storing the rating from omdb response
  var rating = omdbResponse.Rated;
  // create and store <p> tag element
  var pOne = $("<p>").text("Rating: " + rating);
  // append new html element to the page
  movieDiv.append(pOne);

  // do the same thing we did for the rating but for other movie info
  var released = omdbResponse.Released;

  var pTwo = $("<p>").text("Released: " + released);

  movieDiv.append(pTwo);

  var plot = omdbResponse.Plot;

  var pThree = $("<p>").text("Plot: " + plot);

  movieDiv.append(pThree);

  var imgURL = omdbResponse.Poster;

  var image = $("<img>").attr("src", imgURL);

  movieDiv.append(image);

  // hide questionnaire
  document.getElementById("questionnaire").innerHTML = "";
  // prepend movie content to page above other movies that may be in the div
  $("#questionnaire").prepend(movieDiv);
}

// run questionnaire
startQuestionnaire();