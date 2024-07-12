export const Forward = ({ jumpTo, currentMove }) => {
	return (
		<button className="info_forward info_button" onClick={() => jumpTo(currentMove + 1)}>
			▶️
		</button>
	);
};
