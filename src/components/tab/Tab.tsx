import { ReactElement } from 'react';

interface TabProps {
	title: string;
	children: ReactElement | ReactElement[];
}

const Tab = ({ title, children }: TabProps) => {
	return <div>{children}</div>;
};

export default Tab;
