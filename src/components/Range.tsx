import { useState } from 'react';

interface RangeProps extends React.ComponentPropsWithRef<'input'> {
	initToMax?: boolean;
	rangeCb: (val: number) => void;
}

const Range = (props: RangeProps) => {
	const { rangeCb, initToMax, ...rest } = props;

	const [value, setValue] = useState(initToMax ? props.max : 0);

	return (
		<input
			type="range"
			value={value}
			onChange={e => {
				setValue(+e.target.value);
				rangeCb(+e.target.value);
			}}
			{...rest}
		/>
	);
};

export default Range;
