import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ImageInput from '../components/ImageInput';
import { useImgInfoContext } from '../context/imgInfoContext';
import ImageDownload from '../components/ImageDownload';

const Home = () => {
	const { imgInfo } = useImgInfoContext();

	const canvasEl = useRef<HTMLCanvasElement>(null);

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
		img.src = imgInfo.src;
	}, [imgInfo.src]);

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

			<ImageDownload
				originalFilename={imgInfo.name}
				canvas={canvasEl.current}
			/>
		</>
	);
};

export default Home;
