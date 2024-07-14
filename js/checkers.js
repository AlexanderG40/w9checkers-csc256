// create a 2d array to manage the layout of the pieces on the checkers board
arrPieces = [
    ['b', null, 'b', null, 'b', null, 'b', null],
    [null, 'b', null, 'b', null, 'b', null, 'b'],
    ['b', null, 'b', null, 'b', null, 'b', null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, 'g', null, 'g', null, 'g', null, 'g'],
    ['g', null, 'g', null, 'g', null, 'g', null],
    [null, 'g', null, 'g', null, 'g', null, 'g']
]

// create a pointer to the secret span
var secretSpan = document.getElementById("selectedSquare");

// Create a function to build a checkers board
function createCheckersBoard(checkersBoard){
    // a typical checkers board has 8 rows 8 columns 
    // we will build those with nested loops
    for (var i = 0; i < 8; i++){
        // loop to build the columns
        for (var j=0; j < 8; j++){
            // build the checkers squares 
            // create a new div 
            var checkersSquare = document.createElement("div");

            // assign a css class to each square 
            checkersSquare.className = "checkersSquare";
            // add an id, so we know where to move the pieces to and from
            checkersSquare.setAttribute("id", "div" + i + j);

            // check to see if is an even or odd square
            // % is modulus (mod) - it divides the first number by the second but only returns the remainder; if the remainder is 0 when our row+column is divided by 2, then it was an even number
            if ((i+j) % 2 == 0){
                // this will add a css class that changes the background color
                checkersSquare.classList.add("checkersBg");
                // Add an event listener for the click on the square event, then call the movePiece function
                checkersSquare.addEventListener("click", movePiece);
            }

            // add the checkers quare to the checkers board div
            checkersBoard.appendChild(checkersSquare);

            // if the corresponding elements in the array is not null add a checkers piece to the square
            // in this example, if the value is b or g, the statement will be true
            if (arrPieces[i][j]){
                // pass in 3 arguments - piece#, the css class to set the correct piece color where the piece should be added
                createPiece("piece" + i + j, "checkerPiece-" + arrPieces[i][j], checkersSquare);
            }
        }
    }
}

// function to create the checkers piece
function createPiece(id, pieceClass, theSquare){
    // create a new div 
    var newPiece = document.createElement("div");
    // set the id, so we can know what square/piece we are working with later
    newPiece.setAttribute("id", id);
    // apply the standard checker piece class to the piece
    newPiece.classList.add("checkerPiece");
    // use the value passed in to create a white or black piece
    newPiece.classList.add(pieceClass); 
    // add an onlick event handler to handle when the piece is clicked
    newPiece.addEventListener("click", savePieceId);
    // add our new piece to the square
    theSquare.appendChild(newPiece);
}

// function to handle the moving of the piece
function movePiece(event){
    console.log("movePiece function called");

    // what piece was clicked 
    var newSquareId = event.target.id;

    // remove any prefix that we may have on the new square id
    newSquareId = newSquareId.replace("piece", "").replace("div", "");

    // get the id of the piece to move from the secret span
    var selPieceId = secretSpan.textContent;

    // make sure that the user is trying to move the piece to a different square
    if (newSquareId != selPieceId){
        // create a pointer to the old square
        var oldSquare = document.getElementById("div" + selPieceId);
        // create a pointer to the old piece 
        var oldPiece = document.getElementById("piece" + selPieceId);
        // get the color of the old piece 
        var oldPieceColorClass = oldPiece.classList[1];
        // remove the old piece from the board
        oldSquare.removeChild(oldPiece);

        // create the pointer to the new square
        var newSquare = document.getElementById("div" + newSquareId);
        // create the new piece on the new square
        createPiece("piece" + newSquare, oldPieceColorClass, newSquare);

        // clear the value from the secret span
        secretSpan.textContent = "";

    }
}

// function to save the piece id in our secret span
function savePieceId(event){
    //console.log("savePieceId function called");

    // var to hold the id of the piece
    var selectedPieceId = event.target.id;

    // remove the word piece from the id so we just have the row # and col #
    selectedPieceId = selectedPieceId.replace("piece", "");

    // store the piece id in our secret span
    secretSpan.textContent = selectedPieceId;

    console.log("selectedPieceId=" + selectedPieceId);
}