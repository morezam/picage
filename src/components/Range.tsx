import { useState } from 'react';

interface RangeProps extends React.ComponentPropsWithRef<'input'> {
	initVal?: number;
	rangeCb: (val: number) => void;
}

const Range = (props: RangeProps) => {
	const { rangeCb, initVal, ...rest } = props;

	const [value, setValue] = useState(() => {
		const initValue = initVal ? initVal : 0;
		return initValue;
	});

	return (
		<div className="flex w-full items-center gap-2">
			<input
				className="flex-1"
				type="range"
				value={value}
				onChange={e => {
					setValue(+e.target.value);
					rangeCb(+e.target.value);
				}}
				{...rest}
			/>
			<span>{value}</span>
		</div>
	);
};

export default Range;
