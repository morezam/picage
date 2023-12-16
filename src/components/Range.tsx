import { useState } from 'react';

const Range = ({ rangeCb }: { rangeCb: (val: number) => void }) => {
	const [value, setValue] = useState(0);

	return (
		<input
			type="range"
			min={0}
			max={10}
			step={1}
			value={value}
			onChange={e => {
				setValue(+e.target.value);
				rangeCb(+e.target.value);
			}}
		/>
	);
};

export default Range;
