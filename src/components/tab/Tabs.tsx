import { ReactElement, useState } from 'react';

interface TabsProps {
	children?: ReactElement[];
}

const Tabs = ({ children }: TabsProps) => {
	const [activeTab, setActiveTab] = useState(0);

	if (!children) {
		return null;
	}
	return (
		<div className="flex">
			<div className="pt-10 pr-3 h-full">{children[activeTab]}</div>

			<div className="flex flex-col my-5 rounded-full gap-y-7 pt-7 bg-slate-300  justify-around text-lg">
				{children.map((child, i) => (
					<button
						className={`py-2 px-1 rounded-md first-letter:capitalize ${
							activeTab === i ? 'bg-slate-600 text-slate-100 ' : ''
						}`}
						key={i}
						onClick={() => setActiveTab(i)}>
						{child.props.title}
					</button>
				))}
			</div>
		</div>
	);
};

export default Tabs;
