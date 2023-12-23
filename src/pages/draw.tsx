import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import ColorPicker from '../components/ColorPicker';
import { calculateAspectRatioFit } from '../utils/calculateAspectRatioFit';
import Range from '../components/Range';
import { useImgSrcContext } from '../hooks/useImgSrcContext';

const Draw = () => {
	const { src, setSrc } = useImgSrcContext();

	const [can, setCan] = useState<fabric.Canvas | null>(null);
	const canvasEl = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = new fabric.Canvas(canvasEl.current);

		canvas.isDrawingMode = true;

		src &&
			fabric.Image.fromURL(src, img => {
				img.selectable = false;
				const maxWidth = 500;
				const width = img.width as number;
				const height = img.height as number;
				const { newWidth, newHeight } = calculateAspectRatioFit(
					width,
					height,
					maxWidth,
					maxWidth
				);

				const bigger = Math.max(width, height);

				const scale = maxWidth / bigger;
				img.set({ scaleX: scale, scaleY: scale });
				canvas.setDimensions({ width: newWidth, height: newHeight });
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
			<div className="flex flex-col justify-between pl-10 bg-slate-200">
				<canvas ref={canvasEl} className="w-48" />
				<div className="flex flex-col">
					<ColorPicker
						cb={color => {
							if (can) {
								can.freeDrawingBrush.color = color;
							}
						}}
					/>
					<Range
						min={0}
						max={10}
						step={1}
						rangeCb={val => {
							if (can) {
								can.freeDrawingBrush.width = val;
							}
						}}
					/>
				</div>
			</div>
			<button onClick={onSave}>save</button>
		</>
	);
};

export default Draw;
