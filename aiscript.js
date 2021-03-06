const ai = (() => {
    //scores with corresponding values
    let scores = {
        X: -1,
        O: +1,
        Draw: 0,
    };
    //apply minimax to all available positions to get the best move
    const playAi = () => {
        let curBoard;
        if (gameBoard.gameLog.length === 0)
            curBoard = ["", "", "", "", "", "", "", "", ""];
        else curBoard = gameBoard.gameLog[gameBoard.gameLog.length - 1];
        let tBoard = [...curBoard];
        let bestMove;
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (tBoard[i] === "") {
                tBoard[i] = "O";
                let score = minimax(tBoard, false);
                tBoard[i] = "";
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        playerO.play(bestMove);
    };
    //minimax algorithm for all possible remaining moves
    const minimax = (board, isMax) => {
        let result = game.checkWinner(board);
        if (result) {
            return scores[result];
        }
        if (isMax) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === "") {
                    board[i] = "O";
                    let score = minimax(board, false);
                    board[i] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === "") {
                    board[i] = "X";
                    let score = minimax(board, true);
                    board[i] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    };
    return { playAi };
})();
