export const Back = ({ jumpTo, currentMove }) => {
	return (
		<button className="info_back info_button" onClick={() => jumpTo(currentMove - 1)}>
			◀️
		</button>
	);
};
