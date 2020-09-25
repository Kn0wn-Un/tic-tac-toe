const Player = (name, symbol) => { 
    const play = (btn_id) =>{
        let btn = document.getElementById(btn_id);
        btn.innerHTML = symbol;
        console.log(btn_id);
    };
    return {name, symbol, play}
};

let playerX = Player("Player X", "X");;
let playerO = Player("Player O", "O");;



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
                gameBoard.dispWinner("X");
            else if(arrayCheck("O", winPos[i], tBoard))
                gameBoard.dispWinner("O");
        }
        if(X + O === 9)
            gameBoard.dispWinner("Draw");
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



const gameBoard = (()=>{
    const gameLog = [];
    const board = document.querySelector(".game-board");
    const winDisp = document.querySelector(".winner");
    const btns = document.querySelector(".btns");
    const initialise = () => {
        board.innerHTML = "";
        winDisp.style.visibility = "hidden";
        board.style.visibility = "visible";
        board.classList.add("on-visible");
        btns.style.visibility = "visible";
        game.start();
        console.log(playerX);
        console.log(playerO);
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
        let restartBtn = document.querySelector("#restart");
        restartBtn.addEventListener("click", initialise);
        let change = document.querySelector("#change");
        change.addEventListener("click", dispForm);
    };
    const dispForm = () =>{
        let name1 = prompt("Enter Player 1 Name", "PlayerX");
        let name2 = prompt("Enter Player 2 Name", "PlayerO");
        if(name1 != null) playerX.name = name1;
        if(name2 != null) playerO.name = name2;
        let dispCur = document.querySelector(".player-disp");
        dispCur.innerHTML = playerX.name + "(" + playerX.symbol + ")" ;
        initialise();
    }
    const dispWinner = (winner) => {
        console.log(winner);
        board.style.visibility = "hidden"; 
        if(winner === "Draw")
            winDisp.innerHTML = "Game is a draw";
        else
            winDisp.innerHTML = "Winner is " +  (winner === playerX.symbol ? playerX.name : playerO.name);
        winDisp.style.visibility = "visible";
    }
    return { gameLog, dispWinner, dispForm };
})();
gameBoard.dispForm();
