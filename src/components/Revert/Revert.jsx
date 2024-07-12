export const Revert = ({ jumpTo }) => {
	return (
		<button className="info_revert info_button" onClick={() => jumpTo(0)}>
			🔄
		</button>
	);
};
