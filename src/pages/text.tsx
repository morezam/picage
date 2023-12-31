import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import ColorPicker from '../components/ColorPicker';
import Range from '../components/Range';
import { useImgSrcContext } from '../hooks/useImgSrcContext';
import MainLayout from '../layouts/MainLayout';
import { initCanvas } from '../utils/initCanvas';

const Text = () => {
	const { src, setSrc } = useImgSrcContext();

	const navigate = useNavigate();

	const [text, setText] = useState<fabric.Textbox | null>(null);
	const [can, setCan] = useState<fabric.Canvas | null>(null);
	const [strokeColor, setStrokeColor] = useState('#fff');
	const canvasEl = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = new fabric.Canvas(canvasEl.current);

		src &&
			fabric.Image.fromURL(src, img => {
				initCanvas(img, canvas);

				const text = new fabric.Textbox('Type...', {
					left: (img.width as number) / 2,
					top: (img.height as number) / 2,
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
	}, [src]);

	const textRender = (textCb: (text: fabric.Textbox) => void) => {
		if (text) {
			textCb(text);
			text.dirty = true;
			can?.renderAll();
		}
	};

	const onSave = () => {
		if (can) {
			const newSrc = can.toDataURL({ quality: 1 });
			setSrc(newSrc);
			navigate('/');
		}
	};

	return (
		<MainLayout onSave={onSave} onCancel={() => navigate('/')}>
			<canvas ref={canvasEl} />
			<Tabs className="flex flex-col-reverse mr-2">
				<TabList className="flex">
					<Tab>Color</Tab>
					<Tab>Stroke</Tab>
					<Tab>Background</Tab>
				</TabList>

				<TabPanel>
					<ColorPicker
						initColor="rgba(0,0,0,1)"
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
		</MainLayout>
	);
};

export default Text;
