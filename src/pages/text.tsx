import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import ColorPicker from '../components/ColorPicker';
import Range from '../components/Range';
import { useImgSrcContext } from '../hooks/useImgSrcContext';
import { MdDownloadDone, MdOutlineCancel } from 'react-icons/md';

const Text = () => {
	const { src, setSrc } = useImgSrcContext();

	const [text, setText] = useState<fabric.Textbox | null>(null);
	const [can, setCan] = useState<fabric.Canvas | null>(null);
	const [strokeColor, setStrokeColor] = useState('#fff');
	const canvasEl = useRef<HTMLCanvasElement>(null);

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

				const text = new fabric.Textbox('Type...', {
					left: width / 2,
					top: height / 2,
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
			</div>
			<button onClick={onSave}>save</button>
		</>
	);
};

export default Text;
