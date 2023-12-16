import { useState } from 'react';
import { ColorChangeHandler, SketchPicker } from 'react-color';
import { rgbMaker } from '../utils/rgbMaker';

type Color = { r: number; g: number; b: number; a?: number };

const ColorPicker = ({ cb }: { cb: (color: string) => void }) => {
	const [color, setColor] = useState<Color>({ r: 255, g: 255, b: 255, a: 1 });

	const handleColorChange: ColorChangeHandler = color => {
		setColor(color.rgb);
		const colorRGB = rgbMaker(color.rgb);
		cb(colorRGB);
	};

	return (
		<div>
			<SketchPicker color={color} onChange={handleColorChange} />
		</div>
	);
};

export default ColorPicker;
