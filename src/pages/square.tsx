import { useEffect, useRef, useCallback } from 'react';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import Grade from 'grade-js';
import ColorPicker from '../components/ColorPicker';
import { parseLinearGradient } from '../utils/parseLinearGradient';
import { useImgSrcContext } from '../hooks/useImgSrcContext';
import MainLayout from '../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';

const Square = () => {
	const { src, setSrc } = useImgSrcContext();

	const navigate = useNavigate();

	const canvasEl = useRef<HTMLCanvasElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);

	const makeCanvas = useCallback(() => {
		const canvas = canvasEl.current as HTMLCanvasElement;
		const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		const wrapper = wrapperRef.current as HTMLDivElement;
		const imgEl = imgRef.current as HTMLImageElement;
		const img = new Image();

		img.onload = function () {
			const { width, height } = img;

			const windowWidth = window.innerWidth;

			const maxWidth = Math.min(500, windowWidth);

			const bigger = Math.max(width, height);

			canvas.width = bigger;
			canvas.height = bigger;

			const scale = maxWidth / bigger;

			const oneDecimalScale = Math.floor(scale * 10) / 10;

			wrapper.style.width = bigger * oneDecimalScale + 'px';
			wrapper.style.height = bigger * oneDecimalScale + 'px';

			imgEl.style.width = width * oneDecimalScale + 'px';
			imgEl.style.height = height * oneDecimalScale + 'px';

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
		};
		if (src) img.src = src;
	}, [src]);

	useEffect(() => {
		if (src) {
			makeCanvas();
		}

		window.addEventListener('resize', () => {
			if (src) {
				makeCanvas();
			}
		});
	}, [makeCanvas, src]);

	const onSave = () => {
		const canvas = canvasEl.current as HTMLCanvasElement;
		const newSrc = canvas.toDataURL();
		setSrc(newSrc);
		navigate('/');
	};

	const handleGradient = () => {
		if (wrapperRef.current) {
			wrapperRef.current.style.backgroundColor = 'transparent';
		}
		Grade(wrapperRef.current);
		makeCanvas();
	};

	return (
		<MainLayout onSave={onSave} onCancel={() => navigate('/')}>
			<div ref={wrapperRef} className="flex justify-center items-center">
				<img src={src} ref={imgRef} />
			</div>
			<canvas ref={canvasEl} className="hidden" />
			<Tabs className="flex flex-col mr-2">
				<TabList className="flex justify-center mb-5">
					<Tab>Color</Tab>
					<Tab onClick={handleGradient}>Gradient</Tab>
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
				<TabPanel></TabPanel>
			</Tabs>
		</MainLayout>
	);
};

export default Square;
