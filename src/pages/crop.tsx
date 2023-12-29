import Cropper, { type ReactCropperElement } from 'react-cropper';
import { useRef, useEffect } from 'react';
import { useImgSrcContext } from '../hooks/useImgSrcContext';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { MdCropRotate, MdDownloadDone, MdOutlineCancel } from 'react-icons/md';
import { GrPowerReset } from 'react-icons/gr';
import { LuRectangleHorizontal, LuSquare } from 'react-icons/lu';
import { BiRectangle } from 'react-icons/bi';

const Crop = () => {
	const { src, setSrc } = useImgSrcContext();

	const cropperRef = useRef<ReactCropperElement>(null);

	useEffect(() => {
		const cropper = cropperRef.current?.cropper;

		const aspectGroup = document.querySelectorAll('.aspectGroup');

		aspectGroup.forEach(btn => {
			btn.addEventListener('click', () => {
				console.log('clicked');
				const [first, second] = btn.innerHTML.split(':');

				if (cropper) {
					cropper.setAspectRatio(+first / +second);
				}
			});
		});
	}, []);

	const onSave = () => {
		const cropper = cropperRef.current?.cropper;

		if (cropper) {
			const newSrc = cropper.getCroppedCanvas().toDataURL();

			setSrc(newSrc);
		}
	};

	const onReset = () => {
		const cropper = cropperRef.current?.cropper;

		if (cropper) {
			cropper.reset();
			cropper.setAspectRatio(NaN);
		}
	};

	const onRotate = () => {
		const cropper = cropperRef.current?.cropper;
		if (cropper) {
			cropper.rotate(90);
			const canvasData = cropper.getCanvasData();
			cropper.zoomTo(0);
			cropper.setCropBoxData({
				height: canvasData.height,
				width: canvasData.width,
			});
		}
	};

	const changeAspect = (first: number, second: number) => {
		const cropper = cropperRef.current?.cropper;

		if (cropper) {
			cropper.setAspectRatio(first / second);
		}
	};

	return (
		<div className="flex flex-col max-h-screen pb-2 items-center pt-5 max-w-3xl mx-auto">
			<div className="flex text-2xl mb-3 flex-row-reverse justify-between w-full px-3 ">
				<button onClick={onSave} title="save">
					<MdDownloadDone />
				</button>
				<button title="cancel">
					<MdOutlineCancel />
				</button>
			</div>
			<Cropper
				src={src}
				zoomable={true}
				responsive={true}
				ref={cropperRef}
				viewMode={2}
				autoCrop={true}
				autoCropArea={1}
				dragMode="none"
				modal={false}
				background={false}
			/>
			<Tabs
				className="flex flex-col-reverse mr-2 bg-black/80 text-white"
				defaultIndex={-1}>
				<TabList className="flex items-center text-xl">
					<Tab onClick={onReset} title="reset">
						<GrPowerReset />
					</Tab>
					<Tab onClick={onRotate} title="rotate">
						<MdCropRotate />
					</Tab>
					<Tab onClick={() => changeAspect(4, 4)} title="4:4">
						<LuSquare />
					</Tab>
					<Tab onClick={() => changeAspect(16, 9)} title="16:9">
						<LuRectangleHorizontal />
					</Tab>
					<Tab onClick={() => changeAspect(4, 3)} title="4:3">
						<BiRectangle />
					</Tab>
				</TabList>

				<TabPanel></TabPanel>
				<TabPanel></TabPanel>
				<TabPanel></TabPanel>
				<TabPanel></TabPanel>
				<TabPanel></TabPanel>
			</Tabs>
		</div>
	);
};

export default Crop;
