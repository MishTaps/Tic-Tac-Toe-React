export default function Square({ classNameSquare, value, onSquareClick }) {
	return (
		<button className={classNameSquare} onClick={onSquareClick}>
			{value}
		</button>
	);
}
