import { useState } from 'react';

function Square({ classNameSquare, value, onSquareClick }) {
	return (
		<button className={classNameSquare} onClick={onSquareClick}>
			{value}
		</button>
	);
}

function Board({ xIsNext, squares, onPlay }) {
	const winner = calculateWinner(squares);
	let status;
	let classNameSquare = 'square';
	if (winner == 'X' || winner == '0') {
		status = `Победитель: ${winner}`;
		classNameSquare += ` winner`;
	} else if (winner == 'Ничья') {
		status = `Ничья...`;
	} else {
		status = `Следующий игрок: ${xIsNext ? 'X' : 'O'}`;
	}

	function handleClick(index) {
		if (squares[index] || winner) {
			return;
		}
		const nextSquares = squares.slice();
		if (xIsNext) {
			nextSquares[index] = 'X';
		} else {
			nextSquares[index] = '0';
		}
		onPlay(nextSquares);
	}
	return (
		<>
			<div className="status">{status}</div>
			<div className="board">
				<Square classNameSquare={classNameSquare} value={squares[0]} onSquareClick={() => handleClick(0)} />
				<Square classNameSquare={classNameSquare} value={squares[1]} onSquareClick={() => handleClick(1)} />
				<Square classNameSquare={classNameSquare} value={squares[2]} onSquareClick={() => handleClick(2)} />
				<Square classNameSquare={classNameSquare} value={squares[3]} onSquareClick={() => handleClick(3)} />
				<Square classNameSquare={classNameSquare} value={squares[4]} onSquareClick={() => handleClick(4)} />
				<Square classNameSquare={classNameSquare} value={squares[5]} onSquareClick={() => handleClick(5)} />
				<Square classNameSquare={classNameSquare} value={squares[6]} onSquareClick={() => handleClick(6)} />
				<Square classNameSquare={classNameSquare} value={squares[7]} onSquareClick={() => handleClick(7)} />
				<Square classNameSquare={classNameSquare} value={squares[8]} onSquareClick={() => handleClick(8)} />
			</div>
		</>
	);
}

export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];

	function handlePlay(nextSquares) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function jumpTo(nextMove) {
		if (nextMove >= moves.length || nextMove < 0) {
			return;
		}
		setCurrentMove(nextMove);
	}

	const moves = history.map((squares, move) => {
		let description;
		if (move > 0) {
			description = `Ход №${move}`;
			return (
				<button class="info_history" key={move} onClick={() => jumpTo(move)}>
					{description}
				</button>
			);
		}
	});

	return (
		<div className="game">
			<div className="game-board">
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<div className="game-info">
				<div className="game-info-revert">
					<button class="info_revert info_button" onClick={() => jumpTo(0)}>
						🔄
					</button>
				</div>
				<div className="game-info-table">
					<button class="info_back info_button" onClick={() => jumpTo(currentMove - 1)}>
						◀️
					</button>
					<button class="info_forward info_button" onClick={() => jumpTo(currentMove + 1)}>
						▶️
					</button>
					{moves}
				</div>
			</div>
		</div>
	);
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			console.log(squares[a]);
			return squares[a];
		}
	}
	if (!squares.some((element) => element === null)) {
		return 'Ничья';
	}
	return null;
}
