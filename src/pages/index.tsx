import { useState, useEffect, useRef } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { useNavigate } from 'react-router-dom';
import { FaUndo, FaRedo } from 'react-icons/fa';
import ImageInput from '../components/ImageInput';
import ImageDownload from '../components/ImageDownload';
import { useImgSrcContext } from '../hooks/useImgSrcContext';
import { redoPossible, undoPossible } from '../utils/db';
import { MdOutlineCancel } from 'react-icons/md';
import { fabric } from 'fabric';

const Home = () => {
	const [imgName] = useState(() => {
		const imgName = localStorage.getItem('imgName');
		return imgName ? imgName : null;
	});

	const [undoable, setUndoable] = useState(false);
	const [redoable, setRedoable] = useState(false);

	const [can, setCan] = useState<fabric.Canvas | null>(null);

	const navigate = useNavigate();

	const { src, undo, redo } = useImgSrcContext();

	const canvasEl = useRef<HTMLCanvasElement>(null);

	undoPossible().then(val => setUndoable(val));
	redoPossible().then(val => setRedoable(val));

	useEffect(() => {
		const canvas = new fabric.Canvas(canvasEl.current);

		src &&
			fabric.Image.fromURL(src, img => {
				img.selectable = false;
				const windowWidth = window.innerWidth;
				const maxWidth = Math.min(500, windowWidth);
				const width = img.width as number;
				const height = img.height as number;

				const bigger = Math.max(width, height);
				const scale = maxWidth / bigger;

				const oneDecimalScale = scale.toFixed(2);

				const transform = `translate(0,0) rotate(0) skewX(0) skewY(0) scaleX(${oneDecimalScale}) scaleY(${oneDecimalScale})`;

				canvas.setDimensions({ width, height });
				const container = document.querySelector(
					`.${canvas.containerClass}`
				) as HTMLDivElement;
				container.style.width = width + 'px';
				container.style.height = height + 'px';
				container.style.transform = transform;
				container.classList.add(`origin-top`);

				canvas.add(img);

				setCan(canvas);
			});

		return () => {
			canvas.dispose();
		};
	}, [src]);

	// useEffect(() => {
	// 	const canvas = canvasEl.current;
	// 	if (canvas) {
	// 		const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

	// 		const img = new Image();

	// 		img.onload = function () {
	// 			canvas.width = img.width;
	// 			canvas.height = img.height;

	// 			ctx.drawImage(
	// 				img,
	// 				ctx.lineWidth / 2,
	// 				ctx.lineWidth / 2,
	// 				canvas.width - ctx.lineWidth,
	// 				canvas.height - ctx.lineWidth
	// 			);
	// 		};
	// 		if (src) img.src = src;

	// 		setCan(canvas);
	// 	}
	// }, [src]);

	return (
		<>
			{src ? (
				<div className="flex flex-col max-h-screen pb-2 items-center pt-5 max-w-3xl mx-auto">
					<div className="flex text-2xl mb-3 flex-row-reverse justify-between w-full px-3 ">
						{imgName && (
							<ImageDownload originalFilename={imgName} canvas={can} />
						)}
						<div className="flex gap-4">
							<button
								disabled={!undoable}
								className={`${!undoable ? 'text-gray-400' : 'text-gray-950'}`}
								onClick={() => undo()}>
								<FaUndo />
							</button>
							<button
								disabled={!redoable}
								className={`${!redoable ? 'text-gray-400' : 'text-gray-950'}`}
								onClick={() => redo()}>
								<FaRedo />
							</button>
						</div>
						<button title="cancel">
							<MdOutlineCancel />
						</button>
					</div>

					<canvas ref={canvasEl} />
					<Tabs className="flex flex-col-reverse mr-2" defaultIndex={-1}>
						<TabList className="flex">
							<Tab onClick={() => navigate('/crop')}>Crop</Tab>
							<Tab onClick={() => navigate('/text')}>Text</Tab>
							<Tab onClick={() => navigate('/draw')}>Draw</Tab>
							<Tab onClick={() => navigate('/square')}>Square</Tab>
							<Tab onClick={() => navigate('/filters')}>Filters</Tab>
						</TabList>

						<TabPanel></TabPanel>
						<TabPanel></TabPanel>
						<TabPanel></TabPanel>
						<TabPanel></TabPanel>
						<TabPanel></TabPanel>
					</Tabs>
				</div>
			) : (
				<ImageInput />
			)}
		</>
	);
};

export default Home;
