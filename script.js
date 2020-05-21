function startEvent() {
    // Make the start button disappear when it is clicked
    let element = document.getElementById("startGame");
    element.innerHTML = "";

    // Make the level options disappear when start is clicked
    let level = document.getElementById("levels").value //Before removing levels, we have to obtain the value of the level
    element = document.getElementById("level");
    element.innerHTML = "";

    // Show the score of each player and whose turn it is
    element = document.getElementById("score");
    element.innerHTML = 'Player 1\'s Score: <span id="scoreValue1"> 0 </span> <emsp> | </emsp> Player 2\'s Score: <span id="scoreValue2"> 0 </span>';
    element = document.getElementById("turn");
    element.innerHTML = '<span id="currentPlayer"> Player 1\'s turn </span>';


    // Loading the images
    let imagesPaths = ['images/joker.png', 'images/doghouse.png', 'images/candy.png',
     'images/fireplace.png', 'images/kobe.png', 'images/umbrella.png', 'images/teddy.png', 'images/diamond.png', 'images/robot.png', 'images/crown.png']
    

    // Show the cards of the game
    let gameHTMLEasy = '<div class="row"> <div class="column"> <div class="card"> card 1 </div > </div> <div class="column"> <div class="card"> card 2 </div> </div> <div class="column">  <div class="card"> card 3 </div>  </div> <div class="column"> <div class="card"> card 4 </div> </div> </div> \n <div class="row"> <div class="column"> <div class="card"> card 5 </div > </div > <div class="column"> <div class="card"> card 6 </div> </div> <div class="column">  <div class="card"> card 7 </div>  </div> <div class="column"> <div class="card"> card 8</div> </div> </div> <div class="row"> <div class="column"> <div class="card"> card 9</div ></div> <div class="column"> <div class="card"> card 10</div> </div> <div class="column">  <div class="card"> card 11</div>  </div> <div class="column"> <div class="card"> card 12</div> </div> </div>';
    let gameHTMLMedium = gameHTMLEasy + '<div class="row"> <div class="column"> <div class="card"> card 13 </div > </div> <div class="column"> <div class="card"> card 14 </div > </div> <div class="column"> <div class="card"> card 15 </div > </div> <div class="column"> <div class="card"> card 16 </div > </div> </div>'
    let gameHTMLHard = gameHTMLMedium + '<div class="row"> <div class="column"> <div class="card"> card 17 </div > </div> <div class="column"> <div class="card"> card 18 </div > </div> <div class="column"> <div class="card"> card 19 </div > </div> <div class="column"> <div class="card"> card 20 </div > </div> </div>'
    element = document.getElementById("game");
    let columnClassElements = document.getElementsByClassName("column")
    if(level == 'easy'){
        element.innerHTML = gameHTMLEasy
        imagesPaths.splice(6,9)
    }
    else if(level == 'medium'){
        element.innerHTML = gameHTMLMedium;
        imagesPaths.splice(8,9)
    }
    else if(level =='hard'){
        element.innerHTML = gameHTMLHard;
    }

    // Shuffling the images array
    shuffleArray(imagesPaths)

    // Allocate a position for each of the images
    let positions = new Array(imagesPaths.length * 2)
    for(let i = 0; i<positions.length; i++){
        if(i < positions.length / 2)
             positions[i] = imagesPaths[i]
        else if(i == positions.length /2){
            shuffleArray(imagesPaths)
            positions[i] = imagesPaths[i-(positions.length/2)]
        }
        else{
            positions[i] = imagesPaths[i-(positions.length/2)]
        }
    }
    console.log(positions)
 
    // Adding the question mark icon to the cards
    for(var i = 0; i < columnClassElements.length;i++){
        columnClassElements[i].innerHTML = `<button class="card"><img src="images/question_mark.png"/>`
    }
    // Adding functionality to each card
    let cardClassElements = document.getElementsByClassName("card")
    for(let i = 0; i < cardClassElements.length;i++){
        cardClassElements[i].onclick = function(){cardClicked(i, positions);}
    }
   

    // Show the restart game button
    element = document.getElementById("restartGame");
    element.innerHTML = '<button id="restart" onclick="restartEvent()">RESTART</button>';
}

function restartEvent(){
        // Make the restart button disappear when it is clicked
        let element = document.getElementById("restartGame");
        element.innerHTML = "";

    // Make the level options appear when restart is clicked
    element = document.getElementById("level");
    element.innerHTML = 'Level: <select id="levels" name="levels">  <option value="easy" id="easy">Easy</option> <option value="medium" id="medium" selected="selected">  Medium</option> <option value="hard" id="hard">Hard</option> </select>';

    // Make the score of each player and whose turn it is disappear
    element = document.getElementById("score");
    element.innerHTML = '';
    element = document.getElementById("turn");
    element.innerHTML = '';

    // Make the cards of the game disappear
    element = document.getElementById("game");
    element.innerHTML = '';

    // Show the start game button
    element = document.getElementById("startGame");
    element.innerHTML = '<button id="start" onclick="startEvent()">START</button>';

}
let currentPlayer = 1;
let counter = 0 ;
let firstClickedCard = ''
let secondClickedCard = ''
let previousImagePosition
let scorePlayer1 = 0
let scorePlayer2 = 0
const turnPlayer1 = "Player 1's Turn"
const turnPlayer2 = "Player 2's Turn"
function cardClicked(par, positions){
    if(currentPlayer==1){
        if(counter == 0){
        // Getting the cards elements from the document
        let cards = document.getElementsByClassName('card')
        // Modifying the clicked card's image
        cards[par].innerHTML = `<img src="`+ positions[par] + `"/>`
        // cards[par].onclick = function(){}
        firstClickedCard = positions[par]
        previousImagePosition = par
        counter = 1
            }
        else if(counter==1){
            if(par == previousImagePosition){
                return
            }
            counter = -1
            currentPlayer = -1
        // Getting the cards elements from the document
        let cards = document.getElementsByClassName('card')
        // Modifying the clicked card's image
        cards[par].innerHTML = `<img src="`+ positions[par] + `"/>`
        secondClickedCard = positions[par]
        if(firstClickedCard == secondClickedCard){
        setTimeout(function(){
            cards[previousImagePosition].innerHTML = ``;
            cards[par].innerHTML = ``;
            document.getElementById("turn").innerText = turnPlayer2
            counter = 0;
            currentPlayer = 2}, 2000)

            scorePlayer1 += 1
            cards[previousImagePosition].onclick = function(){}
            cards[par].onclick = function(){}
            let scoreValue1 = document.getElementById("scoreValue1")
            scoreValue1.innerText = "" + scorePlayer1
        }
        else{
            setTimeout(function(){
                cards[previousImagePosition].innerHTML = `<img src="images/question_mark.png"/>`;
               // cards[previousImagePosition].onclick = cardClicked(previousImagePosition, positions)
                cards[par].innerHTML = `<img src="images/question_mark.png"/>`;
                document.getElementById("turn").innerText = turnPlayer2
                counter = 0;
                currentPlayer = 2 }, 2000)
        }
        if((scorePlayer1 + scorePlayer2) == positions.length / 2){
            if(scorePlayer1 == scorePlayer2){
                setTimeout(function(){let gameHTML = document.getElementById("game");
            gameHTML.innerHTML= '<h1> The game has ended in a draw. </h1>';
            [scorePlayer1, scorePlayer2] = [0,0];
            currentPlayer = 1;}, 2000)
            }
            else if(scorePlayer1 > scorePlayer2){
                setTimeout(function(){let gameHTML = document.getElementById("game");
            gameHTML.innerHTML= '<h1> Player 1 has won the game! </h1>';
            [scorePlayer1, scorePlayer2] = [0,0];
            currentPlayer = 1;}, 2000)
            }
            else if( scorePlayer1 < scorePlayer2){
                setTimeout(function(){let gameHTML = document.getElementById("game");
            gameHTML.innerHTML= '<h1> Player 2 has won the game! </h1>';
            [scorePlayer1, scorePlayer2] = [0,0];
            currentPlayer = 1;}, 2000)
            }
        }
        
            }
    }

    else if(currentPlayer == 2){

        if(counter == 0){
        // Getting the cards elements from the document
        let cards = document.getElementsByClassName('card')
        // Modifying the clicked card's image
        cards[par].innerHTML = `<img src="`+ positions[par] + `"/>`
       // cards[par].onclick = function(){}
        firstClickedCard = positions[par]
        previousImagePosition = par
        counter = 1
            }
        else if(counter==1){
            if(par == previousImagePosition){
                return
            }
            counter = -1
            currentPlayer = -1
        // Getting the cards elements from the document
        let cards = document.getElementsByClassName('card')
        // Modifying the clicked card's image
        cards[par].innerHTML = `<img src="`+ positions[par] + `"/>`
        secondClickedCard = positions[par]
        if(firstClickedCard == secondClickedCard){
        setTimeout(function(){
            cards[previousImagePosition].innerHTML = ``;
            cards[par].innerHTML = ``;
            document.getElementById("turn").innerText = turnPlayer1
            counter = 0;
            currentPlayer = 1}, 2000)

            scorePlayer2 += 1
            cards[previousImagePosition].onclick = function(){}
            cards[par].onclick = function(){}
            let scoreValue2 = document.getElementById("scoreValue2")
            scoreValue2.innerText = "" + scorePlayer2
        }
        else{
            setTimeout(function(){
                cards[previousImagePosition].innerHTML = `<img src="images/question_mark.png"/>`;
               // cards[previousImagePosition].onclick = cardClicked(previousImagePosition, positions)
                cards[par].innerHTML = `<img src="images/question_mark.png"/>`;
                document.getElementById("turn").innerText = turnPlayer1
                counter = 0;
                currentPlayer = 1}, 2000)
            }
        if((scorePlayer1 + scorePlayer2) == positions.length / 2){
                if(scorePlayer1 == scorePlayer2){
                    setTimeout(function(){let gameHTML = document.getElementById("game");
                gameHTML.innerHTML= '<h1> The game has ended in a draw. </h1>';
                [scorePlayer1, scorePlayer2] = [0,0];}, 2000)
                }
                else if(scorePlayer1 > scorePlayer2){
                    setTimeout(function(){let gameHTML = document.getElementById("game");
                gameHTML.innerHTML= '<h1> Player 1 has won the game! </h1>';
                [scorePlayer1, scorePlayer2] = [0,0];}, 2000)
                }
                else if( scorePlayer1 < scorePlayer2){
                    setTimeout(function(){let gameHTML = document.getElementById("game");
                gameHTML.innerHTML= '<h1> Player 2 has won the game! </h1>';
                [scorePlayer1, scorePlayer2] = [0,0];}, 2000)
                }
            }
        }

    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}