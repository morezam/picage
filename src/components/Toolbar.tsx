import TabComponent from './Tab';

const Toolbar = () => {
	const tabs = [
		{
			name: 'color',
			content: <div>color</div>,
		},
		{
			name: 'stroke',
			content: <div>stroke</div>,
		},
		{
			name: 'font family',
			content: <div>font family</div>,
		},
	];

	return <TabComponent tabs={tabs} />;
};

export default Toolbar;
