class Chess {
    constructor() {
        this.board = [
            ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
            ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
            ['--', '--', '--', '--', '--', '--', '--', '--'],
            ['--', '--', '--', '--', '--', '--', '--', '--'],
            ['--', '--', '--', '--', '--', '--', '--', '--'],
            ['--', '--', '--', '--', '--', '--', '--', '--'],
            ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
            ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']];
        this.isWhiteTurn = true;
        this.history = [];
        this.pieces = ['br', 'bn', 'bb', 'bq', 'bk', 'bp', 'wq', 'wk', 'wb', 'wn', 'wr', 'wp'];
    }

    makeMove(move) {
        this.board[move.startX][move.startY] = '--';
        this.board[move.endX][move.endY] = move.pieceMoved;
        this.history.push(move);
        this.isWhiteTurn = !this.isWhiteTurn;
    }

    undoMove() {
        if (this.history.length !== 0) {
            const move = this.history.pop();
            this.board[move.startX][move.startY] = move.pieceMoved;
            this.board[move.endX][move.endY] = move.pieceCaptured;
            this.isWhiteTurn = !this.isWhiteTurn;
        }
    }

    getValidMoves() {
        return this.getAllPossibleMoves();
    }

    getAllPossibleMoves() {
        let moves = [];
        let test = new Move([6,4], [4,4], this.board);
        // console.log(test);
        moves.push(test);
        for (let r = 0; r < this.board.length; r++) {
            for (let c = 0; c < this.board[r].length; c++) {
                let pieceColor = this.board[r][c][0];
                if (pieceColor === 'w' && this.isWhiteTurn || pieceColor === 'b' && !this.isWhiteTurn) {
                    let pieceType = this.board[r][c][1];
                    if (pieceType === 'p') {
                        this.getPawnMoves(r, c, moves);
                    } else if (pieceType === 'r') {
                        this.getRookMoves(r, c, moves);
                    } else if (pieceType === 'n') {
                        this.getKnightMoves(r, c, moves);
                    } else if (pieceType === 'b') {
                        this.getBishopMoves(r, c, moves);
                    } else if (pieceType === 'q') {
                        this.getQueenMoves(r, c, moves);
                    } else if (pieceType === 'k') {
                        this.getKingMoves(r, c, moves);
                    }
                }
            }
        }
        return moves;
    }

    getPawnMoves(r, c, moves) {}

    getRookMoves(r, c, moves) {}

    getKnightMoves(r, c, moves) {}

    getBishopMoves(r, c, moves) {}

    getQueenMoves(r, c, moves) {}

    getKingMoves(r, c, moves) {}

}

class Move {
    constructor(startSq, endSq, board) {
        this.startX = startSq[0];
        this.startY = startSq[1];
        this.endX = endSq[0];
        this.endY = endSq[1];
        this.pieceMoved = board[this.startX][this.startY];
        this.pieceCaptured = board[this.endX][this.endY];
    }
}
