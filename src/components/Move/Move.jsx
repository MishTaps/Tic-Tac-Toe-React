export const Move = ({ move, jumpTo }) => {
	return (
		<button className="info_history" key={move} onClick={() => jumpTo(move)}>
			{`Ход №${move}`}
		</button>
	);
};
