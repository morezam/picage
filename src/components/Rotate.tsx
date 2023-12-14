import { useState } from 'react';

const Rotate = ({ cropper }: { cropper: Cropper }) => {
	const [rotData, setRotData] = useState(0);

	const onRotate = () => {
		cropper.rotate(90);
		const rotData = cropper.getData().rotate as number;
		setRotData(rotData);
	};

	return (
		<button
			onClick={onRotate}
			className={`${rotData !== 0 ? 'bg-orange-400' : ''}`}>
			rotate
		</button>
	);
};

export default Rotate;
