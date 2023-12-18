import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import ColorPicker from '../components/ColorPicker';
import { calculateAspectRatioFit } from '../utils/calculateAspectRatioFit';
import Range from '../components/Range';
import { useImgInfoContext } from '../context/imgInfoContext';

const Text = () => {
	const { imgInfo, setImgInfo } = useImgInfoContext();

	const [text, setText] = useState<fabric.Textbox | null>(null);
	const [can, setCan] = useState<fabric.Canvas | null>(null);
	const [strokeColor, setStrokeColor] = useState('#fff');
	const canvasEl = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = new fabric.Canvas(canvasEl.current);

		fabric.Image.fromURL(imgInfo.src, img => {
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
	}, [imgInfo.src]);

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
			setImgInfo({ ...imgInfo, src: newSrc });
		}
	};

	return (
		<>
			<div className="flex justify-between pl-10 bg-slate-200">
				<canvas ref={canvasEl} />
				<Tabs className="flex flex-row-reverse mr-2">
					<TabList className="flex flex-col">
						<Tab>Color</Tab>
						<Tab>Stroke</Tab>
						<Tab>Background</Tab>
					</TabList>

					<TabPanel>
						<ColorPicker
							cb={color => textRender(text => (text.fill = color))}
						/>
					</TabPanel>
					<TabPanel>
						<ColorPicker
							cb={color =>
								textRender(text => {
									setStrokeColor(color);
									text.stroke = color;
								})
							}
						/>
						<Range
							min={0}
							max={10}
							step={1}
							rangeCb={val =>
								textRender(text => {
									text.stroke = strokeColor;
									text.strokeWidth = val;
								})
							}
						/>
					</TabPanel>
					<TabPanel>
						<ColorPicker
							cb={color => textRender(text => (text.backgroundColor = color))}
						/>
					</TabPanel>
				</Tabs>
			</div>
			<button onClick={onSave}>save</button>
		</>
	);
};

export default Text;
