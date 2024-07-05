import Square from './Square';

export default function Board({ xIsNext, squares, onPlay }) {
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

	const handleClick = (index) => {
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
	};
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
				return squares[a];
			}
		}
		if (!squares.some((element) => element === null)) {
			return 'Ничья';
		}
		return null;
	}
	const listSquare = Array(9).fill({});
	return (
		<>
			<div className="status">{status}</div>
			<div className="board">
				{listSquare.map((item, i) => (
					<Square classNameSquare={classNameSquare} value={squares[i]} onSquareClick={() => handleClick(i)} />
				))}
			</div>
		</>
	);
}
