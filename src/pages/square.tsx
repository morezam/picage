import { useEffect, useRef, useCallback, useState } from 'react';
import Modal from 'react-modal';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import Grade from 'grade-js';
import ColorPicker from '../components/ColorPicker';
import { parseLinearGradient } from '../utils/parseLinearGradient';
import { useImgSrcContext } from '../hooks/useImgSrcContext';
import { MdCancel } from 'react-icons/md';

Modal.setAppElement('#modal');

const Square = () => {
	const { src, setSrc } = useImgSrcContext();

	const canvasEl = useRef<HTMLCanvasElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);

	const [modalIsOpen, setModalIsOpen] = useState(false);

	const makeCanvas = useCallback(() => {
		const canvas = canvasEl.current as HTMLCanvasElement;
		const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		const wrapper = wrapperRef.current as HTMLDivElement;
		// const img = imgRef.current as HTMLImageElement;

		const img = new Image();

		img.onload = function () {
			const width = img.width;
			const height = img.height;

			console.log({ width, height });

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
			ctx.drawImage(img, 0, 0);

			const windowWidth = window.innerWidth;

			const maxWidth = Math.min(500, windowWidth);

			const bigger = Math.max(width, height);

			const scale = maxWidth / bigger;

			const oneDecimalScale = scale.toFixed(1);

			console.log(oneDecimalScale);

			wrapper.classList.add(`scale-[0.8]`);
		};
		if (src) img.src = src;

		// if (width > height) {
		// 	const yStart = (width - height) / 2;
		// 	ctx.drawImage(img, 0, yStart);
		// } else if (height > width) {
		// 	const xStart = (height - width) / 2;
		// 	ctx.drawImage(img, xStart, 0);
		// } else {
		// 	ctx.drawImage(img, 0, 0);
		// }
	}, [src]);

	useEffect(() => {
		const wrapper = wrapperRef.current as HTMLDivElement;
		const img = imgRef.current as HTMLImageElement;

		if (src) {
			const width = img.width;
			const height = img.height;

			const bigger = Math.max(width, height);

			wrapper.style.width = bigger + 'px';
			wrapper.style.height = bigger + 'px';
			wrapper.style.backgroundColor = '#fff';

			makeCanvas();
		}
	}, [makeCanvas, src]);

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

	function closeModal() {
		setModalIsOpen(false);
	}

	return (
		<>
			<div className="flex flex-col justify-between bg-slate-200">
				<div ref={wrapperRef} className="flex justify-center items-center">
					<img src={src} ref={imgRef} />
				</div>
				<canvas ref={canvasEl} className="hidden" />
				<Tabs className="flex flex-col mr-2">
					<TabList className="flex mb-5">
						<Tab onClick={handleGradient}>Gradient</Tab>
						<Tab onClick={() => setModalIsOpen(true)}>Color</Tab>
					</TabList>

					<TabPanel></TabPanel>
					<TabPanel></TabPanel>
				</Tabs>
				<Modal
					onRequestClose={closeModal}
					isOpen={modalIsOpen}
					className="flex flex-col pt-10  items-center max-w-[250px] mx-auto mt-10 relative">
					<button
						className="absolute right-0 top-0 text-2xl"
						onClick={closeModal}>
						<MdCancel />
					</button>
					<ColorPicker
						cb={color => {
							if (wrapperRef.current) {
								wrapperRef.current.style.backgroundImage = '';
								wrapperRef.current.style.backgroundColor = color;
								makeCanvas();
							}
						}}
					/>
				</Modal>
			</div>
			<button onClick={onSave}>save</button>
		</>
	);
};

export default Square;
