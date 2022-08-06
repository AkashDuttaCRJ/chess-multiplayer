const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);

// render html
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});