import { Square } from '../Square';

export const Board = ({ xIsNext, squares, onPlay, calculateWinner }) => {
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

	const listSquare = Array(9).fill({});
	return [
		<>
			<div className="status">{status}</div>
			<div className="board">
				{listSquare.map((item, index) => (
					<Square
						key={index}
						classNameSquare={classNameSquare}
						value={squares[index]}
						onSquareClick={() => handleClick(index)}
					/>
				))}
			</div>
		</>,
	];
};
