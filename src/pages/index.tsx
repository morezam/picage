import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ImageInput from '../components/ImageInput';

const Home = () => {
	const [imgSrc, setImgSrc] = useState(() => {
		const src = localStorage.getItem('img');
		return src ? src : '';
	});

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

	return (
		<>
			<ImageInput setImgSrc={setImgSrc} />
			<Link to={`/crop`}>Crop</Link>
			<div>
				<Link to={`/text`}>text</Link>
			</div>
			<div>
				<Link to={`/draw`}>draw</Link>
			</div>
			<div>
				<canvas></canvas>
			</div>
		</>
	);
};

export default Home;
