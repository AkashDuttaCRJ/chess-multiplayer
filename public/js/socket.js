class Socket {
    constructor() {
        this.socket = io();
        this.roomID = null;
    }

    #generateRandomId () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 8; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    generateSharableLink() {
        return this.roomID && window.location.origin + '/join' + '?id=' + this.roomID;
    }

    createRoom() {
        this.roomID = this.#generateRandomId();
        this.socket.emit('create-room', this.roomID);
    }

    joinRoom(roomID) {
        this.roomID = roomID;
        this.socket.emit('join-room', this.roomID);
    }

    emitGameState(gameState) {
        this.socket.emit('update-gs', {room: this.roomID, gameState});
    }

    onGameState(callback) {
        this.socket.on('updated-gs', callback);
    }
}