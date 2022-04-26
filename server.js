//import
const express = require('express');
const app = express();
const port = 3000;

//Static files
app.use(express.static('Game/Новая папка'));
app.use('/css', express.static(__dirname + '/Game/Новая папка/style.css'));
app.use('/js', express.static(__dirname + '/Game/Новая папка/style.js'));
app.use('/png', express.static(__dirname + '/Game/Новая папка/TicTacToe-Logo.png'));

app.get('', (req, res) => {
  res.sendFile(__dirname + '/Game/Новая папка/index-TicTacToe.html');
})

//listen on port 3000
app.listen(port, () => console.log(`listen port ${port}`));
