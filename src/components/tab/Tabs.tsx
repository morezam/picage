import { Children, useState } from 'react';

interface TabsProps {
	children?: React.ReactNode;
}

type CustomBtnProps = {
	index: number;
	activeTab: number;
	setActiveTab: React.Dispatch<React.SetStateAction<number>>;
	title: string;
	onClick?: () => void;
};

const CustomBtn = ({
	index,
	activeTab,
	setActiveTab,
	title,
	onClick,
}: CustomBtnProps) => {
	console.log(onClick);
	return (
		<button
			className={`py-2 px-1 rounded-md first-letter:capitalize ${
				activeTab === index ? 'bg-slate-600 text-slate-100 ' : ''
			}`}
			onClick={() => {
				setActiveTab(index);
				onClick && onClick();
			}}>
			{title}
		</button>
	);
};

const Tabs = ({ children }: TabsProps) => {
	const [activeTab, setActiveTab] = useState(0);

	if (!children) {
		return null;
	}

	const count = Children.count(children);

	return (
		<div className="flex items-center">
			<div className="pt-10 pr-3 h-full">
				{count === 1 ? children : (children as React.ReactElement[])[activeTab]}
			</div>

			<div className="flex flex-col rounded-md bg-slate-300 text-lg">
				{count === 1 ? (
					<CustomBtn
						index={0}
						setActiveTab={setActiveTab}
						activeTab={activeTab}
						title={(children as React.ReactElement).props.title}
					/>
				) : (
					(children as React.ReactElement[]).map((child, i) => (
						<CustomBtn
							key={i}
							index={i}
							setActiveTab={setActiveTab}
							activeTab={activeTab}
							title={child.props.title}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default Tabs;
