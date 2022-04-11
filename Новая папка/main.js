//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Declared Variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//field
let field = document.getElementById('game_field');

//cells
let cells = document.querySelectorAll('.game-field_cell');

//cross & circle
let cross = document.querySelector('#cross').outerHTML;
let circle = document.querySelector('#circle').outerHTML;

//Ход игрока:
let moveOfPlayer = document.querySelector('.moveOfPlayers');

//name of players
const playerOne = { name: "Mr. X" };
const playerTwo = { name: "Mr. O" };
playerOne.name = ( (prompt('Who goes for the cross?'))  ||  (playerOne.name = "Mr. X")	);
playerTwo.name = ( (prompt('Who goes for the circle?'))  ||  (playerTwo.name = 'Mr. O') );

//isPlayerOneFirst
let isPlayerOneFirst = true;

//Проверка на ничью
let isWin = true;

//reset
let reset = document.querySelector('.reset-button');

//winPositions
let winPositions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
];

//field
let fieldArray = ["null", "null", "null", "null", "null", "null", "null", "null", "null"];



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~The Game~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class TicTacToe {

		players = [];

    constructor(playerOneInfo, playerTwoInfo) {
        this.players = [
					  {info: playerOneInfo, symbol: "X"},
					  {info: playerTwoInfo, symbol: "O"}
        ];
    }

};

//получаем массив всех клеток поля (idx of clicked cell)
const fields = Array.from(document.querySelectorAll('.game-field_cell'));

//index нажатой клетки объявляется вне циклов и функций,
//	в дальнейшем через него меняется индекс у массива с ходами (fieldArray)
let idxField;

//смена хода, вывод индекса нажатой клетки и присвоение соответствующему индексу в массиве ходов (fieldArray)
window.onload = function () {

	new TicTacToe(playerOne, playerTwo);
	for (const cell of fields) {
			cell.onclick = () => {
					//index нажатой клетки
					 idxField = fields.indexOf(cell);
					 cell.style.pointerEvents='none';
			}
	};

	let move = 0;
	moveOfPlayer.innerHTML = "Ход игрока: " + playerOne.name;

	field.onclick = function (event) {
			if (event.target.className == 'game-field_cell') {
					if (move % 2 == 0 && move < 9) {
						event.target.innerHTML = cross;
						fieldArray[idxField] = 'X';
						moveOfPlayer.innerHTML = "Ход игрока: " + playerTwo.name;
					} else if (move % 2 != 0 && move < 9){
						event.target.innerHTML = circle;
						fieldArray[idxField] = 'O';
						moveOfPlayer.innerHTML = "Ход игрока: " + playerOne.name;
					}
					move++;
					if (move == 9) {
						isWin = false;
					}
					checkWinner();
			}
	 };
};

//check all moves (winPositions)
let checkWinner = function() {
		for (let i = 0; i < winPositions.length; i++) {

		    for (let j = 0; j < 3; j++) {
		        var elem0 = fieldArray[winPositions[i][0]];
		        var elem1 = fieldArray[winPositions[i][1]];
		        var elem2 = fieldArray[winPositions[i][2]];
		        var combinations = elem0 + elem1 + elem2;
		    };

				if ( combinations.includes('OOO') ) {
					field.style.pointerEvents='none';
					moveOfPlayer.innerHTML = playerTwo.name + ' is win!';
					break;
				} else if ( combinations.includes('XXX') ) {
					field.style.pointerEvents='none';
					moveOfPlayer.innerHTML = playerOne.name + ' is win!';
					break;
				} else if (		( !(combinations.includes('OOO'))  ||  !(combinations.includes('XXX')) )	&& (isWin == false)	) {
					moveOfPlayer.innerHTML = 'Ничья!';
					field.style.pointerEvents='none';
				}
		};
};

//reset
reset.onclick = () => {
		 location.reload();
		 new TicTacToe(playerOne, playerTwo);
}
