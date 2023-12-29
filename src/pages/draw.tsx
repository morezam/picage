import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import { MdDownloadDone, MdOutlineCancel } from 'react-icons/md';
import Modal from 'react-modal';
import ColorPicker from '../components/ColorPicker';
import Range from '../components/Range';
import { useImgSrcContext } from '../hooks/useImgSrcContext';

Modal.setAppElement('#modal');

const Draw = () => {
	const { src, setSrc } = useImgSrcContext();

	const [can, setCan] = useState<fabric.Canvas | null>(null);
	const canvasEl = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = new fabric.Canvas(canvasEl.current);

		canvas.isDrawingMode = true;

		src &&
			fabric.Image.fromURL(src, img => {
				const windowWidth = window.innerWidth;
				img.selectable = false;

				const maxWidth = Math.min(500, windowWidth);
				const width = img.width as number;
				const height = img.height as number;

				const bigger = Math.max(width, height);

				const scale = maxWidth / bigger;

				const oneDecimalScale = Math.floor(scale * 10) / 10;

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

	const onSave = () => {
		if (can) {
			const newSrc = can.toDataURL();
			setSrc(newSrc);
		}
	};

	return (
		<>
			<div className="flex flex-col max-h-screen pb-2 items-center pt-5 max-w-3xl mx-auto">
				<div className="flex text-2xl mb-3 flex-row-reverse justify-between w-full px-3 ">
					<button onClick={onSave} title="save">
						<MdDownloadDone />
					</button>
					<button title="cancel">
						<MdOutlineCancel />
					</button>
				</div>
				<canvas ref={canvasEl} />
				<div className="">
					<ColorPicker
						initColor={can?.freeDrawingBrush.color}
						cb={color => {
							if (can) {
								can.freeDrawingBrush.color = color;
							}
						}}
					/>
					<Range
						className="mt-3 w-full"
						min={0}
						max={50}
						step={1}
						initVal={can?.freeDrawingBrush.width}
						rangeCb={val => {
							if (can) {
								can.freeDrawingBrush.width = val;
							}
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default Draw;
