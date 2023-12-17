import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import ColorPicker from '../components/ColorPicker';
import { Tabs, Tab } from '../components/tab';
import { calculateAspectRatioFit } from '../utils/calculateAspectRatioFit';
import Range from '../components/Range';

const Draw = () => {
	const [imgSrc] = useState(() => {
		const src = localStorage.getItem('img');
		return src ? src : '';
	});
	const [can, setCan] = useState<fabric.Canvas | null>(null);
	const canvasEl = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = new fabric.Canvas(canvasEl.current);

		canvas.isDrawingMode = true;

		fabric.Image.fromURL(imgSrc, img => {
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
	}, [imgSrc]);

	const onSave = () => {
		if (can) {
			const newSrc = can.toDataURL();
			localStorage.setItem('img', newSrc);
		}
	};

	return (
		<>
			<div className="flex justify-between pl-10 bg-slate-200">
				<canvas ref={canvasEl} />
				<Tabs>
					<Tab title="color">
						<>
							<ColorPicker
								cb={color => {
									if (can) {
										can.freeDrawingBrush.color = color;
									}
								}}
							/>
							<Range
								rangeCb={val => {
									if (can) {
										can.freeDrawingBrush.width = val;
									}
								}}
							/>
						</>
					</Tab>
					<div></div>
				</Tabs>
			</div>
			<button onClick={onSave}>save</button>
		</>
	);
};

export default Draw;
