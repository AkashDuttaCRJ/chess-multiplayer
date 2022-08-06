class Chess {
    constructor(squareSize) {
        this.squareSize = squareSize;
        this.board = new Board(squareSize).board;
        this.isWhiteTurn = true;
        this.isWhiteKingChecked = false;
        this.isBlackKingChecked = false;
        this.isWhiteKingMoved = false;
        this.isBlackKingMoved = false;
        this.gameOver = false;
        // this.isWhiteKingCastled = false;
        // this.isBlackKingCastled = false;
    }

    getValidMoves(posX, posY) {
        const validMoves = [];
        return validMoves;
    }
}

class Board {
    constructor(squareSize) {
        this.squareSize = squareSize;
        this.board = [];
        this.pieces = [
            {name: 'bR',indexes: [0, 0]},
            {name: 'bN',indexes: [1, 0]},
            {name: 'bB',indexes: [2, 0]},
            {name: 'bQ',indexes: [3, 0]},
            {name: 'bK',indexes: [4, 0]},
            {name: 'bB',indexes: [5, 0]},
            {name: 'bN',indexes: [6, 0]},
            {name: 'bR',indexes: [7, 0]},
            {name: 'bP',indexes: [0, 1]},
            {name: 'bP',indexes: [1, 1]},
            {name: 'bP',indexes: [2, 1]},
            {name: 'bP',indexes: [3, 1]},
            {name: 'bP',indexes: [4, 1]},
            {name: 'bP',indexes: [5, 1]},
            {name: 'bP',indexes: [6, 1]},
            {name: 'bP',indexes: [7, 1]},
            {name: 'wP',indexes: [0, 6]},
            {name: 'wP',indexes: [1, 6]},
            {name: 'wP',indexes: [2, 6]},
            {name: 'wP',indexes: [3, 6]},
            {name: 'wP',indexes: [4, 6]},
            {name: 'wP',indexes: [5, 6]},
            {name: 'wP',indexes: [6, 6]},
            {name: 'wP',indexes: [7, 6]},
            {name: 'wR',indexes: [0, 7]},
            {name: 'wN',indexes: [1, 7]},
            {name: 'wB',indexes: [2, 7]},
            {name: 'wQ',indexes: [3, 7]},
            {name: 'wK',indexes: [4, 7]},
            {name: 'wB',indexes: [5, 7]},
            {name: 'wN',indexes: [6, 7]},
            {name: 'wR',indexes: [7, 7]}
        ];
        this.initBoard();
    }

    initBoard() {
        this.pieces.forEach(piece => {
            const posX = piece.indexes[0] * this.squareSize;
            const posY = piece.indexes[1] * this.squareSize;
            const color = piece.name.charAt(0) === 'w' ? 'white' : 'black';
            const type = piece.name.charAt(1);
            const url = `./assets/images2/${piece.name.charAt(0)}${type.toLowerCase()}.png`;
            const pieceObj = new Piece(type, color, url, posX, posY);
            this.board.push(pieceObj);
        })
    }
}

class Piece {
    constructor(piece, color, imageUrl, x, y) {
        this.piece = piece;
        this.color = color;
        this.imageUrl = imageUrl;
        this.x = x;
        this.y = y;
    }
}