const Player = (pName, symbol) => { 
    const name = pName || ("Player " + symbol);
    const play = (btn_id) =>{
        let btn = document.getElementById(btn_id);
        btn.innerHTML = symbol;
        console.log(btn_id);
    };
    return {name, symbol, play}
};



const gameBoard = (()=>{
    const gameLog = [];
    const board = document.querySelector(".game-board");
    const winDisp = document.querySelector(".winner");
    const input = document.querySelector(".input");
    const initialise = () => {
        board.innerHTML = "";
        input.style.visibility = "hidden";
        winDisp.style.visibility = "hidden";
        board.style.visibility = "visible";
        game.start();
        for(let i = 1, id = 1; i <= 3; i++){
            let col = document.createElement("div");
            col.classList.add("col"+i);
            for(let j = 1; j <= 3; j++, id++){
                let play = document.createElement("div");
                play.classList.add("play");
                play.id = id;
                play.addEventListener("click", ()=>game.letPlay(play.id));
                col.appendChild(play);
            }
            board.appendChild(col);
        }
        let restartBtn = document.querySelectorAll("#restart");
        for(let i = 0; i < restartBtn.length; i++)
            restartBtn[i].addEventListener("click", initialise);
    };
    const dispForm = () =>{
        input.style.visibility = "visible";
        board.style.visibility = "hidden";
        winDisp.style.visibility = "hidden";
        input.innerHTML="";
        let form = document.createElement("form");
        form.name = "form";
        
        let name = document.createElement("div");
        name.innerHTML = "Input Player 1 name : <br>";

        let name1 = document.createElement("input");
        name1.type = "text";
        name1.name="player1";
        name.appendChild(name1);
        name.innerHTML += "<br>Input Player 2 name : <br>";
        let name2 = document.createElement("input");
        name2.type = "text";
        name2.name="player2";
        name.appendChild(name2);

        let submit = document.createElement("input");
        submit.type = "submit";
        submit.value = "Play!";
        form.addEventListener("submit", ()=>{
            let nameX = document.forms["form"]["player1"];
            let nameY = document.forms["form"]["player2"];
            createPlayers(nameX, nameY);
        });

        form.appendChild(name);
        form.appendChild(submit);
        input.appendChild(form);
    }
    const dispWinner = (winner) => {
        console.log(winner);
        board.style.visibility = "hidden"; 
        input.style.visibility = "hidden";    
        winDisp.innerHTML = "Winner is " +  (winner === playerX.symbol ? playerO.name : playerX.name);
        winDisp.style.visibility = "visible";
    }
    return { initialise, gameLog, dispWinner, dispForm };
})();
gameBoard.dispForm();


let playerX;
let playerO;
function createPlayers(x, o){
    playerX = Player(x, "X");
    playerO = Player(0, "O");
    gameBoard.initialise();
}



const game = (()=>{
    let curPlaying="X";
    const winPos = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];
    const checkMove = (id) =>{
        if(gameBoard.gameLog.length === 0)
            return true
        let lastMove = gameBoard.gameLog[gameBoard.gameLog.length - 1];
        if(lastMove[id] != "")
            return false;
        return true;
    } 
    const letPlay = (id) =>{
        if(!checkMove(id))
            return;
        curPlaying === playerX.symbol ? playerX.play(id) : playerO.play(id);
        logBoard();
        if(checkWinner()){
            gameBoard.dispWinner(checkWinner());
            return;
        }
        nextPlayer();
    };
    const nextPlayer = ()=>{
        curPlaying = curPlaying === playerX.symbol ? playerO.symbol : playerX.symbol;
        let dispCur = document.querySelector(".player-disp");
        dispCur.innerHTML = curPlaying === playerX.symbol ? 
                            playerX.name + "(" + playerX.symbol + ")" 
                            :playerO.name+ "(" + playerO.symbol + ")"; 
    }
    const logBoard = () =>{
        let board = [];
        for(let i = 1; i <= 9; i++){
            let btn = document.getElementById(i);
            board[i] = btn.innerHTML;
        }
        gameBoard.gameLog.push(board);
        console.log(gameBoard.gameLog);
    }
    const start = () =>{
        gameBoard.gameLog = [];
    }
    const checkWinner = () =>{
        let tBoard = gameBoard.gameLog[gameBoard.gameLog.length - 1];
        console.log(tBoard);
        let X = getLength("X", tBoard);
        let O = getLength("O", tBoard);
        for(let i = 0; i < winPos.length; i++){
            if(arrayCheck("X", winPos[i], tBoard))
                return "X";
            else if(arrayCheck("O", winPos[i], tBoard))
                return "O"
        }
        if(X + O === 9)
            return "Draw";
        return false
    }
    const getLength = (sym, board) =>{
        let tArr = [];
        for(let i = 0; i < board.length; i++)
            if(board[i] === sym)
                tArr.push(i);
        return tArr.length;
    }
    const arrayCheck = (sym, win, board) =>{
        for(let i = 0; i < win.length; i++)
            if(board[win[i]] != sym) return false;
        return true;
    }
    
    return { start, letPlay }
})();



