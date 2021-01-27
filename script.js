// ----------API KEY FOR TASTE DIVE---------------
// 400280-Schoolpr-9S2V42WM
// ----------API KEY FOR TASTE DIVE---------------

// https://tastedive-api-documentation.readthedocs.io/en/latest/

// "https://www.omdbapi.com/?t=" + filler variable + "&apikey=trilogy"
var currentQuestionIndex = 0;
var questionTitle = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");

function startQuestionnaire() {
    var currentQuestion = questions[currentQuestionIndex]

    questionTitle.textContent = currentQuestion.title
    choicesEl.innerHTML = ""

    currentQuestion.choices.forEach(function(choice, i) {
        // create new button for each choice
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);
      
        choiceNode.textContent = i + 1 + ". " + choice;
      
        
        choiceNode.onclick = questionClick;
      
        // display on the page
        choicesEl.appendChild(choiceNode);
      });
};