const canvas = document.getElementById('chess-canvas');
const ctx = canvas.getContext('2d');

/* VARIABLES */

const CANVAS_WIDTH = canvas.width = 512;
const CANVAS_HEIGHT = canvas.height = 512;
const DIMENSION = 8;
const SQUARE_SIZE = 64;

const colors = { light: '#f5f5f5', dark: '#2c2c2c' };
const images = {};

const chess = new Chess();

let validMoves = chess.getValidMoves();
let playerClicks = [];

/* FUNCTIONS */

const loadImages = () => {
    // Load all images
    const pieces = chess.pieces;
    pieces.forEach(piece => {
        var image = new Image(SQUARE_SIZE, SQUARE_SIZE);
        image.onload = () => {
            drawGameState();
        };
        image.src = `./assets/images2/${piece}.png`;
        images[piece] = image;
    })
}

const drawBoard = () => {
    for (let row = 0; row < DIMENSION; row++) {
        for (let col = 0; col < DIMENSION; col++) {
            const color = (row + col) % 2 === 0 ? colors.light : colors.dark;
            ctx.fillStyle = color;
            ctx.fillRect(row * SQUARE_SIZE, col * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
        }
    }
}

const drawPieces = (board) => {
    for (let row = 0; row < DIMENSION; row++) {
        for (let col = 0; col < DIMENSION; col++) {
            const piece = board[row][col];
            if (piece !== '--') {
                const x = col * SQUARE_SIZE;
                const y = row * SQUARE_SIZE;
                ctx.drawImage(images[piece], x, y, SQUARE_SIZE, SQUARE_SIZE);
            }
        }
    }
}

const drawGameState = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawBoard();
    drawPieces(chess.board);
}

const getIndexesFromPosition = (posX, posY) => {
    const col = Math.floor(posX / SQUARE_SIZE);
    const row = Math.floor(posY / SQUARE_SIZE);
    return [ row, col ];
}

/* SOCKET EXAMPLE */

// const socket = new Socket();
// document.addEventListener('keyup', (e) => {
//     if (e.key === 'c') {
//         socket.createRoom();
//         console.log(socket.roomID);
//     } else if (e.key === 'j') {
//         id = prompt('Enter room id');
//         socket.joinRoom(id);
//     }
// })
// canvas.addEventListener('click', () => socket.emitGameState(chess.board));
// socket.onGameState(gameState => console.log(gameState));



/* MAIN FUNCTION */

const main = () => {
    loadImages();
    canvas.addEventListener('click', (e) => {
        let squareSelected = getIndexesFromPosition(e.offsetX, e.offsetY);
        if (playerClicks.includes(squareSelected)) {
            squareSelected = null;
            playerClicks = [];
        } else {
            playerClicks.push(squareSelected);
        }
        if (playerClicks.length === 2) {
            const move = new Move(playerClicks[0], playerClicks[1], chess.board);
            if (validMoves.some(validMove => _.isEqual(validMove, move))) {
                chess.makeMove(move);
                playerClicks = [];
                console.log(chess.board);
                drawGameState();
                validMoves = chess.getValidMoves();
            }
        }
    })
    /*  UNDO A MOVE */
    /*
    document.addEventListener('keyup', (e) => {
        if (e.key === 'z') {
            chess.undoMove();
            drawGameState();
        }
    }) 
    */
}

main();
