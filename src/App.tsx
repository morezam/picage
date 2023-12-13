import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ImageInput from './ImageInput';

function App() {
	const [imgSrc, setImgSrc] = useState(() => {
		const src = localStorage.getItem('img');
		return src ? src : '';
	});

	const canRef = useRef<HTMLCanvasElement>();

	useEffect(() => {
		const canvas = document.querySelector('canvas') as HTMLCanvasElement;
		const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

		const img = new Image();

		img.onload = function () {
			canvas.width = img.width;
			canvas.height = img.height;

			ctx.drawImage(
				img,
				ctx.lineWidth / 2,
				ctx.lineWidth / 2,
				canvas.width - ctx.lineWidth,
				canvas.height - ctx.lineWidth
			);
		};
		img.src = imgSrc;
	}, [imgSrc]);

	const onLinkClick = () => {
		console.log('he');
	};

	return (
		<>
			<ImageInput setImgSrc={setImgSrc} />
			<Link to={`/photo`} onClick={onLinkClick}>
				See Photo
			</Link>
			<canvas ref={canRef}></canvas>
		</>
	);
}

export default App;
