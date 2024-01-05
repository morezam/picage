import { fabric } from 'fabric';
import { useCallback, useEffect, useRef, useState } from 'react';
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

	const imageToCanvas = useCallback(
		(canvas: fabric.Canvas) => {
			if (src) {
				fabric.Image.fromURL(src, img => {
					initCanvas(img, canvas);
					setCan(canvas);
				});
			}
		},
		[src]
	);

	useEffect(() => {
		const canvas = new fabric.Canvas(canvasEl.current);
		canvas.isDrawingMode = true;

		imageToCanvas(canvas);

		window.addEventListener('resize', () => {
			imageToCanvas(canvas);
		});
		return () => {
			canvas.dispose();
		};
	}, [imageToCanvas]);

	const onSave = () => {
		if (can) {
			can.viewportTransform = [1, 0, 0, 1, 0, 0];
			const newSrc = can.toDataURL();
			setSrc(newSrc);
			navigate('/');
		}
	};

	return (
		<MainLayout onSave={onSave} onCancel={() => navigate('/')}>
			<canvas ref={canvasEl} />
			{can && (
				<div className="z-10">
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
