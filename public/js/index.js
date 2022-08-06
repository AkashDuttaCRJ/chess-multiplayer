const canvas = document.getElementById('chess-canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 512;
const CANVAS_HEIGHT = canvas.height = 512;

const SQUARE_SIZE = 64;
const RANKS = 8;
const FILES = 8;

const chess = new Chess(SQUARE_SIZE);

const drawBoard = () => {
    for (let rank = 0; rank < RANKS; rank++) {
        for (let file = 0; file < FILES; file++) {
            const x = file * SQUARE_SIZE;
            const y = rank * SQUARE_SIZE;
            const isLight = (rank + file) % 2 === 0;
            ctx.fillStyle = isLight ? '#ececd0' : '#769457';
            ctx.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
        }
    }
}

const drawPieces = () => {
    chess.board.forEach(piece => {
        const pieceImage = new Image();
        pieceImage.src = piece.imageUrl;
        pieceImage.onload = () => {
            ctx.drawImage(pieceImage, 0, 0, 150, 150, piece.x, piece.y, SQUARE_SIZE, SQUARE_SIZE);
        }
    });
}

drawBoard();
drawPieces();


/* Infinite Animation Loop for UI updates goes here */

