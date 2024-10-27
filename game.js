document.addEventListener("DOMContentLoaded", function () {
    let gridDisplay = document.querySelector(".grid");
    let scoreDisplay = document.querySelector("#score");
    let resultDisplay = document.querySelector("#result");
    let width = 4;
    let squares = [];
    let score = 0;
    // create the playing board
    function createBoard() {
        for (var i = 0; i < width * width; i++) {
            var square = document.createElement("div");
            square.innerHTML = 0 + '';
            if (gridDisplay) {
                gridDisplay.appendChild(square);
            }
            squares.push(square);
        }
        generate();
        generate();
    }
    createBoard();
    //generate a new number
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length);
        if (parseInt(squares[randomNumber].innerHTML) === 0) {
            squares[randomNumber].innerHTML = "2";
            checkForGameOver();
        }
        else
            generate();
    }
    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
                let filteredRow = row.filter(function (num) { return num; });
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filteredRow);
                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }
    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
                let filteredRow = row.filter(function (num) { return num; });
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeros);
                squares[i].innerHTML = newRow[0] + '';
                squares[i + 1].innerHTML = newRow[1] + '';
                squares[i + 2].innerHTML = newRow[2] + '';
                squares[i + 3].innerHTML = newRow[3] + '';
                squares[i + 4].innerHTML = newRow[4] + '';
            }
        }
    }
    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + width * 2].innerHTML;
            let totalFour = squares[i + width * 3].innerHTML;
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
            let filteredColumn = column.filter(function (num) { return num; });
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeros);
            squares[i].innerHTML = newColumn[0] + '';
            squares[i + width].innerHTML = newColumn[1] + '';
            squares[i + width * 2].innerHTML = newColumn[2] + '';
            squares[i + width * 3].innerHTML = newColumn[3] + '';
        }
    }
    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + width * 2].innerHTML;
            let totalFour = squares[i + width * 3].innerHTML;
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
            let filteredColumn = column.filter(function (num) { return num; });
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = zeros.concat(filteredColumn);
            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + width * 2].innerHTML = newColumn[2];
            squares[i + width * 3].innerHTML = newColumn[3];
        }
    }
    function combineRow() {
        let _loop_1 = function (i) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                var combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = combinedTotal + '';
                squares[i + 1].innerHTML = 0 + '';
                score += combinedTotal;
                var scoreDisplay_1 = document.getElementById("score");
                function combineColumn() {
                    if (scoreDisplay_1 !== null) { // Check if scoreDisplay is not null
                        scoreDisplay_1.innerHTML = score + '';
                    }
                    else {
                        console.error("scoreDisplay is null!");
                    }
                }
            }
        };
        for (let i = 0; i < 15; i++) {
            _loop_1(i);
        }
        checkForWin();
    }
    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                squares[i].innerHTML = combinedTotal + '';
                squares[i + width].innerHTML = '0';
                score += combinedTotal;
                if (scoreDisplay !== null) {
                    scoreDisplay.innerHTML = score + '';
                }
                else {
                    console.error("scoreDisplay is null!");
                }
            }
        }
        checkForWin();
    }
    ///assign functions to keys
    function control(e) {
        if (e.key === "ArrowLeft") {
            keyLeft();
        }
        else if (e.key === "ArrowRight") {
            keyRight();
        }
        else if (e.key === "ArrowUp") {
            keyUp();
        }
        else if (e.key === "ArrowDown") {
            keyDown();
        }
    }
    document.addEventListener("keydown", control);
    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        generate();
    }
    function keyRight() {
        moveRight();
        combineRow();
        moveRight();
        generate();
    }
    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        generate();
    }
    function keyDown() {
        moveDown();
        combineColumn();
        moveDown();
        generate();
    }
    //check for the number 2048 in the squares to win
    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (parseInt(squares[i].innerHTML) === 2048) {
                if (resultDisplay !== null) {
                    resultDisplay.innerHTML = "You WIN!";
                }
                else {
                    console.error("resultDisplay is null!");
                }
                document.removeEventListener("keydown", control);
                setTimeout(clear, 3000);
            }
        }
    }
    //check if there are no zeros on the board to lose
    function checkForGameOver() {
        let zeros = 0;
        for (let i = 0; i < squares.length; i++) {
            if (parseInt(squares[i].innerHTML) === 0) {
                zeros++;
            }
        }
        if (zeros === 0) {
            (resultDisplay !== null && resultDisplay !== void 0 ? resultDisplay : document.createElement('div')).innerHTML = "You LOSE!";
            document.removeEventListener("keydown", control);
            setTimeout(clear, 3000);
        }
    }
    function clear() {
        clearInterval(myTimer);
    }
    //add colours
    function addColours() {
        for (let i = 0; i < squares.length; i++) {
            if (parseInt(squares[i].innerHTML) === 0)
                squares[i].style.backgroundColor = "#afa192";
            else if (parseInt(squares[i].innerHTML) === 2)
                squares[i].style.backgroundColor = "#eee4da";
            else if (parseInt(squares[i].innerHTML) === 4)
                squares[i].style.backgroundColor = "#ede0c8";
            else if (parseInt(squares[i].innerHTML) === 8)
                squares[i].style.backgroundColor = "#f2b179";
            else if (parseInt(squares[i].innerHTML) === 16)
                squares[i].style.backgroundColor = "#ffcea4";
            else if (parseInt(squares[i].innerHTML) === 32)
                squares[i].style.backgroundColor = "#e8c064";
            else if (parseInt(squares[i].innerHTML) === 64)
                squares[i].style.backgroundColor = "#ffab6e";
            else if (parseInt(squares[i].innerHTML) === 128)
                squares[i].style.backgroundColor = "#fd9982";
            else if (parseInt(squares[i].innerHTML) === 256)
                squares[i].style.backgroundColor = "#ead79c";
            else if (parseInt(squares[i].innerHTML) === 512)
                squares[i].style.backgroundColor = "#76daff";
            else if (parseInt(squares[i].innerHTML) === 1024)
                squares[i].style.backgroundColor = "#beeaa5";
            else if (parseInt(squares[i].innerHTML) === 2048)
                squares[i].style.backgroundColor = "#d7d4f0";
        }
    }
    addColours();
    let myTimer = setInterval(addColours, 50);
});