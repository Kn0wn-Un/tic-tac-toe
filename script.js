//player object
const Player = (name, symbol) => { 
    const play = (btn_id) =>{
        let btn = document.getElementById(btn_id);
        btn.innerHTML = symbol;
    };
    return {name, symbol, play}
};

//make two players
let playerX = Player("Player X", "X");;
let playerO = Player("Player O", "O");;



//game module to keep track of moves and player
const game = (()=>{
    let curPlaying;
    const winPos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    //check if move is valid
    const checkMove = (id) =>{
        if(gameBoard.gameLog.length === 0)
            return true
        let lastMove = gameBoard.gameLog[gameBoard.gameLog.length - 1];
        if(lastMove[id] != "")
            return false;
        return true;
    } 
    //check if move is valid and not a winning move
    const letPlay = (id) =>{
        if(!checkMove(id))
            return;
        playerX.play(id);
        logBoard();
        if(checkWinner(gameBoard.gameLog[gameBoard.gameLog.length - 1])){
            gameBoard.dispWinner(checkWinner(gameBoard.gameLog[gameBoard.gameLog.length - 1]));
            return;
        }
        ai.playAi();
        logBoard();
        if(checkWinner(gameBoard.gameLog[gameBoard.gameLog.length - 1])){
            gameBoard.dispWinner(checkWinner(gameBoard.gameLog[gameBoard.gameLog.length - 1]));
            return;
        }
    };
    //if move valid lod the board
    const logBoard = () =>{
        let board = [];
        for(let i = 0; i < 9; i++){
            let btn = document.getElementById(i);
            board[i] = btn.innerHTML;
        }
        gameBoard.gameLog.push(board);
    }
    //reset board
    const start = () =>{
        gameBoard.gameLog = [];
    }
    //check for winner
    const checkWinner = (tBoard) =>{
        let X = getLength("X", tBoard);
        let O = getLength("O", tBoard);
        for(let i = 0; i < winPos.length; i++){
            if(arrayCheck("X", winPos[i], tBoard))
                return "X";
            else if(arrayCheck("O", winPos[i], tBoard))
                return "O";
        }
        if(X + O === 9)
            return "Draw";
        return false
    }
    //get the positions of X and O
    const getLength = (sym, board) =>{
        let tArr = [];
        for(let i = 0; i < board.length; i++)
            if(board[i] === sym)
                tArr.push(i);
        return tArr.length;
    }
    //check if the positions of X or O are in corresponding winning positions
    const arrayCheck = (sym, win, board) =>{
        for(let i = 0; i < win.length; i++)
            if(board[win[i]] != sym) return false;
        return true;
    }
    
    return { start, letPlay, checkWinner, curPlaying }
})();



//game board module to keep track of game and other display elements
const gameBoard = (()=>{
    const gameLog = [];
    const board = document.querySelector(".game-board");
    const winDisp = document.querySelector(".winner");
    const win = document.querySelector("#dispWinner");
    const btns = document.querySelector(".btns");
    //setup the board and play area
    const initialise = () => {
        board.innerHTML = "";
        winDisp.classList.remove("on-visible-winner");
        btns.classList.remove("on-winner-btn");
        winDisp.style.visibility = "hidden";
        board.style.visibility = "visible";
        board.classList.add("on-visible-board");
        btns.style.visibility = "visible";
        setTimeout(function(){board.classList.remove("on-visible-board");}, 2000);
        game.start();
        for(let i = 1, id = 0; i <= 3; i++){
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
        restartBtn.addEventListener("click", setRand);
        let change = document.querySelector("#change");
        change.addEventListener("click", dispForm);
    };
    //user name input
    const dispForm = () =>{
        let name1 = prompt("Enter Player 1 Name", "PlayerX");
        if(name1 != null) playerX.name = name1;
        //let name2 = prompt("Enter Player 2 Name", "PlayerO");
        //if(name2 != null) playerO.name = name2;
        setRand();
    }
    //handling displaying the winner / draw
    const dispWinner = (winner) => {
        board.style.visibility = "hidden"; 
        if(winner === "Draw")
            win.innerHTML = "Game is a draw";
        else
            win.innerHTML = "Winner is " +  (winner === playerX.symbol ? playerX.name : playerO.name);
        winDisp.style.visibility = "visible";
        winDisp.classList.add("on-visible-winner"); 
        setTimeout(function(){btns.classList.add("on-winner-btn");}, 1250); 
    }
    //randomly set the starting player
    const setRand = ()=>{
        let dispCur = document.querySelector(".player-disp");
        game.curPlaying = !(Math.floor(Math.random() * 2)) ? playerX.symbol : playerO.symbol;
        dispCur.innerHTML = game.curPlaying === playerX.symbol? playerX.name + ", you are starting": "AI has started";
        initialise();
        if(game.curPlaying === playerO.symbol)
            ai.playAi();
    }
    return { gameLog, dispWinner, dispForm };
})();
gameBoard.dispForm();