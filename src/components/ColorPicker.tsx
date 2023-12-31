import { useState } from 'react';
import Modal from 'react-modal';
import {
	ColorChangeHandler,
	SketchPicker,
	CirclePicker,
	type RGBColor,
} from 'react-color';
import { MdCancel } from 'react-icons/md';
import { CiPickerHalf } from 'react-icons/ci';
import { rgbMaker } from '../utils/rgbMaker';
import { rgbToString } from '../utils/rgbToString';

Modal.setAppElement('#modal');

type ColorPickerType = {
	cb: (color: string) => void;
	initColor?: string;
};

const ColorPicker = ({ cb, initColor }: ColorPickerType) => {
	const [color, setColor] = useState<RGBColor>(() => {
		const initToRGB = initColor
			? rgbToString(initColor)
			: { r: 255, g: 255, b: 255, a: 1 };
		return initToRGB;
	});

	const [isOpen, setOpen] = useState(false);

	const handleColorChange: ColorChangeHandler = color => {
		setColor(color.rgb);
		const colorRGB = rgbMaker(color.rgb);
		cb(colorRGB);
	};

	function closeModal() {
		setOpen(false);
	}

	return (
		<>
			<div className="relative max-w-[250px] sm:max-w-md overflow-x-auto pl-10 py-5">
				<div className="absolute left-2 text-2xl cursor-pointer">
					<CiPickerHalf onClick={() => setOpen(true)} />
				</div>
				<CirclePicker
					width="800px"
					color={color}
					onChange={handleColorChange}
				/>
			</div>
			<Modal
				onRequestClose={closeModal}
				isOpen={isOpen}
				className="flex flex-col pt-10 outline-none items-center max-w-[250px] mx-auto mt-10 relative">
				<button
					className="absolute right-0 top-0 text-2xl"
					onClick={closeModal}>
					<MdCancel />
				</button>
				<SketchPicker color={color} onChange={handleColorChange} />
			</Modal>
		</>
	);
};

export default ColorPicker;
