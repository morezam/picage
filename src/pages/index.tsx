import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ImageInput from '../components/ImageInput';
import ImageDownload from '../components/ImageDownload';
import { useImgSrcContext } from '../hooks/useImgSrcContext';
import { redoPossible, undoPossible } from '../utils/db';

const Home = () => {
	const [imgName] = useState(() => {
		const imgName = localStorage.getItem('imgName');
		return imgName ? imgName : null;
	});

	const [undoable, setUndoable] = useState(false);
	const [redoable, setRedoable] = useState(false);

	const { src, undo, redo } = useImgSrcContext();

	const canvasEl = useRef<HTMLCanvasElement>(null);

	undoPossible().then(val => setUndoable(val));
	redoPossible().then(val => setRedoable(val));

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

			<div className="flex gap-4">
				<button disabled={!undoable} onClick={() => undo()}>
					undo
				</button>
				<button disabled={!redoable} onClick={() => redo()}>
					redo
				</button>
			</div>

			{imgName && (
				<ImageDownload originalFilename={imgName} canvas={canvasEl.current} />
			)}
		</>
	);
};

export default Home;
