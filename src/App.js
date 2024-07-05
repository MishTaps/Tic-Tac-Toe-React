import { useState } from 'react';
import Board from './components/Board';

export default function Game() {
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

	const moves = history.map((squares, move) => {
		let description;
		if (move > 0) {
			description = `Ход №${move}`;
			return (
				<button className="info_history" key={move} onClick={() => jumpTo(move)}>
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
					<button className="info_revert info_button" onClick={() => jumpTo(0)}>
						🔄
					</button>
				</div>
				<div className="game-info-table">
					<button className="info_back info_button" onClick={() => jumpTo(currentMove - 1)}>
						◀️
					</button>
					<button className="info_forward info_button" onClick={() => jumpTo(currentMove + 1)}>
						▶️
					</button>
					{moves}
				</div>
			</div>
		</div>
	);
}
