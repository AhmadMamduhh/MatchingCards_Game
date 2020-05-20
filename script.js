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

    // Show the cards of the game
    let gameHTMLEasy = '<div class="row"> <div class="column"> <div class="card"> card 1 </div > </div> <div class="column"> <div class="card"> card 2 </div> </div> <div class="column">  <div class="card"> card 3 </div>  </div> <div class="column"> <div class="card"> card 4 </div> </div> </div> \n <div class="row"> <div class="column"> <div class="card"> card 5 </div > </div > <div class="column"> <div class="card"> card 6 </div> </div> <div class="column">  <div class="card"> card 7 </div>  </div> <div class="column"> <div class="card"> card 8</div> </div> </div> <div class="row"> <div class="column"> <div class="card"> card 9</div ></div> <div class="column"> <div class="card"> card 10</div> </div> <div class="column">  <div class="card"> card 11</div>  </div> <div class="column"> <div class="card"> card 12</div> </div> </div>';
    let gameHTMLMedium = gameHTMLEasy + '<div class="row"> <div class="column"> <div class="card"> card 13 </div > </div> <div class="column"> <div class="card"> card 14 </div > </div> <div class="column"> <div class="card"> card 15 </div > </div> <div class="column"> <div class="card"> card 16 </div > </div> </div>'
    let gameHTMLHard = gameHTMLMedium + '<div class="row"> <div class="column"> <div class="card"> card 17 </div > </div> <div class="column"> <div class="card"> card 18 </div > </div> <div class="column"> <div class="card"> card 19 </div > </div> <div class="column"> <div class="card"> card 20 </div > </div> </div>'
    element = document.getElementById("game");
    if(level == 'easy'){
        element.innerHTML = gameHTMLEasy
    }
    else if(level == 'medium'){
        element.innerHTML = gameHTMLMedium;
    }
    else if(level =='hard'){
        element.innerHTML = gameHTMLHard;
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