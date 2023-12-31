import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ColorPicker from '../components/ColorPicker';
import Range from '../components/Range';
import { useImgSrcContext } from '../hooks/useImgSrcContext';
import MainLayout from '../layouts/MainLayout';
import { initCanvas } from '../utils/initCanvas';

const Draw = () => {
	const { src, setSrc } = useImgSrcContext();

	const [can, setCan] = useState<fabric.Canvas | null>(null);
	const canvasEl = useRef<HTMLCanvasElement>(null);

	const navigate = useNavigate();

	useEffect(() => {
		const canvas = new fabric.Canvas(canvasEl.current);
		canvas.isDrawingMode = true;

		if (src) {
			fabric.Image.fromURL(src, img => {
				initCanvas(img, canvas);
				setCan(canvas);
			});
		}
		return () => {
			canvas.dispose();
		};
	}, [src]);

	const onSave = () => {
		if (can) {
			const newSrc = can.toDataURL();
			setSrc(newSrc);
			navigate('/');
		}
	};

	return (
		<MainLayout onSave={onSave} onCancel={() => navigate('/')}>
			<canvas ref={canvasEl} />
			{can && (
				<div>
					<ColorPicker
						initColor={can.freeDrawingBrush.color}
						cb={color => (can.freeDrawingBrush.color = color)}
					/>
					<Range
						className="mt-3 w-full"
						min={0}
						max={50}
						step={1}
						initVal={can.freeDrawingBrush.width}
						rangeCb={val => (can.freeDrawingBrush.width = val)}
					/>
				</div>
			)}
		</MainLayout>
	);
};

export default Draw;
