import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import ColorPicker from '../components/ColorPicker';
import { Tabs, Tab } from '../components/tab';
import { calculateAspectRatioFit } from '../utils/calculateAspectRatioFit';
import Range from '../components/Range';

const Text = () => {
	const [imgSrc] = useState(() => {
		const src = localStorage.getItem('img');
		return src ? src : '';
	});
	const [text, setText] = useState<fabric.Textbox | null>(null);
	const [can, setCan] = useState<fabric.Canvas | null>(null);
	const [strokeColor, setStrokeColor] = useState('#fff');
	const canvasEl = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = new fabric.Canvas(canvasEl.current);

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
			const scale = maxWidth / width;
			img.set({ scaleX: scale, scaleY: scale });
			canvas.setDimensions({ width: newWidth, height: newHeight });
			canvas.add(img);

			const text = new fabric.Textbox('Type...', {
				left: newWidth / 2,
				top: newHeight / 2,
				fontSize: 70,
				originX: 'center',
				originY: 'center',
			});
			text.fill = '#fff';
			setText(text);
			canvas.add(text);
			canvas.setActiveObject(text);

			canvas.renderAll();

			setCan(canvas);
		});

		return () => {
			canvas.dispose();
		};
	}, [imgSrc]);

	const textRender = (textCb: (text: fabric.Textbox) => void) => {
		if (text) {
			textCb(text);
			text.dirty = true;
			can?.renderAll();
		}
	};

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
						<ColorPicker
							cb={color => textRender(text => (text.fill = color))}
						/>
					</Tab>
					<Tab title="stroke">
						<div>
							<ColorPicker
								cb={color =>
									textRender(text => {
										setStrokeColor(color);
										text.stroke = color;
									})
								}
							/>
							<Range
								rangeCb={val =>
									textRender(text => {
										text.stroke = strokeColor;
										text.strokeWidth = val;
									})
								}
							/>
						</div>
					</Tab>
					<Tab title="background">
						<ColorPicker
							cb={color => textRender(text => (text.backgroundColor = color))}
						/>
					</Tab>
				</Tabs>
			</div>
			<button onClick={onSave}>save</button>
		</>
	);
};

export default Text;
