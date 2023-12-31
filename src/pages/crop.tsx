import { useRef } from 'react';
import Cropper, { type ReactCropperElement } from 'react-cropper';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { GrPowerReset } from 'react-icons/gr';
import { MdCropRotate } from 'react-icons/md';
import { LuRectangleHorizontal, LuSquare } from 'react-icons/lu';
import { BiRectangle } from 'react-icons/bi';
import MainLayout from '../layouts/MainLayout';
import { useImgSrcContext } from '../hooks/useImgSrcContext';

const Crop = () => {
	const { src, setSrc } = useImgSrcContext();

	const cropperRef = useRef<ReactCropperElement>(null);

	const navigate = useNavigate();

	const onSave = () => {
		const cropper = cropperRef.current?.cropper;
		if (cropper) {
			const newSrc = cropper.getCroppedCanvas().toDataURL();
			setSrc(newSrc);
			navigate('/');
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
			const { height, width } = cropper.getCanvasData();
			cropper.zoomTo(0);
			cropper.setCropBoxData({ height, width });
		}
	};

	const changeAspect = (first: number, second: number) => {
		const cropper = cropperRef.current?.cropper;

		if (cropper) {
			cropper.setAspectRatio(first / second);
		}
	};

	return (
		<MainLayout onSave={onSave} onCancel={() => navigate('/')}>
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
		</MainLayout>
	);
};

export default Crop;
