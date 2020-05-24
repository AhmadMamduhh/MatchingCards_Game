let player1Name
let player2Name
let player1Avatar = ''
let player2Avatar = ''

function startEvent() {

    // Check that players have entered their names
    player1Name = document.getElementById('player1name').value
    player2Name = document.getElementById('player2name').value

    if (player1Name == '')
        player1Name = 'Player 1'

    if (player2Name == '')
        player2Name = 'Player 2'


    // Reading the selected user avatar
    let avatar1Elements = document.getElementsByClassName('avatar1')
    let avatar2Elements = document.getElementsByClassName('avatar2')
    for (let i = 0; i < avatar1Elements.length; i++) {
        if (avatar1Elements[i].checked)
            player1Avatar = avatar1Elements[i].value
        if (avatar2Elements[i].checked)
            player2Avatar = avatar2Elements[i].value

    }
    if (player1Avatar == '')
        player1Avatar = 'images/avatar.png'

    if (player2Avatar == '')
        player2Avatar = 'images/avatar.png'

    // Make the start button disappear when it is clicked
    let element = document.getElementById("startGame");
    element.innerHTML = "";

    // Make the level options disappear when start is clicked
    let level = document.getElementById("levels").value //Before removing levels, we have to obtain the value of the level
    element = document.getElementById("level");
    element.innerHTML = "";

    // Show the score of each player and whose turn it is
    element = document.getElementById("score");
    element.innerHTML = `<img src="${player1Avatar}"/> ${player1Name}'s Score: <span id="scoreValue1"> 0 </span> <br> <img src="${player2Avatar}"/> ${player2Name}'s Score: <span id="scoreValue2"> 0 </span>`;
    element = document.getElementById("turn");
    element.innerHTML = `<span id="currentPlayer"> ${player1Name}'s turn </span>`;


    // Loading the images
    let imagesPaths = ['images/joker.png', 'images/doghouse.png', 'images/candy.png',
        'images/fireplace.png', 'images/kobe.png', 'images/umbrella.png', 'images/teddy.png',
        'images/diamond.png','images/coronavirus.png','images/lamp.png', 'images/robot.png', 'images/crown.png']


    // Show the cards of the game
    let gameHTMLEasy = '<div class="row"> <div class="column"> <div class="card"> card 1 </div > </div> <div class="column"> <div class="card"> card 2 </div> </div> <div class="column">  <div class="card"> card 3 </div>  </div> <div class="column"> <div class="card"> card 4 </div> </div> </div> \n <div class="row"> <div class="column"> <div class="card"> card 5 </div > </div > <div class="column"> <div class="card"> card 6 </div> </div> <div class="column">  <div class="card"> card 7 </div>  </div> <div class="column"> <div class="card"> card 8</div> </div> </div> <div class="row"> <div class="column"> <div class="card"> card 9</div ></div> <div class="column"> <div class="card"> card 10</div> </div> <div class="column">  <div class="card"> card 11</div>  </div> <div class="column"> <div class="card"> card 12</div> </div> </div> <div class="row"> <div class="column"> <div class="card"> card 13 </div > </div> <div class="column"> <div class="card"> card 14 </div > </div> <div class="column"> <div class="card"> card 15 </div > </div> <div class="column"> <div class="card"> card 16 </div > </div> </div>'
    let gameHTMLMedium = gameHTMLEasy + '<div class="row"> <div class="column"> <div class="card"> card 17 </div > </div> <div class="column"> <div class="card"> card 18 </div > </div> <div class="column"> <div class="card"> card 19 </div > </div> <div class="column"> <div class="card"> card 20 </div > </div> </div>'
    let gameHTMLHard = gameHTMLMedium + '<div class="row"> <div class="column"> <div class="card"> card 21 </div > </div> <div class="column"> <div class="card"> card 22 </div > </div> <div class="column"> <div class="card"> card 23 </div > </div> <div class="column"> <div class="card"> card 24 </div > </div> </div>'
    element = document.getElementById("game");
    if (level == 'easy') {
        element.innerHTML = gameHTMLEasy
        imagesPaths.splice(8, 11)
    }
    else if (level == 'medium') {
        element.innerHTML = gameHTMLMedium;
        imagesPaths.splice(10, 11)
    }
    else if (level == 'hard') {
        element.innerHTML = gameHTMLHard;
    }


    // Allocate a position for each of the images in the images matrix
    let positions = new Array(imagesPaths.length * 2)
    for (let i = 0; i < positions.length; i++) {
        if (i < positions.length / 2)
            positions[i] = imagesPaths[i]
        else {
            positions[i] = imagesPaths[i - (positions.length / 2)]
        }
    }

    // Shuffling the images matrix so that the positions are random at each gaming session
    shuffleArray(positions)

    // console.log(positions) // Printing the answers for the game for debugging reasons

    // Adding the question mark icon to the cards
    let columnClassElements = document.getElementsByClassName("column")
    for (var i = 0; i < columnClassElements.length; i++) {
        columnClassElements[i].innerHTML = `<button class="card"><img src="images/question_mark.png"/>`
    }
    // Adding functionality to each card
    let cardClassElements = document.getElementsByClassName("card")
    for (let i = 0; i < cardClassElements.length; i++) {
        cardClassElements[i].onclick = function () { cardClicked(i, positions); }
    }


    // Show the restart game button
    element = document.getElementById("restartGame");
    element.innerHTML = '<button id="restart" onclick="restartEvent()">RESTART</button>';
}

let currentPlayer = 1;
let counter = 0;
let firstClickedCard = ''
let secondClickedCard = ''
let previousImagePosition
let scorePlayer1 = 0
let scorePlayer2 = 0
let turnPlayer1 
let turnPlayer2 

function cardClicked(par, positions) {
    
    // Setting names of players each turn
    turnPlayer1 = player1Name + "'s turn"
    turnPlayer2 = player2Name + "'s turn"

    // This function contains the game logic and the events that occur when players click the cards

    if (currentPlayer == 1) {
        if (counter == 0) {
            // Getting the cards elements from the document
            let cards = document.getElementsByClassName('card')
            // Modifying the clicked card's image
            cards[par].innerHTML = `<img src="` + positions[par] + `"/>`
            // cards[par].onclick = function(){}
            firstClickedCard = positions[par]
            previousImagePosition = par
            counter = 1
        }
        else if (counter == 1) {
            if (par == previousImagePosition) {
                return
            }
            counter = -1
            currentPlayer = -1
            // Getting the cards elements from the document
            let cards = document.getElementsByClassName('card')
            // Modifying the clicked card's image
            cards[par].innerHTML = `<img src="` + positions[par] + `"/>`
            secondClickedCard = positions[par]

            if (firstClickedCard == secondClickedCard) {
                setTimeout(function () {
                    cards[previousImagePosition].innerHTML = ``;
                    cards[par].innerHTML = ``;
                    document.getElementById("turn").innerText = turnPlayer2
                    counter = 0;
                    currentPlayer = 2
                }, 1000)

                scorePlayer1 += 2
                cards[previousImagePosition].onclick = function () { }
                cards[par].onclick = function () { }
                let scoreValue1 = document.getElementById("scoreValue1")
                scoreValue1.innerText = "" + scorePlayer1
            }
            else {
                setTimeout(function () {
                    cards[previousImagePosition].innerHTML = `<img src="images/question_mark.png"/>`;
                    cards[par].innerHTML = `<img src="images/question_mark.png"/>`;
                    document.getElementById("turn").innerText = turnPlayer2
                    counter = 0;
                    currentPlayer = 2
                }, 1000)
            }

            if ((scorePlayer1 + scorePlayer2) == positions.length) {
                if (scorePlayer1 == scorePlayer2) {
                    setTimeout(function () {
                        let gameHTML = document.getElementById("game");
                        gameHTML.innerHTML = '<h1> The game has ended in a draw. </h1> <br> <img id="sad" src="images/sad.png"/>';
                        [scorePlayer1, scorePlayer2] = [0, 0];
                        currentPlayer = 1;
                    }, 1000)
                }
                else if (scorePlayer1 > scorePlayer2) {
                    setTimeout(function () {
                        let gameHTML = document.getElementById("game");
                        gameHTML.innerHTML = `<h1> ${player1Name} has won the game! </h1> <br> <img id="celebration" src="images/celebration.png"/>`;
                        [scorePlayer1, scorePlayer2] = [0, 0];
                        currentPlayer = 1;
                    }, 1000)
                }
                else if (scorePlayer1 < scorePlayer2) {
                    setTimeout(function () {
                        let gameHTML = document.getElementById("game");
                        gameHTML.innerHTML = `<h1> ${player2Name} has won the game! </h1> <br> <img id="celebration" src="images/celebration.png"/>`;
                        [scorePlayer1, scorePlayer2] = [0, 0];
                        currentPlayer = 1;
                    }, 1000)
                }
            }

        }
    }

    else if (currentPlayer == 2) {

        if (counter == 0) {
            // Getting the cards elements from the document
            let cards = document.getElementsByClassName('card')
            // Modifying the clicked card's image
            cards[par].innerHTML = `<img src="` + positions[par] + `"/>`
            firstClickedCard = positions[par]
            previousImagePosition = par
            counter = 1
        }
        else if (counter == 1) {
            if (par == previousImagePosition) {
                return
            }
            counter = -1
            currentPlayer = -1
            // Getting the cards elements from the document
            let cards = document.getElementsByClassName('card')
            // Modifying the clicked card's image
            cards[par].innerHTML = `<img src="` + positions[par] + `"/>`
            secondClickedCard = positions[par]

            if (firstClickedCard == secondClickedCard) {
                setTimeout(function () {
                    cards[previousImagePosition].innerHTML = ``;
                    cards[par].innerHTML = ``;
                    document.getElementById("turn").innerText = turnPlayer1
                    counter = 0;
                    currentPlayer = 1
                }, 1000)

                scorePlayer2 += 2
                cards[previousImagePosition].onclick = function () { }
                cards[par].onclick = function () { }
                let scoreValue2 = document.getElementById("scoreValue2")
                scoreValue2.innerText = "" + scorePlayer2
            }
            else {
                setTimeout(function () {
                    cards[previousImagePosition].innerHTML = `<img src="images/question_mark.png"/>`;
                    cards[par].innerHTML = `<img src="images/question_mark.png"/>`;
                    document.getElementById("turn").innerText = turnPlayer1
                    counter = 0;
                    currentPlayer = 1
                }, 1000)
            }

            if ((scorePlayer1 + scorePlayer2) == positions.length) {
                if (scorePlayer1 == scorePlayer2) {
                    setTimeout(function () {
                        let gameHTML = document.getElementById("game");
                        gameHTML.innerHTML = '<h1> The game has ended in a draw. </h1> <br> <img id="sad" src="images/sad.png"/>';
                        [scorePlayer1, scorePlayer2] = [0, 0];
                    }, 1000)
                }
                else if (scorePlayer1 > scorePlayer2) {
                    setTimeout(function () {
                        let gameHTML = document.getElementById("game");
                        gameHTML.innerHTML = `<h1> ${player1Name} has won the game! </h1> <br> <img id="celebration" src="images/celebration.png"/>`;
                        [scorePlayer1, scorePlayer2] = [0, 0];
                    }, 1000)
                }
                else if (scorePlayer1 < scorePlayer2) {
                    setTimeout(function () {
                        let gameHTML = document.getElementById("game");
                        gameHTML.innerHTML = `<h1> ${player2Name} has won the game! </h1> <br> <img id="celebration" src="images/celebration.png"/>`;
                        [scorePlayer1, scorePlayer2] = [0, 0];
                    }, 1000)
                }
            }
        }

    }
}

function restartEvent() {

    // Reset the scores and make current the current turn belong to player 1
    scorePlayer1 = 0
    scorePlayer2 = 0
    currentPlayer = 1

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

    // Show the name and avatar submission form
    element = document.getElementById("game");
    element.innerHTML = `<div id="player1info">
    <label for="player1name">Player 1's name: </label>
    <input type="text" id="player1name" name="player1name"> <br/><br/>
    <label for="player1avatar"> Player 1's avatar: </label>
    <input type="radio" id="clown" class="avatar1" name="avatar1" value="images/clown.png">
    <label for="clown"><img src="images/clown.png"/></label>
    <input type="radio" id="batman" class="avatar1" name="avatar1" value="images/batman.png">
    <label for="batman"><img src="images/batman.png"/></label>
    <input type="radio" id="superman" class="avatar1" name="avatar1" value="images/superman.png">
    <label for="superman"><img src="images/superman.png"/></label>
    <hr>
</div>

<div id="player2info">
        <label for="player2name">Player 2's name: </label>
        <input type="text" id="player2name" name="player2name"><br/><br/>
        <label for="player2avatar"> Player 2's avatar: </label>
        <input type="radio" id="clown2" class="avatar2" name="avatar2" value="images/clown.png">
        <label for="clown2"><img src="images/clown.png"/></label>
        <input type="radio" id="batman2" class="avatar2" name="avatar2" value="images/batman.png">
        <label for="batman2"><img src="images/batman.png"/></label>
        <input type="radio" id="superman2" class="avatar2" name="avatar2" value="images/superman.png">
        <label for="superman2"><img src="images/superman.png"/></label>
</div>`

    // Cache the names and avatar choices of the previous players in the form
    let avatar1Elements = document.getElementsByClassName('avatar1')
    let avatar2Elements = document.getElementsByClassName('avatar2')
    for (let i = 0; i < avatar1Elements.length; i++) {
        if (avatar1Elements[i].value == player1Avatar)
                avatar1Elements[i].checked = true;
        if (avatar2Elements[i].value == player2Avatar)
                avatar2Elements[i].checked = true;
    }

    if(player1Name == 'Player 1')
            player1Name = ''

    if(player2Name == 'Player 2')
            player2Name = ''
    document.getElementById('player1name').value = player1Name
    document.getElementById('player2name').value = player2Name


    // Show the start game button
    element = document.getElementById("startGame");
    element.innerHTML = '<button id="start" onclick="startEvent()">START</button>';

}

function shuffleArray(array) {
    // This function takes an array and randomizes the positions of its elements
    // It's used to shuffle the positions of the images differently each game
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}