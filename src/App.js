import { useState } from 'react';
import { Back } from './components/Back';
import { Board } from './components/Board';
import { Forward } from './components/Forward';
import { Move } from './components/Move';
import { Revert } from './components/Revert';

export const App = () => {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];

	const handlePlay = (nextSquares) => {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	};
	const jumpTo = (nextMove) => {
		if (nextMove >= moves.length || nextMove < 0) {
			return;
		}
		setCurrentMove(nextMove);
	};
	const calculateWinner = (squares) => {
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
	};

	const moves = history.map((squares, move) => {
		if (move > 0) {
			return <Move move={move} jumpTo={jumpTo} />;
		}
	});

	return (
		<div className="game">
			<div className="game-board">
				<Board
					xIsNext={xIsNext}
					squares={currentSquares}
					onPlay={handlePlay}
					calculateWinner={calculateWinner}
				/>
			</div>
			<div className="game-info">
				<div className="game-info-revert">
					<Revert jumpTo={jumpTo} />
				</div>
				<div className="game-info-table">
					<Back jumpTo={jumpTo} currentMove={currentMove} />
					<Forward jumpTo={jumpTo} currentMove={currentMove} />
					{moves}
				</div>
			</div>
		</div>
	);
};
