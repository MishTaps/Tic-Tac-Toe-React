export const Square = ({ classNameSquare, value, onSquareClick }) => {
	return (
		<button className={classNameSquare} onClick={onSquareClick}>
			{value}
		</button>
	);
};
