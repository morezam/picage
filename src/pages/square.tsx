import { useEffect, useRef, useCallback } from 'react';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import Grade from 'grade-js';
import ColorPicker from '../components/ColorPicker';
import { parseLinearGradient } from '../utils/parseLinearGradient';
import { useImgSrcContext } from '../hooks/useImgSrcContext';

const Square = () => {
	const { src, setSrc } = useImgSrcContext();

	const canvasEl = useRef<HTMLCanvasElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);

	const makeCanvas = useCallback(() => {
		const canvas = canvasEl.current as HTMLCanvasElement;
		const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		const wrapper = wrapperRef.current as HTMLDivElement;
		const img = imgRef.current as HTMLImageElement;

		const width = img.width;
		const height = img.height;

		canvas.width = wrapper.clientWidth;
		canvas.height = wrapper.clientHeight;

		const bgColor = getComputedStyle(wrapper).backgroundColor;
		const bgImage = getComputedStyle(wrapper).backgroundImage;

		const gradient = parseLinearGradient(
			ctx,
			bgImage,
			canvas.width,
			canvas.height
		);

		const colorOrImage = bgColor !== 'rgba(0, 0, 0, 0)' ? bgColor : gradient;

		ctx.fillStyle = colorOrImage;

		ctx.fillRect(0, 0, canvas.width, canvas.height);

		if (width > height) {
			const yStart = (width - height) / 2;
			ctx.drawImage(img, 0, yStart);
		} else if (height > width) {
			const xStart = (height - width) / 2;
			ctx.drawImage(img, xStart, 0);
		} else {
			ctx.drawImage(img, 0, 0);
		}
	}, []);

	useEffect(() => {
		const wrapper = wrapperRef.current as HTMLDivElement;
		const img = imgRef.current as HTMLImageElement;

		const width = img.width;
		const height = img.height;

		const bigger = Math.max(width, height);

		wrapper.style.width = bigger + 'px';
		wrapper.style.height = bigger + 'px';
		wrapper.style.backgroundColor = '#fff';

		makeCanvas();
	}, [makeCanvas]);

	const onSave = () => {
		const canvas = canvasEl.current as HTMLCanvasElement;
		const newSrc = canvas.toDataURL();

		setSrc(newSrc);
	};

	const handleGradient = () => {
		if (wrapperRef.current) {
			wrapperRef.current.style.backgroundColor = 'transparent';
		}
		Grade(wrapperRef.current);
		makeCanvas();
	};

	return (
		<>
			<div className="flex justify-between pl-10 bg-slate-200">
				<div ref={wrapperRef} className="flex justify-center items-center">
					{src && <img src={src} ref={imgRef} />}
				</div>
				<canvas ref={canvasEl} className="hidden" />
				<Tabs className="flex flex-row-reverse mr-2">
					<TabList className="flex flex-col">
						<Tab>Color</Tab>
						<Tab>Gradient</Tab>
					</TabList>

					<TabPanel>
						<ColorPicker
							cb={color => {
								if (wrapperRef.current) {
									wrapperRef.current.style.backgroundImage = '';
									wrapperRef.current.style.backgroundColor = color;
									makeCanvas();
								}
							}}
						/>
					</TabPanel>
					<TabPanel>
						<button onClick={handleGradient}>Create gradient background</button>
					</TabPanel>
				</Tabs>
			</div>
			<button onClick={onSave}>save</button>
		</>
	);
};

export default Square;
