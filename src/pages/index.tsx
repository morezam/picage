import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ImageInput from '../components/ImageInput';
import ImageDownload from '../components/ImageDownload';
import { useImgSrcContext } from '../hooks/useImgSrcContext';

const Home = () => {
	const [imgName] = useState(() => {
		const imgName = localStorage.getItem('imgName');
		return imgName ? imgName : null;
	});

	const { src } = useImgSrcContext();

	const canvasEl = useRef<HTMLCanvasElement>(null);

	console.log('rerender from index.ts');

	useEffect(() => {
		const canvas = canvasEl.current as HTMLCanvasElement;
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
		if (src) img.src = src;
	}, [src]);

	return (
		<>
			<ImageInput />
			<Link to={`/crop`}>Crop</Link>
			<div>
				<Link to={`/text`}>text</Link>
			</div>
			<div>
				<Link to={`/draw`}>draw</Link>
			</div>
			<div>
				<Link to={`/square`}>square</Link>
			</div>
			<div>
				<Link to={`/filters`}>filters</Link>
			</div>
			<div>
				<canvas ref={canvasEl}></canvas>
			</div>

			{imgName && (
				<ImageDownload originalFilename={imgName} canvas={canvasEl.current} />
			)}
		</>
	);
};

export default Home;
