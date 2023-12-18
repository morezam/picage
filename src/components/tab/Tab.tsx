/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement } from 'react';

interface TabProps {
	title: string;
	onClick?: () => void;
	children?: ReactElement | ReactElement[];
}

const Tab = ({ children }: TabProps) => {
	return <div>{children}</div>;
};

export default Tab;
