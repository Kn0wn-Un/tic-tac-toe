const Player = (name, symbol) => { 
    const play = (btn_id) =>{
        let btn = document.getElementById(btn_id);
        btn.innerHTML = symbol;
        console.log(btn_id);
    };
    return {name, symbol, play}
};



const game = (()=>{
    let curPlaying="X";
    let lastMove = [];
    const checkMove = (id) =>{
        if(gameBoard.gameLog.length === 0)
            lastMove = [];
        else
            lastMove = gameBoard.gameLog[gameBoard.gameLog.length - 1];
        if(lastMove[id] != "")
            return false;
        return true;
    } 
    const letPlay = (id) =>{
        if(!checkMove(id) && lastMove.length != 0)
            return;
        curPlaying === playerX.symbol ? playerX.play(id) : playerO.play(id);
        nextPlayer();
        logBoard();
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
    return { start, lastMove, letPlay }
})();



const gameBoard = (()=>{
    const gameLog = [];
    const board = document.querySelector(".game-board");
    const initialise = () => {
        board.innerHTML = "";
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
        let restartBtn = document.querySelector("#restart");
        restartBtn.addEventListener("click", initialise);
    };
    return { initialise, gameLog };
})();
gameBoard.initialise();
let playerO = Player("Vinod", "O");
let playerX = Player("Binod", "X");