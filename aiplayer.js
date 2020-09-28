function playAi(){
    let curBoard = gameBoard.gameLog[gameBoard.gameLog.length - 1];
    let tBoard = [...curBoard];
    let bestMove;
    let bestScore = -Infinity;
    for(let i = 0; i < 9; i++){
        if(tBoard[i] === ''){
            tBoard[i] = 'O';
            let score = minimax(tBoard, true);
            tBoard[i] = '';
            if(score > bestScore){
                bestScore = score;
                bestMove = i;
            }
        }
    }
    game.letPlay(bestMove);
}
let scores = {
    'X': -1,
    'O': +1,
    'Draw': 0 
}
function minimax(board, isMax){
    let result = game.checkWinner(board);
    if(result){
        return scores[result];
    }
    if(isMax){
        let bestScore = -Infinity;
        for(let i = 0; i < 9; i++){
            if(board[i] === ''){
                board[i] = 'X';
                let score = minimax(board, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    }
    else{
        let bestScore = Infinity;
        for(let i = 0; i < 9; i++){
            if(board[i] === ''){
                board[i] = 'O';
                let score = minimax(board, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}